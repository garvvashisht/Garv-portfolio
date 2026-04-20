import React, { useState } from "react";
import { experiences } from "../mock";
import { ArrowUpRight, Layers, TrendingUp } from "lucide-react";

const Experience = () => {
  const [active, setActive] = useState(experiences[0].id);
  const current = experiences.find((e) => e.id === active);

  return (
    <section id="work" className="py-24 md:py-32 bg-[#ECE6D7]/40 border-y border-[#0C0D10]/8">
      <div className="container-lg">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 reveal">
          <div>
            <p className="eyebrow mb-4">02 — Selected Work</p>
            <h2 className="font-serif text-[40px] md:text-[56px] leading-[1.02] tracking-tight text-[#0C0D10] font-light max-w-3xl">
              Four projects. One pattern: <span className="italic text-[#1C3D5A]">measurable outcomes</span>.
            </h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-[#5C5E66]">
            <Layers className="w-4 h-4" />
            {experiences.length} case studies
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 lg:gap-10">
          {/* Tab list */}
          <div className="col-span-12 lg:col-span-4 space-y-2 reveal">
            {experiences.map((e) => {
              const isActive = e.id === active;
              return (
                <button
                  key={e.id}
                  onClick={() => setActive(e.id)}
                  className={`w-full text-left p-5 rounded-xl border transition-all duration-300 ${
                    isActive
                      ? "bg-[#0C0D10] border-[#0C0D10] text-[#F5F1E8]"
                      : "bg-white border-[#0C0D10]/10 text-[#0C0D10] hover:border-[#1C3D5A]/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-[11px] tracking-widest ${isActive ? "text-[#F5F1E8]/60" : "text-[#5C5E66]"}`}>
                      {e.code}
                    </span>
                    <ArrowUpRight className={`w-4 h-4 transition-transform ${isActive ? "rotate-0" : "-rotate-45"}`} />
                  </div>
                  <h3 className={`mt-2 font-serif text-[22px] font-medium ${isActive ? "text-[#F5F1E8]" : "text-[#0C0D10]"}`}>
                    {e.title}
                  </h3>
                  <p className={`mt-1 text-[13px] ${isActive ? "text-[#F5F1E8]/70" : "text-[#5C5E66]"}`}>
                    {e.domain}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <div className="col-span-12 lg:col-span-8">
            <article
              key={current.id}
              className="bg-white rounded-2xl border border-[#0C0D10]/10 p-7 md:p-10"
              style={{ animation: "fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both" }}
            >
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] tracking-widest uppercase text-[#5C5E66]">
                    {current.role}
                  </span>
                  <span className="text-[#0C0D10]/20">/</span>
                  <span className="font-mono text-[11px] tracking-widest uppercase text-[#5C5E66]">
                    {current.period}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F1E8] border border-[#0C0D10]/10 text-[12px] text-[#0C0D10]">
                  <TrendingUp className="w-3.5 h-3.5 text-[#B8732E]" />
                  {current.metric.value} — {current.metric.label}
                </span>
              </div>
              <h3 className="mt-5 font-serif text-[32px] md:text-[44px] leading-[1.05] font-light text-[#0C0D10]">
                {current.title}
              </h3>
              <p className="mt-3 text-[16px] text-[#0C0D10]/75 leading-relaxed">{current.summary}</p>

              <ul className="mt-7 space-y-3">
                {current.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px] text-[#0C0D10]/85 leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#1C3D5A] flex-shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-[#0C0D10]/10">
                <p className="font-mono text-[11px] tracking-widest uppercase text-[#5C5E66] mb-3">Stack</p>
                <div className="flex flex-wrap gap-2">
                  {current.stack.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 rounded-md bg-[#0C0D10] text-[#F5F1E8] text-[12px] font-mono tracking-tight"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
