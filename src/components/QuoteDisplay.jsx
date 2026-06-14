import { memo } from "react";

function QuoteDisplay({ words, wordIndex, typedWords }) {
  return (
    <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed font-medium select-none">
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
          <span key={`${word}-${i}`} className={`${className} mr-2`}>
            {word}
          </span>
        );
      })}
    </p>
  );
}

export default memo(QuoteDisplay);