import MarqueeImport from "react-fast-marquee";
import { useMemo } from "react";
import { loadLatestStats } from "../utils/storage";

const Marquee = MarqueeImport.default ?? MarqueeImport;

export default function StatsMarquee() {
  const latest = useMemo(() => loadLatestStats(), []);

  const stats = [
    { value: latest?.wpm ?? 0, label: "WPM" },
    { value: latest?.accuracy ?? 0, label: "% ACC" },
    { value: latest?.wordsTyped ?? 0, label: "WORDS" },
    { value: latest?.time ?? 0, label: "SECONDS" },
    { value: latest?.difficulty?.toUpperCase() ?? "MEDIUM", label: "LEVEL" },
    { value: "150", label: "TARGET" },
  ];

  return (
    <div className="bg-accent text-accent-fg py-3 border-y-2 border-accent">
      <Marquee speed={80} autoFill gradient={false} pauseOnHover={false}>
        {stats.map((stat, i) => (
          <div key={i} className="flex items-baseline gap-3 px-8">
            <span className="text-2xl md:text-3xl font-bold uppercase tracking-tighter">
              {stat.value}
            </span>
            <span className="text-xs tracking-widest uppercase">
              {stat.label}
            </span>
          </div>
        ))}
      </Marquee>
    </div>
  );
}