import { motion } from "motion/react";

const dotVariants = {
  pulse: {
    scale: [1, 1.5, 1],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const dotsContainer = {
  pulse: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function LoadingScreen({ difficulty }) {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <motion.h1
        className="text-5xl md:text-7xl font-bold uppercase tracking-tighter text-white text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Warm up your fingers
      </motion.h1>

      <motion.div
        className="flex items-center gap-4"
        variants={dotsContainer}
        initial="pulse"
        animate="pulse"
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-accent"
            variants={dotVariants}
          />
        ))}
      </motion.div>

      <motion.p
        className="text-sm md:text-lg tracking-widest uppercase text-muted-fg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        LOADING {difficulty.toUpperCase()} CONTENT…
      </motion.p>
    </div>
  );
}