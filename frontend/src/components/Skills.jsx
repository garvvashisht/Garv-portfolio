import React, { useEffect, useRef, useState } from "react";
import { skillGroups } from "../mock";
import { Database, BarChart3, Code2, LineChart } from "lucide-react";

const icons = [BarChart3, Database, Code2, LineChart];

const Bar = ({ level }) => {
  const [w, setW] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setW(level);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [level]);

  return (
    <div ref={ref} className="relative h-[4px] w-full bg-white/8 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full"
        style={{
          width: `${w}%`,
          background: "linear-gradient(90deg, #22D3EE 0%, #34D399 100%)",
          transition: "width 1.2s cubic-bezier(0.22,1,0.36,1)",
        }}
      />
    </div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="container-lg">
        <div className="mb-14 reveal">
          <p className="eyebrow mb-4">
            <span className="text-[#6B7280]">{`// `}</span>03 — skills
          </p>
          <h2 className="font-serif text-[40px] md:text-[56px] leading-[1.02] tracking-tight text-[#E5E7EB] font-light max-w-3xl">
            The toolkit behind the <span className="italic" style={{
              background: "linear-gradient(90deg, #22D3EE 0%, #34D399 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>outcomes</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {skillGroups.map((g, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div
                key={g.title}
                className="reveal p-7 md:p-8 rounded-xl bg-[#0D0F15] border border-white/8 glow-hover"
              >
                <div className="flex items-center justify-between mb-7">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-[#12141B] border border-white/8 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#22D3EE]" />
                    </div>
                    <h3 className="font-serif text-[22px] font-medium text-[#E5E7EB]">{g.title}</h3>
                  </div>
                  <span className="font-mono text-[10px] tracking-widest text-[#6B7280]">
                    MOD_{String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <ul className="space-y-5">
                  {g.items.map((it) => (
                    <li key={it.name}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[14px] text-[#E5E7EB] font-medium">{it.name}</span>
                        <span className="font-mono text-[11px] text-[#22D3EE]">{it.level}%</span>
                      </div>
                      <Bar level={it.level} />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
