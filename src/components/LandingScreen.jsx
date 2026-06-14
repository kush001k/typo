import { motion } from "motion/react";
import StatsMarquee from "./StatsMarquee";
import DifficultySelect from "./DifficultySelect";
import HighScoreList from "./HighScoreList";

export default function LandingScreen({
  onStart,
  difficulty,
  highScores,
}) {
  return (
    <div className="flex flex-col min-h-dvh">
      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-20">
        <motion.h1
          className="text-[clamp(4rem,15vw,16rem)] font-bold uppercase tracking-tighter leading-none text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-fg">T</span>
          <span className="text-accent">Y</span>
          <span className="text-fg">P</span>
          <span className="text-accent">O</span>
        </motion.h1>

        <motion.p
          className="mt-4 text-lg md:text-xl text-muted-fg text-center max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          TEST YOUR TYPING SPEED. BEAT THE CLOCK. CLIMB THE LEVELS.
        </motion.p>
      </div>

      {/* Marquee */}
      <StatsMarquee />

      {/* Difficulty & Start */}
      <div className="py-20 px-4 max-w-[90vw] mx-auto w-full">
        <h2 className="text-xs tracking-widest uppercase text-muted-fg mb-6">
          SELECT DIFFICULTY
        </h2>
        <DifficultySelect onSelect={onStart} active={difficulty} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px mt-8">
          <HighScoreList scores={highScores.easy} />
          <HighScoreList scores={highScores.medium} />
          <HighScoreList scores={highScores.hard} />
        </div>
      </div>

      {/* Footer */}
      <div className="border-t-2 border-border py-6 px-4">
        <p className="text-xs tracking-widest uppercase text-muted-fg text-center">
          TYPO — A KINETIC TYPING GAME
        </p>
      </div>
    </div>
  );
}