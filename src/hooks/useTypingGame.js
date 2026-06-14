import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { quotes } from "../data/quotes";
import {
  calculateWpm,
  calculateAccuracy,
} from "../utils/scoring";
import { generateWordSequence } from "../utils/sequencing";
import { useTimer } from "./useTimer";

const WORD_COUNT = 150;
const TIMEOUT_MS = 60_000;

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
  const [lastResult, setLastResult] = useState(null);

  const timer = useTimer();
  const words = useMemo(() => currentQuote.split(" "), [currentQuote]);
  const wordIndexRef = useRef(0);

  const totalTypedRef = useRef(0);
  const correctCharsRef = useRef(0);
  const statusRef = useRef(status);

  // Keep statusRef in sync
  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  const progress = useMemo(
    () => (words.length ? (wordIndex / words.length) * 100 : 0),
    [wordIndex, words.length]
  );

  const finishGame = useCallback(
    (reason) => {
      if (statusRef.current !== "playing") return;
      const elapsed = timer.stop();
      const finalWpm = calculateWpm(correctCharsRef.current, elapsed);
      const finalAcc = calculateAccuracy(
        correctCharsRef.current,
        totalTypedRef.current
      );
      setWpm(finalWpm);
      setAccuracy(finalAcc);
      setLastResult({
        wpm: finalWpm,
        accuracy: finalAcc,
        time: elapsed,
        difficulty,
        reason,
        date: Date.now(),
      });
      setStatus("finished");
    },
    [difficulty, timer]
  );

  const startGame = useCallback(
    (diff) => {
      const d = diff || difficulty;
      if (diff) setDifficulty(d);
      const pool = quotes[d];
      const sequence = generateWordSequence(pool, WORD_COUNT);
      wordIndexRef.current = 0;
      setCurrentQuote(sequence);
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
    [difficulty, timer]
  );

  const stopGame = useCallback(() => {
    if (statusRef.current !== "playing") return;
    const elapsed = timer.stop();
    const finalWpm = calculateWpm(correctCharsRef.current, elapsed);
    const finalAcc = calculateAccuracy(
      correctCharsRef.current,
      totalTypedRef.current
    );
    setWpm(finalWpm);
    setAccuracy(finalAcc);
    setLastResult({
      wpm: finalWpm,
      accuracy: finalAcc,
      time: elapsed,
      difficulty,
      reason: "cancelled",
      date: Date.now(),
    });
    setStatus("finished");
  }, [difficulty, timer]);

  // 60s timeout
  useEffect(() => {
    if (status !== "playing") return;
    const id = setTimeout(() => finishGame("timeout"), TIMEOUT_MS);
    return () => clearTimeout(id);
  }, [status, finishGame]);

  const handleInput = useCallback(
    (value) => {
      if (statusRef.current !== "playing") return;

      setInputValue(value);
      const currentWord = words[wordIndexRef.current];
      if (!currentWord) return;

      if (value.endsWith(" ")) {
        const trimmed = value.trim();
        const correct = trimmed === currentWord;
        setTypedWords((prev) => [...prev, { word: trimmed, correct }]);

        if (wordIndexRef.current === words.length - 1 && correct) {
          finishGame("completed");
        } else {
          wordIndexRef.current += 1;
          setWordIndex(wordIndexRef.current);
          setInputValue("");
          setHasError(false);
        }
        return;
      }

      totalTypedRef.current += 1;

      if (currentWord.startsWith(value)) {
        correctCharsRef.current += 1;
        setHasError(false);
      } else {
        setHasError(true);
      }

      setWpm(calculateWpm(correctCharsRef.current, timer.elapsed));
      setAccuracy(
        calculateAccuracy(correctCharsRef.current, totalTypedRef.current)
      );
    },
    [words, timer, finishGame]
  );

  const dismissGame = useCallback(() => {
    setLastResult(null);
    setStatus("idle");
    timer.reset();
  }, [timer]);

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
    lastResult,
    startGame,
    stopGame,
    dismissGame,
    handleInput,
    setInputValue,
  };
}