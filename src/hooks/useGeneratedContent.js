import { useState, useCallback, useRef } from "react";
import { quotes } from "../data/quotes";
import { generateContent } from "../utils/groq";

export function useGeneratedContent() {
  const [pools, setPools] = useState({});
  const [loading, setLoading] = useState({});
  const inFlightRef = useRef({});

  const getPool = useCallback(
    (difficulty) => pools[difficulty] || quotes[difficulty] || [],
    [pools]
  );

  const refreshLevel = useCallback(
    async (difficulty) => {
      // Dedupe: if a request for this level is already in-flight, share it
      if (inFlightRef.current[difficulty]) {
        return inFlightRef.current[difficulty];
      }

      setLoading((prev) => ({ ...prev, [difficulty]: true }));
      const promise = (async () => {
        try {
          const sentences = await generateContent(difficulty);
          setPools((prev) => ({ ...prev, [difficulty]: sentences }));
          return sentences;
        } catch (err) {
          console.error(`Groq generation failed for ${difficulty}:`, err.message);
          return quotes[difficulty] || [];
        } finally {
          setLoading((prev) => ({ ...prev, [difficulty]: false }));
          delete inFlightRef.current[difficulty];
        }
      })();

      inFlightRef.current[difficulty] = promise;
      return promise;
    },
    []
  );

  return { pools, loading, getPool, refreshLevel };
}