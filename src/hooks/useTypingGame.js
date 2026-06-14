import { useState, useCallback, useMemo, useRef } from "react";
import { quotes, streakThreshold } from "../data/quotes";
import {
  calculateWpm,
  calculateAccuracy,
  isGoodPerformance,
  getRandomQuote,
} from "../utils/scoring";
import { useTimer } from "./useTimer";

const DIFFICULTIES = ["easy", "medium", "hard"];

export function useTypingGame() {
  const [difficulty, setDifficulty] = useState("medium");
  const [status, setStatus] = useState("idle");
  const [currentQuote, setCurrentQuote] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [typedWords, setTypedWords] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [hasError, setHasError] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [streak, setStreak] = useState(0);
  const [lastResult, setLastResult] = useState(null);

  const timer = useTimer();
  const words = useMemo(() => currentQuote.split(" "), [currentQuote]);

  const totalTypedRef = useRef(0);
  const correctCharsRef = useRef(0);

  const progress = useMemo(
    () => (words.length ? (wordIndex / words.length) * 100 : 0),
    [wordIndex, words.length]
  );

  const adjustDifficulty = useCallback((good) => {
    setStreak((prev) => {
      const next = good ? prev + 1 : prev - 1;
      if (next >= streakThreshold.up) {
        setDifficulty((d) => {
          const idx = DIFFICULTIES.indexOf(d);
          return idx < DIFFICULTIES.length - 1 ? DIFFICULTIES[idx + 1] : d;
        });
        return 0;
      }
      if (next <= -streakThreshold.down) {
        setDifficulty((d) => {
          const idx = DIFFICULTIES.indexOf(d);
          return idx > 0 ? DIFFICULTIES[idx - 1] : d;
        });
        return 0;
      }
      return next;
    });
  }, []);

  const startGame = useCallback(
    (diff) => {
      if (diff) setDifficulty(diff);
      const d = diff || difficulty;
      const quote = getRandomQuote(quotes[d], currentQuote);
      setCurrentQuote(quote);
      setWordIndex(0);
      setTypedWords([]);
      setInputValue("");
      setHasError(false);
      setWpm(0);
      setAccuracy(100);
      setStatus("playing");
      setLastResult(null);
      totalTypedRef.current = 0;
      correctCharsRef.current = 0;
      timer.start();
    },
    [difficulty, currentQuote, timer]
  );

  const handleInput = useCallback(
    (value) => {
      if (status !== "playing") return;

      setInputValue(value);
      const currentWord = words[wordIndex];
      if (!currentWord) return;

      if (value.endsWith(" ")) {
        const trimmed = value.trim();
        const correct = trimmed === currentWord;
        setTypedWords((prev) => [...prev, { word: trimmed, correct }]);

        if (wordIndex === words.length - 1 && correct) {
          // Game complete — use refs for accurate final values
          const elapsed = timer.stop();
          const finalWpm = calculateWpm(correctCharsRef.current, elapsed);
          const finalAcc = calculateAccuracy(
            correctCharsRef.current,
            totalTypedRef.current
          );
          adjustDifficulty(isGoodPerformance(finalWpm, finalAcc));
          setWpm(finalWpm);
          setAccuracy(finalAcc);
          setLastResult({
            wpm: finalWpm,
            accuracy: finalAcc,
            time: elapsed,
            difficulty,
            date: Date.now(),
          });
          setStatus("finished");
        } else {
          setWordIndex((i) => i + 1);
          setInputValue("");
          setHasError(false);
        }
        return;
      }

      // Every keystroke counts toward total
      totalTypedRef.current += 1;

      // Character matches expected word at this position
      if (currentWord.startsWith(value)) {
        correctCharsRef.current += 1;
        setHasError(false);
      } else {
        setHasError(true);
      }

      // Update live stats
      setWpm(calculateWpm(correctCharsRef.current, timer.elapsed));
      setAccuracy(
        calculateAccuracy(correctCharsRef.current, totalTypedRef.current)
      );
    },
    [status, words, wordIndex, difficulty, timer, adjustDifficulty]
  );

  return {
    difficulty,
    status,
    words,
    wordIndex,
    typedWords,
    inputValue,
    hasError,
    wpm,
    accuracy,
    elapsed: timer.elapsed,
    progress,
    streak,
    lastResult,
    startGame,
    handleInput,
    setInputValue,
  };
}