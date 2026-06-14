import { memo } from "react";

function HighScoreList({ scores }) {
  if (!scores.length) return null;
  return (
    <div className="mt-6">
      <h3 className="text-xs tracking-widest uppercase text-muted-fg mb-3">
        HIGH SCORES
      </h3>
      <ul className="space-y-1">
        {scores.map((s, i) => (
          <li
            key={i}
            className="flex justify-between items-baseline text-sm text-muted-fg border-b border-border pb-1"
          >
            <span className="text-fg font-bold">
              #{i + 1}{" "}
              <span className="text-accent">{s.wpm} WPM</span>
            </span>
            <span>{s.accuracy}% ACC</span>
            <span>{(s.time / 1000).toFixed(1)}s</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default memo(HighScoreList);