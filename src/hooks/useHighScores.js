import { useState, useCallback } from "react";

const STORAGE_KEY = "typo-scores";
const MAX_SCORES = 5;

function loadScores() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { easy: [], medium: [], hard: [] };
  } catch {
    return { easy: [], medium: [], hard: [] };
  }
}

export function useHighScores() {
  const [scores, setScores] = useState(loadScores);

  const addScore = useCallback((difficulty, score) => {
    setScores((prev) => {
      const list = [...prev[difficulty], score]
        .sort((a, b) => b.wpm - a.wpm)
        .slice(0, MAX_SCORES);
      const next = { ...prev, [difficulty]: list };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const getScores = useCallback((difficulty) => scores[difficulty] || [], [scores]);

  return { scores, addScore, getScores };
}