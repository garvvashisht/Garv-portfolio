import React from "react";
import { personal } from "../mock";
import { ArrowUpRight, Download, MapPin, Activity } from "lucide-react";
import { cvDownloadUrl } from "../api/client";

const TerminalCard = () => {
  const line = (indent, key, val, valClass = "text-[#A5F3FC]") => (
    <div className="flex">
      <span className="text-[#4B5563] select-none" style={{ paddingLeft: `${indent}ch` }}>&nbsp;</span>
      <span className="text-[#E5E7EB]">{key}</span>
      <span className="text-[#6B7280]">: </span>
      <span className={valClass}>{val}</span>
      <span className="text-[#6B7280]">,</span>
    </div>
  );

  return (
    <div className="bg-[#0D0F15] rounded-xl border border-white/10 overflow-hidden shadow-[0_30px_80px_-40px_rgba(34,211,238,0.25)]">
      {/* Terminal title bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#12141B] border-b border-white/8">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F87171]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#34D399]" />
        </div>
        <span className="font-mono text-[11px] text-[#6B7280] tracking-widest uppercase">profile.json</span>
        <Activity className="w-3.5 h-3.5 text-[#22D3EE]" />
      </div>
      {/* Content */}
      <div className="p-5 font-mono text-[12.5px] leading-[1.9]">
        <div className="flex">
          <span className="w-6 text-[#4B5563] select-none">1</span>
          <span className="text-[#6B7280]">{"{"}</span>
        </div>
        {[
          { k: "name", v: `"Garv Sharma"`, c: "text-[#A5F3FC]" },
          { k: "role", v: `"Data Analyst"`, c: "text-[#A5F3FC]" },
          { k: "education", v: `"MSc AI — Oxford Brookes"`, c: "text-[#A5F3FC]" },
          { k: "location", v: `"Oxford, UK"`, c: "text-[#A5F3FC]" },
          { k: "stack", v: `["Power BI", "SQL", "Python", "Excel"]`, c: "text-[#FCD34D]" },
          { k: "availability", v: `true`, c: "text-[#34D399]" },
          { k: "reply_sla", v: `"<48h"`, c: "text-[#A5F3FC]" },
        ].map((l, i) => (
          <div key={l.k} className="flex">
            <span className="w-6 text-[#4B5563] select-none">{i + 2}</span>
            <span className="pl-4 text-[#E5E7EB]">{l.k}</span>
            <span className="text-[#6B7280]">: </span>
            <span className={`${l.c} break-all`}>{l.v}</span>
            {i < 6 && <span className="text-[#6B7280]">,</span>}
          </div>
        ))}
        <div className="flex">
          <span className="w-6 text-[#4B5563] select-none">9</span>
          <span className="text-[#6B7280]">{"}"}</span>
          <span className="ml-2 inline-block w-2 h-4 bg-[#22D3EE] cursor-blink align-middle" />
        </div>
      </div>
    </div>
  );
};

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
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#12141B] border border-white/10">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-[#22D3EE] opacity-70 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-[#22D3EE]" />
            </span>
            <span className="font-mono text-[11px] tracking-widest uppercase text-[#E5E7EB]">
              status://online <span className="text-[#22D3EE]">•</span> {personal.availability.replace("Open to ", "").toLowerCase()}
            </span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-white/10 bg-[#12141B] text-[12px] text-[#9CA3AF] font-mono">
            <MapPin className="w-3.5 h-3.5" />
            {personal.location}
          </span>
        </div>

        {/* Headline grid */}
        <div className="grid grid-cols-12 gap-6 md:gap-10 items-end">
          <div className="col-span-12 lg:col-span-7 reveal">
            <p className="eyebrow mb-5">
              <span className="text-[#6B7280]">{`// `}</span>portfolio · data analyst · msc ai
            </p>
            <h1 className="font-serif text-[#E5E7EB] leading-[0.95] tracking-tight">
              <span className="block text-[44px] sm:text-[64px] md:text-[84px] lg:text-[100px] font-light">
                Turning data
              </span>
              <span className="block text-[44px] sm:text-[64px] md:text-[84px] lg:text-[100px] font-light italic" style={{
                background: "linear-gradient(90deg, #22D3EE 0%, #34D399 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                into decisions.
              </span>
            </h1>
            <p className="mt-8 max-w-2xl text-[17px] md:text-[19px] leading-relaxed text-[#9CA3AF]">
              {personal.summary}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <button
                onClick={() => scrollTo("work")}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-[#22D3EE] text-[#0A0B0F] text-[14px] font-mono font-semibold hover:bg-[#67E8F9] transition-colors"
              >
                view_case_studies()
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <a
                href={cvDownloadUrl("pdf")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md border border-white/15 text-[#E5E7EB] text-[14px] font-mono font-medium hover:border-[#22D3EE]/60 hover:text-[#22D3EE] transition-colors"
              >
                <Download className="w-4 h-4" />
                download_cv.pdf
              </a>
            </div>
          </div>

          {/* Right terminal card */}
          <div className="col-span-12 lg:col-span-5 reveal">
            <TerminalCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
