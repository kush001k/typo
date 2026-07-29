import { memo } from "react";

function QuoteDisplay({ words, wordIndex, typedWords }) {
  return (
    <p className="text-lg sm:text-xl md:text-2xl lg:text-4xl leading-relaxed font-medium select-none min-h-[4.5rem] sm:min-h-[5rem]">
      {words.map((word, i) => {
        let className = "text-muted-fg";
        if (i < wordIndex) {
          className = typedWords[i]?.correct
            ? "text-fg"
            : "text-error line-through";
        } else if (i === wordIndex) {
          className = "word-highlight";
        }
        return (
          <span key={`${word}-${i}`} className={className}>
            {word}{" "}
          </span>
        );
      })}
    </p>
  );
}

export default memo(QuoteDisplay);