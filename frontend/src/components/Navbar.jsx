import React, { useEffect, useState } from "react";
import { navLinks, personal } from "../mock";
import { ArrowUpRight, Menu, X } from "lucide-react";

const Navbar = () => {
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
        scrolled ? "bg-[#F5F1E8]/85 backdrop-blur-md border-b border-[#0C0D10]/10" : "bg-transparent"
      }`}
    >
      <div className="container-lg flex items-center justify-between h-16 md:h-20">
        <button onClick={() => scrollTo("top")} className="flex items-center gap-3 group">
          <span className="w-9 h-9 rounded-full bg-[#0C0D10] text-[#F5F1E8] flex items-center justify-center font-serif text-[15px] font-semibold">
            GS
          </span>
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="font-serif text-[15px] font-semibold text-[#0C0D10]">{personal.name}</span>
            <span className="font-mono text-[10px] tracking-widest uppercase text-[#5C5E66]">
              {personal.role}
            </span>
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="px-4 py-2 text-sm text-[#0C0D10]/80 hover:text-[#0C0D10] transition-colors"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollTo("contact")}
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0C0D10] text-[#F5F1E8] text-sm font-medium hover:bg-[#1C3D5A] transition-colors"
          >
            Get in touch
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full border border-[#0C0D10]/15 text-[#0C0D10]"
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-[#F5F1E8] border-t border-[#0C0D10]/10">
          <div className="container-lg py-4 flex flex-col gap-1">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-left px-2 py-3 text-[15px] text-[#0C0D10] border-b border-[#0C0D10]/5"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="mt-3 inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full bg-[#0C0D10] text-[#F5F1E8] text-sm font-medium"
            >
              Get in touch <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
