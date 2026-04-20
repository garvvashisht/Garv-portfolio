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
    <div ref={ref} className="h-[3px] w-full bg-[#0C0D10]/10 overflow-hidden rounded-full">
      <div
        className="h-full bg-[#1C3D5A]"
        style={{
          width: `${w}%`,
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
          <p className="eyebrow mb-4">03 — Skills</p>
          <h2 className="font-serif text-[40px] md:text-[56px] leading-[1.02] tracking-tight text-[#0C0D10] font-light max-w-3xl">
            The toolkit behind the <span className="italic text-[#1C3D5A]">outcomes</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {skillGroups.map((g, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div
                key={g.title}
                className="reveal group p-7 md:p-8 rounded-2xl bg-white border border-[#0C0D10]/10 hover:border-[#1C3D5A]/40 transition-colors duration-300"
              >
                <div className="flex items-center gap-3 mb-7">
                  <div className="w-10 h-10 rounded-lg bg-[#ECE6D7] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#1C3D5A]" />
                  </div>
                  <h3 className="font-serif text-[22px] font-medium text-[#0C0D10]">{g.title}</h3>
                </div>
                <ul className="space-y-5">
                  {g.items.map((it) => (
                    <li key={it.name}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[14px] text-[#0C0D10] font-medium">{it.name}</span>
                        <span className="font-mono text-[11px] text-[#5C5E66]">{it.level}%</span>
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
