import { AnimatePresence, motion } from "motion/react";
import { loadLatestStats, saveLatestStats } from "../utils/storage";
import { useRef, useLayoutEffect, useState, useEffect } from "react";

function StatRow({ label, value }) {
  return (
    <div className="flex items-baseline whitespace-nowrap tracking-widest uppercase text-muted-fg">
      <span className="text-accent font-bold text-xl md:text-2xl min-[1441px]:text-3xl">{value}</span>
      <span className="text-xs md:text-sm min-[1441px]:text-base">{label}</span>
    </div>
  );
}

function StatGroup({ stats }) {
  return (
    <div className="flex items-center justify-around w-[240px] shrink-0">
      <StatRow label="WPM" value={stats?.wpm ?? "—"} />
      <span className="text-muted-fg/30">
        <b>/</b>
      </span>
      <StatRow label="ACC" value={stats ? `${stats.accuracy}%` : "—"} />
      <span className="text-muted-fg/30">
        <b>/</b>
      </span>
      <StatRow label="TIME" value={stats ? `${stats.time}s` : "—"} />
    </div>
  );
}

export default function StatsMarquee({ stats, gameStatus }) {
  const [fallbackStats, setFallbackStats] = useState(() => loadLatestStats());
  const [itemCount, setItemCount] = useState(7);

  const isPlaying = gameStatus === "playing";
  const effectiveStats = stats ?? fallbackStats;

  // Persist stats when game finishes — syncs to localStorage
  const prevPlaying = useRef(isPlaying);
  useLayoutEffect(() => {
    if (prevPlaying.current && !isPlaying && effectiveStats) {
      setFallbackStats(effectiveStats);
      saveLatestStats(effectiveStats);
    }
    prevPlaying.current = isPlaying;
  }, [isPlaying, effectiveStats]);

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
    <div className="relative w-full overflow-hidden border-y-2 border-border h-12">
      <div className="absolute inset-0 pointer-events-none z-10 bg-linear-to-r from-bg/60 to-transparent w-16" />
      <div className="absolute inset-0 pointer-events-none z-10 bg-linear-to-l from-bg/60 to-transparent w-16 right-0 left-auto" />

      <AnimatePresence mode="wait">
        {!effectiveStats && !isPlaying ? (
          <motion.div
            key="empty"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <p className="text-xs tracking-widest uppercase text-muted-fg">
              NO RECENT STATS — FINISH A GAME TO SEE RESULTS
            </p>
          </motion.div>
        ) : (
          <div
            key="content"
            className="absolute inset-0"
          >
            {Array.from({ length: itemCount }, (_, i) => (
              <div
                key={i}
                className="marquee-item"
                style={{
                  left: `max(calc(240px * ${itemCount}), 100%)`,
                  animationDuration: `${duration}s`,
                  animationDelay: `calc(${duration}s / ${itemCount} * (${itemCount} - ${i}) * -1)`,
                }}
              >
                <StatGroup stats={effectiveStats} />
              </div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}