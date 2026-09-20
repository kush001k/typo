import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { calculateWpm, calculateAccuracy } from "../utils/scoring";
import { generateWordSequence } from "../utils/sequencing";
import { quotes } from "../data/quotes";
import { useTimer } from "./useTimer";
import { useGeneratedContent } from "./useGeneratedContent";

const WORD_COUNT = 200;
const MIN_LOADING_MS = 3000;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function useTypingGame() {
  const { refreshLevel } = useGeneratedContent();
  const [difficulty, setDifficulty] = useState("medium");
  const [status, setStatus] = useState("idle");
  const [currentQuote, setCurrentQuote] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [typedWords, setTypedWords] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [hasError, setHasError] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
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
    [wordIndex, words.length],
  );

  const finishGame = useCallback(
    (reason) => {
      if (statusRef.current !== "playing") return;
      const elapsed = timer.stop();
      const finalWpm = calculateWpm(correctCharsRef.current, elapsed);
      const finalAcc = calculateAccuracy(
        correctCharsRef.current,
        totalTypedRef.current,
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
    [difficulty, timer],
  );

  // End the game automatically when the timer reaches exactly 999 seconds
  useEffect(() => {
    if (timer.elapsed >= 999 * 1000) {
      finishGame("timeout");
    }
  }, [timer.elapsed, finishGame]);

  const startGame = useCallback(
    async (diff) => {
      const d = diff || difficulty;
      if (diff) setDifficulty(d);
      // Enter loading state while the LLM generates content for this level
      setStatus("loading");
      setLastResult(null);

      const startTime = Date.now();
      const controller = new AbortController();

      // Fire the LLM request and the 3s minimum delay together
      const llmPromise = refreshLevel(d, controller.signal);
      const minDelay = sleep(MIN_LOADING_MS).then(() => "min-delay");

      const winner = await Promise.race([llmPromise, minDelay]);

      let pool;
      if (winner === "min-delay") {
        // 3s elapsed, LLM not ready → deterministic code-based fallback
        controller.abort();
        pool = quotes[d] || [];
      } else {
        // LLM resolved (or errored→fallback) before 3s
        pool = winner.sentences;
        const remaining = MIN_LOADING_MS - (Date.now() - startTime);
        if (remaining > 0) {
          await sleep(remaining);
        }
      }

      const sequence = generateWordSequence(pool, WORD_COUNT);
      wordIndexRef.current = 0;
      setCurrentQuote(sequence);
      setWordIndex(0);
      setTypedWords([]);
      setInputValue("");
      setHasError(false);
      setWpm(0);
      setAccuracy(0);
      totalTypedRef.current = 0;
      correctCharsRef.current = 0;
      // Armed: the clock starts on the first keystroke (see handleInput)
      timer.reset();
      setStatus("ready");
    },
    [difficulty, timer, refreshLevel],
  );

  const stopGame = useCallback(() => {
    const currentStatus = statusRef.current;
    // Armed but nothing typed yet: exit home without recording a result
    if (currentStatus === "ready") {
      setLastResult(null);
      setStatus("idle");
      timer.reset();
      return;
    }
    if (currentStatus !== "playing") return;
    const elapsed = timer.stop();
    const finalWpm = calculateWpm(correctCharsRef.current, elapsed);
    const finalAcc = calculateAccuracy(
      correctCharsRef.current,
      totalTypedRef.current,
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

  const handleInput = useCallback(
    (value) => {
      const currentStatus = statusRef.current;
      if (currentStatus !== "playing" && currentStatus !== "ready") return;

      // First keystroke starts the clock — exactly once
      if (currentStatus === "ready") {
        if (!value) return;
        statusRef.current = "playing"; // sync guard: prevents a double start
        timer.start();
        setStatus("playing");
      }

      setInputValue(value);
      const currentWord = words[wordIndexRef.current];
      if (!currentWord) return;

      if (value.endsWith(" ")) {
        const trimmed = value.trim();
        const correct = trimmed === currentWord;
        setTypedWords((prev) => [...prev, { word: trimmed, correct }]);

        if (wordIndexRef.current === words.length - 1) {
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
        calculateAccuracy(correctCharsRef.current, totalTypedRef.current),
      );
    },
    [words, timer, finishGame],
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