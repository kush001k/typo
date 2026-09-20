import { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";
import { useTypingGame } from "./hooks/useTypingGame";
import LandingScreen from "./components/LandingScreen";
import GameScreen from "./components/GameScreen";
import LoadingScreen from "./components/LoadingScreen";
import CompletionModal from "./components/CompletionModal";

export default function App() {
  const game = useTypingGame();
  // Latest finished-game stats for the marquee. Lives here (not in
  // StatsMarquee) because LandingScreen unmounts during loading/playing.
  // Session-only: resets to null (→ 0s) on reload. Latched during render
  // so it survives lastResult being cleared on dismiss/start.
  const [marqueeStats, setMarqueeStats] = useState(null);
  const [prevResult, setPrevResult] = useState(null);

  if (game.lastResult !== prevResult) {
    setPrevResult(game.lastResult);
    if (game.lastResult) {
      setMarqueeStats({
        wpm: game.lastResult.wpm,
        accuracy: game.lastResult.accuracy,
        time: (game.lastResult.time / 1000).toFixed(1),
      });
    }
  }

  const handleStart = useCallback(
    (diff) => game.startGame(diff),
    [game]
  );

  const handlePlayAgain = useCallback(
    () => game.startGame(game.difficulty),
    [game]
  );

  const handleDismiss = useCallback(() => {
    game.dismissGame();
  }, [game]);

  // Enter key starts game, ESC stops game
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Enter" && game.status === "idle") {
        game.startGame(game.difficulty);
      }
      if (
        e.key === "Escape" &&
        (game.status === "playing" || game.status === "ready")
      ) {
        game.stopGame();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [game]);

  const stats = marqueeStats;

  // One screen at a time: each screen carries a key, so React unmounts the
  // previous one on the same commit instead of leaving it mounted mid-exit.
  const renderScreen = () => {
    if (game.status === "idle" || game.status === "finished") {
      return (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <LandingScreen
            onStart={handleStart}
            difficulty={game.difficulty}
            stats={stats}
            gameStatus={game.status}
          />
        </motion.div>
      );
    }

    if (game.status === "loading") {
      return (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <LoadingScreen difficulty={game.difficulty} />
        </motion.div>
      );
    }

    return (
      <motion.div
        key="game"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <GameScreen
          words={game.words}
          wordIndex={game.wordIndex}
          typedWords={game.typedWords}
          inputValue={game.inputValue}
          hasError={game.hasError}
          wpm={game.wpm}
          accuracy={game.accuracy}
          elapsed={game.elapsed}
          progress={game.progress}
          difficulty={game.difficulty}
          onInput={game.handleInput}
          onExit={game.stopGame}
          isArmed={game.status === "ready"}
        />
      </motion.div>
    );
  };

  return (
    <div className="relative min-h-dvh bg-bg text-fg">
      {renderScreen()}

      <CompletionModal
        result={game.lastResult}
        onPlayAgain={handlePlayAgain}
        onDismiss={handleDismiss}
      />
    </div>
  );
}
