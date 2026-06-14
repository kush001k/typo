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
    <div className="flex-1 flex flex-col gap-8 py-16 px-4 max-w-[90vw] mx-auto w-full">
      <div className="flex items-center justify-between">
        <span className="text-xs tracking-widest uppercase text-muted-fg">
          {difficulty} MODE
        </span>
        <LiveStats wpm={wpm} accuracy={accuracy} elapsed={elapsed} />
      </div>

      <ProgressBar progress={progress} />

      <div className="mt-4">
        <QuoteDisplay words={words} wordIndex={wordIndex} typedWords={typedWords} />
      </div>

      <TypeInput
        value={inputValue}
        onChange={onInput}
        hasError={hasError}
        disabled={false}
        placeholder="TYPE CURRENT WORD..."
      />
    </div>
  );
}