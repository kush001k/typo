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
    <div className="relative flex flex-col gap-8 max-h-dvh mx-auto w-full">
      {/* Header — pinned top */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
        <span className="text-sm md:text-lg lg:text-xl tracking-widest uppercase text-muted-fg">
          {difficulty} MODE
        </span>
        <LiveStats wpm={wpm} accuracy={accuracy} elapsed={elapsed} />
      </div>

      {/* Middle content — centered between pinned header/footer */}
      <div className="flex-1 flex flex-col justify-center gap-8 pt-20 pb-28 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
        <ProgressBar progress={progress} />

        <div className="mt-4">
          <QuoteDisplay
            words={words}
            wordIndex={wordIndex}
            typedWords={typedWords}
          />
        </div>
      </div>

      {/* Footer — pinned bottom */}
      <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
        <TypeInput
          value={inputValue}
          onChange={onInput}
          hasError={hasError}
          disabled={false}
          placeholder="TYPE CURRENT WORD..."
        />
      </div>
    </div>
  );
}