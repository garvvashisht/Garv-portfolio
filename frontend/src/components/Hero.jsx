import React from "react";
import { personal, heroMeta } from "../mock";
import { ArrowUpRight, Download, MapPin, Sparkles } from "lucide-react";
import { cvDownloadUrl } from "../api/client";

const Hero = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="top" className="pt-28 md:pt-36 pb-16 md:pb-24 relative">
      <div className="container-lg">
        {/* Top meta row */}
        <div className="reveal flex flex-wrap items-center gap-3 mb-10 md:mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ECE6D7] border border-[#0C0D10]/10">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-[#1C3D5A] opacity-70 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-[#1C3D5A]" />
            </span>
            <span className="font-mono text-[11px] tracking-widest uppercase text-[#0C0D10]">
              {personal.availability}
            </span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#0C0D10]/15 text-[12px] text-[#0C0D10]/75">
            <MapPin className="w-3.5 h-3.5" />
            {personal.location}
          </span>
        </div>

        {/* Headline grid */}
        <div className="grid grid-cols-12 gap-6 md:gap-10 items-end">
          <div className="col-span-12 lg:col-span-8 reveal">
            <p className="eyebrow mb-5">Portfolio — Data Analyst / MSc AI</p>
            <h1 className="font-serif text-[#0C0D10] leading-[0.95] tracking-tight">
              <span className="block text-[44px] sm:text-[64px] md:text-[84px] lg:text-[104px] font-light">
                Turning data
              </span>
              <span className="block text-[44px] sm:text-[64px] md:text-[84px] lg:text-[104px] font-light italic text-[#1C3D5A]">
                into decisions.
              </span>
            </h1>
            <p className="mt-8 max-w-2xl text-[17px] md:text-[19px] leading-relaxed text-[#0C0D10]/75">
              {personal.summary}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <button
                onClick={() => scrollTo("work")}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#0C0D10] text-[#F5F1E8] text-[15px] font-medium hover:bg-[#1C3D5A] transition-colors"
              >
                View case studies
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <a
                href={cvDownloadUrl("pdf")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#0C0D10]/20 text-[#0C0D10] text-[15px] font-medium hover:bg-[#0C0D10]/5 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download CV
              </a>
            </div>
          </div>

          {/* Right meta card */}
          <div className="col-span-12 lg:col-span-4 reveal">
            <div className="bg-white rounded-2xl border border-[#0C0D10]/10 p-6 md:p-7 shadow-[0_1px_0_0_rgba(12,13,16,0.04),0_20px_40px_-24px_rgba(12,13,16,0.18)]">
              <div className="flex items-center gap-2 mb-5">
                <Sparkles className="w-4 h-4 text-[#B8732E]" />
                <span className="font-mono text-[11px] tracking-widest uppercase text-[#5C5E66]">
                  Profile
                </span>
              </div>
              <dl className="space-y-4">
                {heroMeta.map((m) => (
                  <div key={m.label} className="flex items-start justify-between gap-4 border-b border-[#0C0D10]/8 pb-3 last:border-0 last:pb-0">
                    <dt className="font-mono text-[11px] tracking-widest uppercase text-[#5C5E66] pt-0.5">
                      {m.label}
                    </dt>
                    <dd className="text-[14px] text-[#0C0D10] font-medium text-right">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
