export default function LiveStats({ wpm, accuracy, elapsed }) {
  return (
    <div className="flex flex-wrap gap-x-2 sm:gap-x-4 md:gap-x-8 text-md md:text-lg lg:text-xl tracking-widest uppercase text-muted-fg justify-end">
      <div>
        <span className="text-accent font-bold text-lg md:text-xl lg:text-2xl">{wpm}</span>{" "}
        <span>WPM</span>
      </div>
      <div>
        <span className="text-accent font-bold text-lg md:text-xl lg:text-2xl">{accuracy}</span>
        <span>% ACC</span>
      </div>
      <div>
        <span className="text-accent font-bold text-lg md:text-xl lg:text-2xl inline-block w-[5ch] tabular-nums text-center">
          {(elapsed / 1000).toFixed(1)}
        </span>
        <span>S</span>
      </div>
    </div>
  );
}