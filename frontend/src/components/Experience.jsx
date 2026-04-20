import React, { useState } from "react";
import { experiences } from "../mock";
import { ArrowUpRight, Layers, TrendingUp, ChevronRight } from "lucide-react";

const Experience = () => {
  const [active, setActive] = useState(experiences[0].id);
  const current = experiences.find((e) => e.id === active);

  return (
    <section id="work" className="py-24 md:py-32 bg-[#0C0E14] border-y border-white/8">
      <div className="container-lg">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 reveal">
          <div>
            <p className="eyebrow mb-4">
              <span className="text-[#6B7280]">{`// `}</span>02 — selected_work
            </p>
            <h2 className="font-serif text-[40px] md:text-[56px] leading-[1.02] tracking-tight text-[#E5E7EB] font-light max-w-3xl">
              Four projects. One pattern: <span className="italic" style={{
                background: "linear-gradient(90deg, #22D3EE 0%, #34D399 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>measurable outcomes</span>.
            </h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-[#6B7280]">
            <Layers className="w-4 h-4 text-[#22D3EE]" />
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
                  className={`w-full text-left p-5 rounded-lg border transition-all duration-300 ${
                    isActive
                      ? "bg-[#12141B] border-[#22D3EE]/60 shadow-[0_0_0_1px_rgba(34,211,238,0.2)]"
                      : "bg-[#0D0F15] border-white/8 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-[11px] tracking-widest ${isActive ? "text-[#22D3EE]" : "text-[#6B7280]"}`}>
                      [{e.code}]
                    </span>
                    <ArrowUpRight className={`w-4 h-4 ${isActive ? "text-[#22D3EE] rotate-0" : "text-[#4B5563] -rotate-45"} transition-transform`} />
                  </div>
                  <h3 className={`mt-2 font-serif text-[22px] font-medium ${isActive ? "text-[#E5E7EB]" : "text-[#D1D5DB]"}`}>
                    {e.title}
                  </h3>
                  <p className="mt-1 text-[12px] font-mono text-[#9CA3AF]">{e.domain}</p>
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <div className="col-span-12 lg:col-span-8">
            <article
              key={current.id}
              className="bg-[#0D0F15] rounded-xl border border-white/10 overflow-hidden"
              style={{ animation: "fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both" }}
            >
              {/* Title bar */}
              <div className="flex items-center justify-between px-5 py-2.5 border-b border-white/8">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F87171]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#34D399]" />
                </div>
                <span className="font-mono text-[11px] tracking-widest text-[#6B7280]">
                  {current.id}.md
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#34D399]">
                  <TrendingUp className="w-3 h-3" />
                  {current.metric.value}
                </span>
              </div>

              <div className="p-7 md:p-10">
                <div className="flex items-center gap-3 mb-5 flex-wrap">
                  <span className="font-mono text-[11px] tracking-widest uppercase text-[#22D3EE]">
                    {current.role}
                  </span>
                  <span className="text-[#4B5563]">/</span>
                  <span className="font-mono text-[11px] tracking-widest uppercase text-[#6B7280]">
                    {current.period}
                  </span>
                  <span className="text-[#4B5563]">/</span>
                  <span className="font-mono text-[11px] tracking-widest uppercase text-[#6B7280]">
                    {current.domain}
                  </span>
                </div>
                <h3 className="font-serif text-[32px] md:text-[44px] leading-[1.05] font-light text-[#E5E7EB]">
                  {current.title}
                </h3>
                <p className="mt-3 text-[16px] text-[#9CA3AF] leading-relaxed">{current.summary}</p>

                <div className="mt-7 inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#22D3EE]/8 border border-[#22D3EE]/25 text-[12px] font-mono text-[#A5F3FC]">
                  <TrendingUp className="w-3.5 h-3.5 text-[#34D399]" />
                  {current.metric.value} — {current.metric.label}
                </div>

                <ul className="mt-6 space-y-3">
                  {current.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-[15px] text-[#D1D5DB] leading-relaxed">
                      <ChevronRight className="w-4 h-4 mt-1 text-[#22D3EE] flex-shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-white/8">
                  <p className="font-mono text-[11px] tracking-widest uppercase text-[#6B7280] mb-3">
                    <span className="text-[#22D3EE]">#</span> stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {current.stack.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1.5 rounded-md bg-[#12141B] text-[#A5F3FC] text-[12px] font-mono tracking-tight border border-[#22D3EE]/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
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
