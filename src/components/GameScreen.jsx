import ProgressBar from "./ProgressBar";
import QuoteDisplay from "./QuoteDisplay";
import TypeInput from "./TypeInput";
import MetricsDisplay from "./MetricsDisplay";

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
  onExit,
  isArmed,
}) {
  return (
    <div className="h-dvh flex flex-col mx-auto w-full max-w-7xl">
      {/* Header — normal flow, column layout with centered content */}
      <header className="game-header shrink-0 flex min-h-[12%] flex-col justify-center px-5 py-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32 relative">
        <div className="game-stats w-full grid grid-cols-2 items-center">
          <span className="min-w-0 text-xl md:text-2xl lg:text-3xl tracking-widest uppercase font-bold text-accent">
            {difficulty} MODE
          </span>
          <div className="min-w-0 flex justify-end">
            <MetricsDisplay wpm={wpm} accuracy={accuracy} elapsed={elapsed} />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 px-5 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
          <ProgressBar progress={progress} />
        </div>
      </header>

      {/* Quotes container — flexes to fill remaining space, vertically scrollable */}
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain text-justify px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
        <QuoteDisplay
          words={words}
          wordIndex={wordIndex}
          typedWords={typedWords}
        />
      </div>

      {/* Typing input — pinned above keyboard */}
      <footer className="shrink-0 flex flex-col min-h-fit py-4
      px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32 gap-4
      justify-center items-center">
        <button
          type="button"
          onClick={onExit}
          className="bg-accent text-accent-fg font-bold uppercase tracking-widest text-sm px-4 py-2 cursor-pointer"
        >
          EXIT
        </button>
        <TypeInput
          value={inputValue}
          onChange={onInput}
          hasError={hasError}
          disabled={false}
          placeholder={isArmed ? "START TYPING..." : "TYPE CURRENT WORD..."}
        />
      </footer>
    </div>
  );
}