// WPM = (characters typed / 5) / (elapsed minutes)
export function calculateWpm(correctChars, elapsedMs) {
  const minutes = elapsedMs / 60000;
  if (minutes === 0) return 0;
  return Math.round((correctChars / 5) / minutes);
}

// Accuracy = (correct characters / total typed) * 100
export function calculateAccuracy(correctChars, totalTyped) {
  if (totalTyped === 0) return 100;
  return Math.round((correctChars / totalTyped) * 100);
}

export function isGoodPerformance(wpm, accuracy) {
  return wpm >= 30 && accuracy >= 90;
}

export function isPoorPerformance(wpm, accuracy) {
  return wpm < 20 || accuracy < 75;
}

// Get a random quote from the given difficulty, avoiding the last one shown
export function getRandomQuote(difficultyPool, lastQuote = "") {
  const candidates = difficultyPool.filter((q) => q !== lastQuote);
  return candidates[Math.floor(Math.random() * candidates.length)];
}