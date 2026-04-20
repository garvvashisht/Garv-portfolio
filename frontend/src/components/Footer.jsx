import React from "react";
import { personal, navLinks } from "../mock";
import { ArrowUp } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();
  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-[#0C0D10] text-[#F5F1E8] border-t border-[#F5F1E8]/10">
      <div className="container-lg py-12 md:py-16">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-6">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-[#F5F1E8] text-[#0C0D10] flex items-center justify-center font-serif font-semibold">
                GS
              </span>
              <div>
                <p className="font-serif text-[18px]">{personal.name}</p>
                <p className="font-mono text-[11px] tracking-widest uppercase text-[#F5F1E8]/55">
                  {personal.role} · {personal.location}
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-md text-[14px] text-[#F5F1E8]/65 leading-relaxed">
              Portfolio built as a living document of how I think about data, decisions and delivered outcomes.
            </p>
          </div>

          <div className="col-span-6 md:col-span-3">
            <p className="font-mono text-[11px] tracking-widest uppercase text-[#F5F1E8]/55 mb-4">
              Navigate
            </p>
            <ul className="space-y-2">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    className="text-[14px] text-[#F5F1E8]/80 hover:text-[#D9A066] transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 md:col-span-3">
            <p className="font-mono text-[11px] tracking-widest uppercase text-[#F5F1E8]/55 mb-4">
              Direct
            </p>
            <ul className="space-y-2 text-[14px]">
              <li>
                <a href={`mailto:${personal.email}`} className="text-[#F5F1E8]/80 hover:text-[#D9A066] transition-colors break-all">
                  {personal.email}
                </a>
              </li>
              <li>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#F5F1E8]/80 hover:text-[#D9A066] transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#F5F1E8]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[12px] text-[#F5F1E8]/55">
            © {year} {personal.name}. Designed and coded with care.
          </p>
          <button
            onClick={toTop}
            className="inline-flex items-center gap-2 text-[12px] font-mono tracking-widest uppercase text-[#F5F1E8]/65 hover:text-[#D9A066] transition-colors"
          >
            Back to top <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
