import React from "react";
import { certifications } from "../mock";
import { Award, Loader2 } from "lucide-react";

const Certifications = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="container-lg">
        <div className="mb-14 reveal">
          <p className="eyebrow mb-4">
            <span className="text-[#6B7280]">{`// `}</span>05 — certifications
          </p>
          <h2 className="font-serif text-[40px] md:text-[56px] leading-[1.02] tracking-tight text-[#E5E7EB] font-light max-w-3xl">
            Credentials and ongoing <span className="italic" style={{
              background: "linear-gradient(90deg, #22D3EE 0%, #34D399 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>study</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {certifications.map((c) => {
            const inProgress = c.status.toLowerCase().includes("progress");
            return (
              <div
                key={c.title}
                className="reveal p-7 md:p-8 rounded-xl bg-[#0D0F15] border border-white/10 glow-hover"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-md bg-[#12141B] border border-white/8 flex items-center justify-center">
                    {inProgress ? (
                      <Loader2 className="w-5 h-5 text-[#F59E0B] animate-spin" />
                    ) : (
                      <Award className="w-5 h-5 text-[#22D3EE]" />
                    )}
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-mono tracking-widest uppercase border ${
                      inProgress
                        ? "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30"
                        : "bg-[#22D3EE]/10 text-[#22D3EE] border-[#22D3EE]/30"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
                <h3 className="font-serif text-[22px] md:text-[26px] leading-tight text-[#E5E7EB] font-medium">
                  {c.title}
                </h3>
                <div className="mt-4 flex items-center justify-between text-[13px] text-[#9CA3AF] font-mono">
                  <span>{c.issuer}</span>
                  <span>{c.year}</span>
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
