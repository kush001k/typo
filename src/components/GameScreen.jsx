import ProgressBar from "./ProgressBar";
import QuoteDisplay from "./QuoteDisplay";
import TypeInput from "./TypeInput";
import LiveStats from "./LiveStats";

export default function GameScreen({
  words,
  wordIndex,
  typedWords,
  inputValue,
  hasError,
  wpm,
  accuracy,
  elapsed,
  progress,
  difficulty,
  onInput,
}) {
  return (
    <div className="h-screen flex flex-col mx-auto w-full">
      {/* Header — normal flow, column layout with centered content */}
      <header className="h-[10vh] flex flex-col items-center justify-center gap-4 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
        <div className="w-full flex items-center justify-between">
          <span className="text-xl md:text-2xl lg:text-3xl tracking-widest uppercase font-bold text-accent">
            {difficulty} MODE
          </span>
          <LiveStats wpm={wpm} accuracy={accuracy} elapsed={elapsed} />
        </div>
        <div className="w-full">
          <ProgressBar progress={progress} />
        </div>
      </header>

      {/* Quotes container — 60vh, vertically scrollable, centered text */}
      <div className="h-[78vh] overflow-y-scroll text-justify px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
        <QuoteDisplay
          words={words}
          wordIndex={wordIndex}
          typedWords={typedWords}
        />
      </div>

      {/* Typing input — bottom 20vh */}
      <footer className="flex h-[12vh] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32 items-center">
        <TypeInput
          value={inputValue}
          onChange={onInput}
          hasError={hasError}
          disabled={false}
          placeholder="TYPE CURRENT WORD..."
        />
      </footer>
    </div>
  );
}