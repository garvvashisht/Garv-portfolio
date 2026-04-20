# Portfolio Backend Contracts

Backend base: `${REACT_APP_BACKEND_URL}/api`

## 1. Contact form — `POST /api/contact`

**Request JSON**
```
{ "name": string (1-80), "email": valid email, "message": string (5-2000) }
```
**Response 200**
```
{ "success": true, "id": "<uuid>", "emailed": true|false }
```
**Errors**
- 422 — validation failure (Pydantic)
- 429 — rate-limited (>5/min/IP)
- 500 — storage failure

**Behaviour**
- Persists `{id, name, email, message, ip, user_agent, created_at}` to Mongo collection `contact_messages`
- Fires an email notification to `NOTIFY_EMAIL` via Gmail SMTP (async, non-blocking — failure does NOT block save)
- Stores `emailed` boolean so admin can retry later

## 2. CV download — `GET /api/cv?format=pdf|docx`

- Default `format=pdf` → `static/Garv_Sharma_CV.pdf`
- `format=docx` → `static/Garv_Sharma_CV.docx`
- Returns file with proper `Content-Disposition: attachment; filename=...`
- Increments `cv_downloads` counter in Mongo (best-effort, non-blocking)

## 3. Admin view — `GET /api/admin/messages?key=<ADMIN_KEY>&limit=50`

- Auth via query param `key` matching `ADMIN_KEY` env
- Returns reverse-chronological messages
- 401 if key missing/invalid

## 4. Health — `GET /api/health`

Returns `{status, db, smtp}`.

---

## Frontend Integration Plan

### Changed files
- `src/api/client.js` — NEW axios instance pointing at `${REACT_APP_BACKEND_URL}/api`
- `src/components/Contact.jsx` — replace localStorage mock with real POST; handle 200/error/429 toasts
- `src/components/Hero.jsx` — rename button from "Contact for CV" → "Download CV" pointing to `/api/cv?format=pdf`
- `src/mock.js` — keep content only (name, experience, skills); remove contact-submission logic

### Data in `mock.js` that STAYS (pure content, no backend needed)
- personal details, heroMeta, headlineStats, aboutParagraphs, focusAreas,
  experiences, skillGroups, competencies, education, certifications, navLinks

### Removed from mock behaviour
- `localStorage.gs_messages` — fully replaced by backend `/api/contact`

### Env used by frontend
- Only `REACT_APP_BACKEND_URL` (already configured).

### Env used by backend (already set in `/app/backend/.env`)
- `MONGO_URL`, `DB_NAME`
- `SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM_NAME, NOTIFY_EMAIL`
- `ADMIN_KEY`

### Files served as static
- `/app/backend/static/Garv_Sharma_CV.pdf`  (converted from docx via LibreOffice)
- `/app/backend/static/Garv_Sharma_CV.docx` (original)
