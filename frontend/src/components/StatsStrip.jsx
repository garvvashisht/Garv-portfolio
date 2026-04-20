import React, { useEffect, useRef, useState } from "react";
import { headlineStats } from "../mock";

const Counter = ({ to, suffix }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver((entries) => {
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
    }, { threshold: 0.4 });
    io.observe(node);
    return () => io.disconnect();
  }, [to]);

  return (
    <span ref={ref} className="font-serif text-[56px] md:text-[76px] lg:text-[92px] font-light leading-none tracking-tight text-[#0C0D10]">
      {val}
      <span className="text-[#B8732E]">{suffix}</span>
    </span>
  );
};

const StatsStrip = () => {
  return (
    <section className="py-12 md:py-20 bg-[#ECE6D7]/60 border-y border-[#0C0D10]/8">
      <div className="container-lg">
        <div className="flex items-baseline justify-between mb-8 md:mb-12 reveal">
          <p className="eyebrow">§ Impact in numbers</p>
          <span className="font-mono text-[11px] text-[#5C5E66] tracking-widest uppercase hidden sm:block">
            Aggregate across 4 projects
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {headlineStats.map((s, i) => (
            <div key={i} className="reveal">
              <Counter to={s.value} suffix={s.suffix} />
              <p className="mt-3 text-[15px] font-medium text-[#0C0D10]">{s.label}</p>
              <p className="mt-1 text-[13px] text-[#5C5E66]">{s.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsStrip;
