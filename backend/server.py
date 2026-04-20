from fastapi import FastAPI, APIRouter, HTTPException, Request, Query, BackgroundTasks
from fastapi.responses import FileResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import uuid
import ssl
from pathlib import Path
from datetime import datetime, timezone
from typing import List, Optional
from collections import defaultdict, deque
import time
import asyncio

from pydantic import BaseModel, Field, EmailStr, constr
import aiosmtplib
from email.message import EmailMessage


# --------------------------------------------------------------------------- #
# Setup
# --------------------------------------------------------------------------- #
ROOT_DIR = Path(__file__).parent
STATIC_DIR = ROOT_DIR / "static"
load_dotenv(ROOT_DIR / ".env")

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger("portfolio")

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

SMTP_HOST = os.environ.get("SMTP_HOST", "")
SMTP_PORT = int(os.environ.get("SMTP_PORT", "587"))
SMTP_USER = os.environ.get("SMTP_USER", "")
SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD", "")
SMTP_FROM_NAME = os.environ.get("SMTP_FROM_NAME", "Portfolio Contact")
NOTIFY_EMAIL = os.environ.get("NOTIFY_EMAIL", SMTP_USER)
ADMIN_KEY = os.environ.get("ADMIN_KEY", "")

app = FastAPI(title="Garv Sharma Portfolio API")
api = APIRouter(prefix="/api")


# --------------------------------------------------------------------------- #
# Rate limit (simple in-memory per-IP)
# --------------------------------------------------------------------------- #
_hits: dict = defaultdict(deque)
RL_WINDOW = 60  # seconds
RL_LIMIT = 5


def _rate_limit(ip: str):
    now = time.time()
    q = _hits[ip]
    while q and now - q[0] > RL_WINDOW:
        q.popleft()
    if len(q) >= RL_LIMIT:
        raise HTTPException(status_code=429, detail="Too many requests, please wait a minute.")
    q.append(now)


# --------------------------------------------------------------------------- #
# Models
# --------------------------------------------------------------------------- #
class ContactIn(BaseModel):
    name: constr(strip_whitespace=True, min_length=1, max_length=80)
    email: EmailStr
    message: constr(strip_whitespace=True, min_length=5, max_length=2000)


class ContactOut(BaseModel):
    success: bool
    id: str
    emailed: bool


class MessageRecord(BaseModel):
    id: str
    name: str
    email: str
    message: str
    ip: Optional[str] = None
    user_agent: Optional[str] = None
    created_at: datetime
    emailed: bool = False


# --------------------------------------------------------------------------- #
# Email helper
# --------------------------------------------------------------------------- #
async def _send_email(record: dict) -> bool:
    if not (SMTP_HOST and SMTP_USER and SMTP_PASSWORD and NOTIFY_EMAIL):
        logger.warning("SMTP not configured — skipping email send")
        return False
    try:
        msg = EmailMessage()
        msg["From"] = f"{SMTP_FROM_NAME} <{SMTP_USER}>"
        msg["To"] = NOTIFY_EMAIL
        msg["Reply-To"] = record["email"]
        msg["Subject"] = f"Portfolio contact — {record['name']}"
        body = (
            f"New message from your portfolio\n"
            f"----------------------------------------\n"
            f"Name    : {record['name']}\n"
            f"Email   : {record['email']}\n"
            f"When    : {record['created_at'].isoformat()} UTC\n"
            f"IP      : {record.get('ip', '-')}\n"
            f"Agent   : {record.get('user_agent', '-')}\n"
            f"----------------------------------------\n\n"
            f"{record['message']}\n"
        )
        msg.set_content(body)

        ctx = ssl.create_default_context()
        await aiosmtplib.send(
            msg,
            hostname=SMTP_HOST,
            port=SMTP_PORT,
            username=SMTP_USER,
            password=SMTP_PASSWORD,
            start_tls=True,
            tls_context=ctx,
            timeout=20,
        )
        logger.info("Notification email sent to %s", NOTIFY_EMAIL)
        return True
    except Exception as e:  # noqa: BLE001
        logger.error("Email send failed: %s", e)
        return False


async def _email_and_mark(record: dict):
    ok = await _send_email(record)
    try:
        await db.contact_messages.update_one(
            {"id": record["id"]}, {"$set": {"emailed": ok}}
        )
    except Exception as e:  # noqa: BLE001
        logger.error("Failed to update emailed flag: %s", e)


# --------------------------------------------------------------------------- #
# Routes
# --------------------------------------------------------------------------- #
@api.get("/")
async def root():
    return {"message": "Garv Sharma Portfolio API", "status": "ok"}


@api.get("/health")
async def health():
    db_ok = True
    try:
        await db.command("ping")
    except Exception:
        db_ok = False
    return {
        "status": "ok",
        "db": db_ok,
        "smtp": bool(SMTP_HOST and SMTP_USER and SMTP_PASSWORD),
        "time": datetime.now(timezone.utc).isoformat(),
    }


@api.post("/contact", response_model=ContactOut)
async def submit_contact(payload: ContactIn, request: Request, bg: BackgroundTasks):
    ip = (request.headers.get("x-forwarded-for") or request.client.host or "").split(",")[0].strip()
    _rate_limit(ip or "unknown")

    record = {
        "id": str(uuid.uuid4()),
        "name": payload.name,
        "email": payload.email,
        "message": payload.message,
        "ip": ip,
        "user_agent": request.headers.get("user-agent", ""),
        "created_at": datetime.now(timezone.utc),
        "emailed": False,
    }

    try:
        await db.contact_messages.insert_one(record)
    except Exception as e:
        logger.error("Mongo insert failed: %s", e)
        raise HTTPException(status_code=500, detail="Could not save message, please try again.")

    # Fire email in background so response is fast
    bg.add_task(_email_and_mark, record)

    return ContactOut(success=True, id=record["id"], emailed=False)


@api.get("/cv")
async def download_cv(format: str = Query("pdf", pattern="^(pdf|docx)$")):
    filename_map = {
        "pdf": ("Garv_Sharma_CV.pdf", "application/pdf"),
        "docx": (
            "Garv_Sharma_CV.docx",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ),
    }
    fname, mime = filename_map[format]
    path = STATIC_DIR / fname
    if not path.exists():
        raise HTTPException(status_code=404, detail="CV file not found")

    # best-effort counter
    async def _count():
        try:
            await db.cv_downloads.insert_one(
                {"id": str(uuid.uuid4()), "format": format, "at": datetime.now(timezone.utc)}
            )
        except Exception as e:  # noqa: BLE001
            logger.error("cv count failed: %s", e)

    asyncio.create_task(_count())

    return FileResponse(
        path=str(path),
        media_type=mime,
        filename=fname,
        headers={"Cache-Control": "no-store"},
    )


@api.get("/admin/messages")
async def admin_messages(key: str = Query(...), limit: int = Query(50, ge=1, le=200)):
    if not ADMIN_KEY or key != ADMIN_KEY:
        raise HTTPException(status_code=401, detail="Unauthorised")
    cursor = db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).limit(limit)
    rows = await cursor.to_list(limit)
    # cast datetime to iso for easier client consumption
    for r in rows:
        if isinstance(r.get("created_at"), datetime):
            r["created_at"] = r["created_at"].isoformat()
    return {"count": len(rows), "messages": rows}


# --------------------------------------------------------------------------- #
# Mount router + middleware
# --------------------------------------------------------------------------- #
app.include_router(api)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def _shutdown():
    client.close()
