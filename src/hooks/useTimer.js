import { useState, useRef, useCallback, useEffect } from "react";

export function useTimer() {
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef(null);
  const idRef = useRef(null);

  useEffect(() => () => clearInterval(idRef.current), []);

  const tick = useCallback(() => {
    if (startRef.current) setElapsed(Date.now() - startRef.current);
  }, []);

  const start = useCallback(() => {
    clearInterval(idRef.current);
    startRef.current = Date.now();
    setElapsed(0);
    idRef.current = setInterval(tick, 50);
  }, [tick]);

  const stop = useCallback(() => {
    clearInterval(idRef.current);
    const final = startRef.current ? Date.now() - startRef.current : 0;
    startRef.current = null;
    return final;
  }, []);

  const reset = useCallback(() => {
    clearInterval(idRef.current);
    startRef.current = null;
    setElapsed(0);
  }, []);

  return { elapsed, start, stop, reset };
}