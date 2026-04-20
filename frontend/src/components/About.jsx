import React from "react";
import { aboutParagraphs, focusAreas, competencies } from "../mock";
import { ChevronRight, Cpu } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="container-lg">
        <div className="grid grid-cols-12 gap-8 md:gap-12">
          <div className="col-span-12 lg:col-span-4 reveal">
            <p className="eyebrow mb-4">
              <span className="text-[#6B7280]">{`// `}</span>01 — about
            </p>
            <h2 className="font-serif text-[40px] md:text-[56px] leading-[1.02] tracking-tight text-[#E5E7EB] font-light">
              An analyst who <span className="italic" style={{
                background: "linear-gradient(90deg, #22D3EE 0%, #34D399 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>ships</span>, not just reports.
            </h2>

            {/* Bash prompt card */}
            <div className="mt-8 rounded-xl bg-[#0D0F15] border border-white/10 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/8">
                <span className="flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-[#6B7280]">
                  <Cpu className="w-3.5 h-3.5 text-[#22D3EE]" /> focus.sh
                </span>
                <span className="text-[10px] font-mono text-[#6B7280]">exec</span>
              </div>
              <div className="p-5 font-mono text-[13px] leading-[1.7]">
                <p className="text-[#6B7280]">
                  <span className="text-[#34D399]">$</span> cat focus_areas.txt
                </p>
                <ul className="mt-3 space-y-1.5">
                  {focusAreas.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[13px] text-[#E5E7EB]">
                      <ChevronRight className="w-3.5 h-3.5 mt-1 text-[#22D3EE] flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8 reveal">
            <div className="space-y-6 text-[17px] md:text-[18px] leading-[1.8] text-[#D1D5DB]">
              {aboutParagraphs.map((p, i) => (
                <p key={i}>
                  {i === 0 && <span className="font-mono text-[14px] text-[#22D3EE] mr-3">{"> "}</span>}
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-10 pt-10 border-t border-white/8">
              <p className="font-mono text-[11px] tracking-widest uppercase text-[#6B7280] mb-5">
                <span className="text-[#22D3EE]">#</span> competencies
              </p>
              <div className="flex flex-wrap gap-2">
                {competencies.map((c) => (
                  <span
                    key={c}
                    className="px-3 py-1.5 rounded-md bg-[#12141B] text-[12.5px] text-[#D1D5DB] border border-white/8 font-mono"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
