import { motion } from "motion/react";
import StatsMarquee from "./StatsMarquee";
import DifficultySelect from "./DifficultySelect";

export default function LandingScreen({
  onStart,
  difficulty,
  stats,
  gameStatus,
}) {
  return (
    <div className="relative flex flex-col min-h-dvh max-h-dvh px-4 sm:px-6 overflow-hidden">
      {/* Stats Marquee at top — pinned */}
      <StatsMarquee stats={stats} gameStatus={gameStatus} />

      {/* Hero */}
      <div className="flex flex-col items-center justify-center gap-2 sm:gap-4 md:gap-6 mt-10 pt-8">
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
          className="text-lg md:text-2xl lg:text-3xl text-muted-fg text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          TEST YOUR TYPING SPEED. BEAT THE CLOCK. CLIMB THE LEVELS.
        </motion.p>

        <motion.p
          className="text-sm md:text-lg lg:text-lg text-center pulse-yellow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          PRESS ENTER TO START OR SELECT A DIFFICULTY BELOW
        </motion.p>
      </div>

      {/* Difficulty — ungrouped */}
      <div className="mb-20 px-2 sm:px-4 mx-auto w-full flex flex-col items-center absolute bottom-0 left-0">
        <h2 className="text-sm md:text-lg lg:text-xl tracking-widest uppercase text-muted-fg mb-4">
          SELECT DIFFICULTY
        </h2>
        <DifficultySelect onSelect={onStart} active={difficulty} />
      </div>

      {/* Footer — ungrouped, absolute, fixed height */}
      <div className="absolute bottom-0 left-0 right-0 h-15 border-t-2 border-border w-full flex items-center justify-center">
        <p className="text-sm md:text-lg tracking-widest uppercase text-muted-fg text-center">
          <span className="text-accent font-bold">TYPO&nbsp;</span>— A KINETIC
          TYPING GAME
        </p>
      </div>
    </div>
  );
}
