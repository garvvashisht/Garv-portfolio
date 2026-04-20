import React from "react";
import { certifications } from "../mock";
import { Award, Loader2 } from "lucide-react";

const Certifications = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="container-lg">
        <div className="mb-14 reveal">
          <p className="eyebrow mb-4">05 — Certifications</p>
          <h2 className="font-serif text-[40px] md:text-[56px] leading-[1.02] tracking-tight text-[#0C0D10] font-light max-w-3xl">
            Credentials and ongoing <span className="italic text-[#1C3D5A]">study</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {certifications.map((c) => {
            const inProgress = c.status.toLowerCase().includes("progress");
            return (
              <div
                key={c.title}
                className="reveal p-7 md:p-8 rounded-2xl bg-white border border-[#0C0D10]/10 hover:border-[#1C3D5A]/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-lg bg-[#ECE6D7] flex items-center justify-center">
                    {inProgress ? (
                      <Loader2 className="w-5 h-5 text-[#B8732E] animate-spin" />
                    ) : (
                      <Award className="w-5 h-5 text-[#1C3D5A]" />
                    )}
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase ${
                      inProgress
                        ? "bg-[#B8732E]/10 text-[#B8732E]"
                        : "bg-[#1C3D5A]/10 text-[#1C3D5A]"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
                <h3 className="font-serif text-[22px] md:text-[26px] leading-tight text-[#0C0D10] font-medium">
                  {c.title}
                </h3>
                <div className="mt-4 flex items-center justify-between text-[13px] text-[#5C5E66]">
                  <span>{c.issuer}</span>
                  <span className="font-mono">{c.year}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
