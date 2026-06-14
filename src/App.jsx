import { useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTypingGame } from "./hooks/useTypingGame";
import { useHighScores } from "./hooks/useHighScores";
import { saveLatestStats } from "./utils/storage";
import NoiseTexture from "./components/NoiseTexture";
import LandingScreen from "./components/LandingScreen";
import GameScreen from "./components/GameScreen";
import CompletionModal from "./components/CompletionModal";

export default function App() {
  const game = useTypingGame();
  const { addScore, scores } = useHighScores();

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
      if (e.key === "Escape" && game.status === "playing") {
        game.stopGame();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [game]);

  // Save score when game finishes
  useEffect(() => {
    if (game.status === "finished" && game.lastResult) {
      const r = game.lastResult;
      addScore(r.difficulty, {
        wpm: r.wpm,
        accuracy: r.accuracy,
        time: r.time,
        date: r.date,
      });
      saveLatestStats({
        wpm: r.wpm,
        accuracy: r.accuracy,
        wordsTyped: game.wordIndex,
        time: (r.time / 1000).toFixed(1),
        difficulty: r.difficulty,
      });
    }
  }, [game.status, game.lastResult, game.wordIndex, addScore]);

  return (
    <div className="relative min-h-dvh bg-bg text-fg">
      <NoiseTexture />

      <AnimatePresence mode="wait">
        {game.status === "idle" || game.status === "finished" ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LandingScreen
              onStart={handleStart}
              difficulty={game.difficulty}
              highScores={scores}
            />
          </motion.div>
        ) : (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
            />
          </motion.div>
        )}
      </AnimatePresence>

      <CompletionModal
        result={game.lastResult}
        onPlayAgain={handlePlayAgain}
        onDismiss={handleDismiss}
      />
    </div>
  );
}