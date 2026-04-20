import React, { useEffect, useState } from "react";
import { navLinks, personal } from "../mock";
import { ArrowUpRight, Menu, X, Terminal } from "lucide-react";

const Navbar = ({ clock }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-[#0A0B0F]/85 backdrop-blur-md border-b border-white/8" : "bg-transparent"
      }`}
    >
      <div className="container-lg flex items-center justify-between h-16 md:h-20">
        <button onClick={() => scrollTo("top")} className="flex items-center gap-3">
          <span className="relative w-9 h-9 rounded-md bg-[#12141B] border border-white/10 flex items-center justify-center">
            <Terminal className="w-4 h-4 text-[#22D3EE]" />
          </span>
          <span className="hidden sm:flex flex-col leading-tight text-left">
            <span className="font-mono text-[12px] text-[#E5E7EB] tracking-tight">
              garv.sharma<span className="text-[#22D3EE]">@portfolio</span>
            </span>
            <span className="font-mono text-[10px] tracking-widest uppercase text-[#6B7280]">
              ~/data-analyst
            </span>
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((l, i) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="px-3.5 py-2 text-[13px] font-mono tracking-tight text-[#9CA3AF] hover:text-[#22D3EE] transition-colors"
            >
              <span className="text-[#6B7280] mr-1">{String(i + 1).padStart(2, "0")}</span>
              {l.label.toLowerCase()}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {clock && (
            <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#12141B] border border-white/8 font-mono text-[11px] text-[#9CA3AF]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] pulse-dot" />
              {clock}
            </span>
          )}
          <button
            onClick={() => scrollTo("contact")}
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#22D3EE] text-[#0A0B0F] text-[13px] font-mono font-semibold hover:bg-[#67E8F9] transition-colors"
          >
            contact()
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-md border border-white/10 text-[#E5E7EB]"
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-[#0A0B0F] border-t border-white/8">
          <div className="container-lg py-4 flex flex-col gap-1">
            {navLinks.map((l, i) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-left px-2 py-3 font-mono text-[14px] text-[#E5E7EB] border-b border-white/8"
              >
                <span className="text-[#22D3EE] mr-2">{String(i + 1).padStart(2, "0")}</span>
                {l.label.toLowerCase()}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="mt-3 inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-md bg-[#22D3EE] text-[#0A0B0F] text-sm font-mono font-semibold"
            >
              contact() <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
