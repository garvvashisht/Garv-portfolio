import React from "react";
import { education } from "../mock";
import { GraduationCap, MapPin } from "lucide-react";

const Education = () => {
  return (
    <section id="education" className="py-24 md:py-32 bg-[#0C0E14] border-y border-white/8">
      <div className="container-lg">
        <div className="mb-14 reveal">
          <p className="eyebrow mb-4">
            <span className="text-[#6B7280]">{`// `}</span>04 — education
          </p>
          <h2 className="font-serif text-[40px] md:text-[56px] leading-[1.02] tracking-tight text-[#E5E7EB] font-light max-w-3xl">
            Where analytical <span className="italic" style={{
              background: "linear-gradient(90deg, #22D3EE 0%, #34D399 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>fundamentals</span> were built.
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-5 md:left-6 top-4 bottom-4 w-px bg-white/10" aria-hidden />
          <div className="space-y-8">
            {education.map((ed, i) => (
              <div key={i} className="relative pl-14 md:pl-20 reveal">
                <span className="absolute left-1 md:left-2 top-3 w-9 h-9 md:w-10 md:h-10 rounded-md bg-[#12141B] border border-white/10 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 md:w-5 md:h-5 text-[#22D3EE]" />
                </span>
                <div className="bg-[#0D0F15] rounded-xl border border-white/10 p-6 md:p-8 glow-hover">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <span className="font-mono text-[11px] tracking-widest uppercase text-[#22D3EE]">
                      {ed.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#9CA3AF]">
                      <MapPin className="w-3.5 h-3.5" />
                      {ed.location}
                    </span>
                  </div>
                  <h3 className="font-serif text-[26px] md:text-[32px] font-light leading-tight text-[#E5E7EB]">
                    {ed.degree}
                  </h3>
                  <p className="mt-1 text-[15px] font-medium text-[#A5F3FC]">{ed.school}</p>
                  <p className="mt-4 text-[15px] leading-relaxed text-[#9CA3AF]">{ed.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
