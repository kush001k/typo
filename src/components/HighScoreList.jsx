import { memo } from "react";

const MAX_CELLS = 6;

function HighScoreList({ scores }) {
  // FIFO: show newest first, max 6 cells
  const display = scores.slice(-MAX_CELLS).reverse();

  if (!display.length) return null;

  return (
    <div className="mt-6 w-full max-w-xl mx-auto">
      <h3 className="text-xs tracking-widest uppercase text-muted-fg mb-3 text-center">
        HIGH SCORES
      </h3>
      <div className="grid grid-cols-2 gap-px bg-border border-2 border-border">
        {display.map((s, i) => (
          <div
            key={`${s.date}-${i}`}
            className="bg-bg p-4 text-center"
          >
            <span className="text-2xl font-bold text-accent block">
              {s.wpm}
            </span>
            <span className="text-xs tracking-widest uppercase text-muted-fg block">
              WPM · {s.accuracy}%
            </span>
            <span className="text-xs text-muted-fg block mt-1">
              {(s.time / 1000).toFixed(1)}s · {(s.difficulty || "MEDIUM").toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(HighScoreList);