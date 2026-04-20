import React from "react";
import { aboutParagraphs, focusAreas, competencies } from "../mock";
import { CheckCircle2 } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container-lg">
        <div className="grid grid-cols-12 gap-8 md:gap-12">
          <div className="col-span-12 lg:col-span-4 reveal">
            <p className="eyebrow mb-4">01 — About</p>
            <h2 className="font-serif text-[40px] md:text-[56px] leading-[1.02] tracking-tight text-[#0C0D10] font-light">
              A data analyst who <span className="italic text-[#1C3D5A]">ships</span>, not just reports.
            </h2>
            <div className="mt-8 p-5 rounded-xl bg-white border border-[#0C0D10]/10">
              <p className="font-mono text-[11px] tracking-widest uppercase text-[#5C5E66] mb-3">
                Focus areas
              </p>
              <ul className="space-y-2">
                {focusAreas.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[14px] text-[#0C0D10]">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-[#1C3D5A] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8 reveal">
            <div className="space-y-6 text-[17px] md:text-[18px] leading-[1.75] text-[#0C0D10]/85">
              {aboutParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-10 pt-10 border-t border-[#0C0D10]/10">
              <p className="font-mono text-[11px] tracking-widest uppercase text-[#5C5E66] mb-5">
                Competencies
              </p>
              <div className="flex flex-wrap gap-2">
                {competencies.map((c) => (
                  <span
                    key={c}
                    className="px-3.5 py-1.5 rounded-full bg-[#ECE6D7] text-[13px] text-[#0C0D10] border border-[#0C0D10]/8"
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
