import { memo, useEffect, useRef } from "react";

function QuoteDisplay({ words, wordIndex, typedWords }) {
  const currentWordRef = useRef(null);

  useEffect(() => {
    currentWordRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [wordIndex]);

  return (
    <p className="text-lg sm:text-xl md:text-2xl lg:text-4xl leading-relaxed font-medium select-none min-h-18 sm:min-h-20">
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
          <span
            key={`${word}-${i}`}
            ref={i === wordIndex ? currentWordRef : null}
            className={className}
          >
            {word}{" "}
          </span>
        );
      })}
    </p>
  );
}

export default memo(QuoteDisplay);