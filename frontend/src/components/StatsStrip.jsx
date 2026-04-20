import React, { useEffect, useRef, useState } from "react";
import { headlineStats } from "../mock";
import { TrendingUp } from "lucide-react";

const Counter = ({ to, suffix }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const duration = 1400;
            const start = performance.now();
            const step = (now) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              setVal(Math.round(eased * to));
              if (t < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [to]);

  return (
    <span
      ref={ref}
      className="font-serif text-[60px] md:text-[80px] lg:text-[96px] font-light leading-none tracking-tight text-[#E5E7EB]"
    >
      {val}
      <span style={{
        background: "linear-gradient(90deg, #22D3EE 0%, #34D399 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}>{suffix}</span>
    </span>
  );
};

// Deterministic upward sparkline
const Sparkline = ({ seed = 1 }) => {
  const w = 180;
  const h = 44;
  const points = 14;
  const pts = [];
  let y = 36;
  for (let i = 0; i < points; i++) {
    const x = (i / (points - 1)) * w;
    // drifting upward with small wobble derived from seed
    const wobble = Math.sin(i * 1.4 + seed) * 3 + Math.cos(i * 0.9 + seed * 2) * 2;
    y = Math.max(4, 36 - (i * 2.2) + wobble);
    pts.push([x, y]);
  }
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;
  const last = pts[pts.length - 1];

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="44" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id={`fill-${seed}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#fill-${seed})`} />
      <path d={path} stroke="#22D3EE" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={last[0]} cy={last[1]} r="2.5" fill="#34D399" />
    </svg>
  );
};

const StatsStrip = () => {
  return (
    <section className="py-16 md:py-24 border-y border-white/8 bg-[#0C0E14]">
      <div className="container-lg">
        <div className="flex items-baseline justify-between mb-10 md:mb-12 reveal">
          <p className="eyebrow">
            <span className="text-[#6B7280]">{`// `}</span>impact_metrics.log
          </p>
          <span className="font-mono text-[11px] text-[#6B7280] tracking-widest uppercase hidden sm:flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5 text-[#22D3EE]" />
            aggregated across 4 projects
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {headlineStats.map((s, i) => (
            <div
              key={i}
              className="reveal p-6 rounded-xl bg-[#12141B] border border-white/8 glow-hover"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] tracking-widest text-[#6B7280]">
                  KPI_{String(i + 1).padStart(2, "0")}
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[10px] text-[#34D399]">
                  <TrendingUp className="w-3 h-3" /> trend
                </span>
              </div>
              <Counter to={s.value} suffix={s.suffix} />
              <div className="mt-4 -mx-1">
                <Sparkline seed={i + 1} />
              </div>
              <p className="mt-2 text-[14px] font-medium text-[#E5E7EB]">{s.label}</p>
              <p className="mt-1 text-[12.5px] text-[#9CA3AF] font-mono">{s.detail}</p>
            </div>
          ))}
        </div>
        <div className="scan-line mt-14" />
      </div>
    </section>
  );
};

export default StatsStrip;
