import React from "react";
import { education } from "../mock";
import { GraduationCap, MapPin } from "lucide-react";

const Education = () => {
  return (
    <section id="education" className="py-24 md:py-32 bg-[#ECE6D7]/40 border-y border-[#0C0D10]/8">
      <div className="container-lg">
        <div className="mb-14 reveal">
          <p className="eyebrow mb-4">04 — Education</p>
          <h2 className="font-serif text-[40px] md:text-[56px] leading-[1.02] tracking-tight text-[#0C0D10] font-light max-w-3xl">
            Where analytical <span className="italic text-[#1C3D5A]">fundamentals</span> were built.
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-5 md:left-6 top-4 bottom-4 w-px bg-[#0C0D10]/15" aria-hidden />
          <div className="space-y-8">
            {education.map((ed, i) => (
              <div key={i} className="relative pl-14 md:pl-20 reveal">
                <span className="absolute left-1 md:left-2 top-3 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white border border-[#0C0D10]/15 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 md:w-5 md:h-5 text-[#1C3D5A]" />
                </span>
                <div className="bg-white rounded-2xl border border-[#0C0D10]/10 p-6 md:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <span className="font-mono text-[11px] tracking-widest uppercase text-[#5C5E66]">
                      {ed.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[12px] text-[#0C0D10]/65">
                      <MapPin className="w-3.5 h-3.5" />
                      {ed.location}
                    </span>
                  </div>
                  <h3 className="font-serif text-[26px] md:text-[32px] font-light leading-tight text-[#0C0D10]">
                    {ed.degree}
                  </h3>
                  <p className="mt-1 text-[15px] text-[#1C3D5A] font-medium">{ed.school}</p>
                  <p className="mt-4 text-[15px] leading-relaxed text-[#0C0D10]/75">{ed.note}</p>
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
