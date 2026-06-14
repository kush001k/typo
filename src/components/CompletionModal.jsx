import { motion, AnimatePresence } from "motion/react";

export default function CompletionModal({ result, onPlayAgain }) {
  if (!result) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="border-2 border-border bg-bg p-12 max-w-lg w-full mx-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-6">
            DONE
          </h2>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center">
              <span className="block text-4xl md:text-5xl font-bold text-accent">
                {result.wpm}
              </span>
              <span className="text-xs tracking-widest uppercase text-muted-fg">
                WPM
              </span>
            </div>
            <div className="text-center">
              <span className="block text-4xl md:text-5xl font-bold text-accent">
                {result.accuracy}
              </span>
              <span className="text-xs tracking-widest uppercase text-muted-fg">
                % ACC
              </span>
            </div>
            <div className="text-center">
              <span className="block text-4xl md:text-5xl font-bold text-accent">
                {(result.time / 1000).toFixed(1)}
              </span>
              <span className="text-xs tracking-widest uppercase text-muted-fg">
                SECONDS
              </span>
            </div>
          </div>

          <p className="text-xs tracking-widest uppercase text-muted-fg mb-6">
            DIFFICULTY: {result.difficulty.toUpperCase()}
          </p>

          <button
            onClick={onPlayAgain}
            className="w-full py-4 px-8 bg-accent text-accent-fg text-sm font-bold uppercase tracking-tighter
              hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer"
          >
            PLAY AGAIN
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}