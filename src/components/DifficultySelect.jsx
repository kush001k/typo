import { motion } from "motion/react";

const difficulties = [
  {
    key: "easy",
    label: "EASY",
    desc: "No uppercase, no punctuation",
    num: "01",
  },
  {
    key: "medium",
    label: "MEDIUM",
    desc: "Uppercase + simple punctuation",
    num: "02",
  },
  {
    key: "hard",
    label: "HARD",
    desc: "Uppercase + complex punctuation",
    num: "03",
  },
];

export default function DifficultySelect({ onSelect, active }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border-2 border-border w-full mx-auto">
      {difficulties.map((d) => (
        <motion.button
          key={d.key}
          onClick={() => onSelect(d.key)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`group p-1 sm:px-2 md:px-3 text-left cursor-pointer transition-colors duration-300
            ${
              active === d.key
                ? "bg-accent text-accent-fg"
                : "bg-bg text-fg hover:bg-accent hover:text-accent-fg"
            }`}
        >
          <div className="flex items-baseline gap-2">
            <span className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter opacity-20 group-hover:opacity-40">
              {d.num}
            </span>
            <span className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-tighter">
              {d.label}
            </span>
          </div>
          <span className="block text-sm md:text-lg lg:text-xl text-muted-fg group-hover:text-accent-fg/70">
            {d.desc}
          </span>
        </motion.button>
      ))}
    </div>
  );
}