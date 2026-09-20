import { useState, useEffect } from "react";

function StatRow({ label, value }) {
  return (
    <div className="flex items-baseline whitespace-nowrap tracking-widest uppercase text-muted-fg">
      <span className="text-accent font-bold text-xl md:text-3xl 2xl:text-4xl">
        {value}
      </span>
      <span className="text-sm md:text-lg 2xl:text-lg">{label}</span>
    </div>
  );
}

const ZERO_STATS = { wpm: 0, accuracy: 0, time: "0.0" };

function StatGroup({ stats }) {
  const display = stats ?? ZERO_STATS;
  return (
    <div className="flex items-center justify-around w-75 md:w-96 shrink-0">
      <StatRow label="WPM" value={display.wpm ?? 0} />
      <span className="text-muted-fg/30">
        <b>/</b>
      </span>
      <StatRow label="ACC" value={`${display.accuracy ?? 0}%`} />
      <span className="text-muted-fg/30">
        <b>/</b>
      </span>
      <StatRow label="TIME" value={`${display.time ?? "0.0"}s`} />
    </div>
  );
}

export default function MetricsMarquee({ stats }) {
  // Before any game: stats is null → show 0s. After each game: App passes
  // the latest result, which flows straight through (auto-updates).
  const displayStats = stats ?? ZERO_STATS;
  const [itemCount, setItemCount] = useState(7);

  // Compute item count from viewport width
  useEffect(() => {
    function updateCount() {
      const vw = window.innerWidth;
      const n = Math.floor(vw / 240);
      setItemCount(vw - 240 * n < 240 ? n + 1 : n);
    }
    updateCount();
    const ro = new ResizeObserver(updateCount);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, []);

  const duration = 2 * (itemCount + 1);

  return (
    <div className="absolute top-0 left-0 right-0 z-10 flex w-full overflow-hidden border-b-2 border-border h-12 items-center">
      <div className="absolute inset-0 pointer-events-none z-10 bg-linear-to-r from-bg/60 to-transparent w-16" />
      <div className="absolute inset-0 pointer-events-none z-10 bg-linear-to-l from-bg/60 to-transparent w-16 right-0 left-auto" />

      <div
        className="marquee-track"
        style={{ animationDuration: `${duration}s` }}
      >
        {Array.from({ length: itemCount * 2 }, (_, i) => (
          <StatGroup key={i} stats={displayStats} />
        ))}
      </div>
    </div>
  );
}
