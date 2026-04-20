import React from "react";
import { personal, navLinks } from "../mock";
import { ArrowUp, Terminal } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();
  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-[#07080B] text-[#E5E7EB] border-t border-white/8">
      <div className="container-lg py-12 md:py-16">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-6">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-md bg-[#12141B] border border-white/10 flex items-center justify-center">
                <Terminal className="w-4 h-4 text-[#22D3EE]" />
              </span>
              <div>
                <p className="font-mono text-[13px]">
                  garv.sharma<span className="text-[#22D3EE]">@portfolio</span>
                </p>
                <p className="font-mono text-[11px] tracking-widest uppercase text-[#6B7280]">
                  {personal.role} · {personal.location}
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-md text-[14px] text-[#9CA3AF] leading-relaxed">
              Portfolio built as a living document of how I think about data, decisions and delivered outcomes.
            </p>
          </div>

          <div className="col-span-6 md:col-span-3">
            <p className="font-mono text-[11px] tracking-widest uppercase text-[#6B7280] mb-4">
              <span className="text-[#22D3EE]">#</span> navigate
            </p>
            <ul className="space-y-2 font-mono">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} className="text-[13px] text-[#D1D5DB] hover:text-[#22D3EE] transition-colors">
                    ./{l.label.toLowerCase()}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 md:col-span-3">
            <p className="font-mono text-[11px] tracking-widest uppercase text-[#6B7280] mb-4">
              <span className="text-[#22D3EE]">#</span> direct
            </p>
            <ul className="space-y-2 font-mono text-[13px]">
              <li>
                <a href={`mailto:${personal.email}`} className="text-[#D1D5DB] hover:text-[#22D3EE] transition-colors break-all">
                  {personal.email}
                </a>
              </li>
              <li>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#D1D5DB] hover:text-[#22D3EE] transition-colors"
                >
                  linkedin.com/in/garv-sharma6767
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[11px] font-mono text-[#6B7280]">
            <span className="text-[#22D3EE]">$</span> echo “© {year} {personal.name}. Designed &amp; coded with care.”
          </p>
          <button
            onClick={toTop}
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-[#9CA3AF] hover:text-[#22D3EE] transition-colors"
          >
            scroll_to_top() <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
