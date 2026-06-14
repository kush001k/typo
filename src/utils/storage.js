const STATS_KEY = "typo-stats";

export function saveLatestStats(stats) {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

export function loadLatestStats() {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}