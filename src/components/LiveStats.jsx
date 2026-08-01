export default function LiveStats({ wpm, accuracy, elapsed }) {
  return (
    <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 text-sm md:text-lg lg:text-xl tracking-widest uppercase text-muted-fg">
      <div>
        <span className="text-accent font-bold text-lg md:text-xl lg:text-2xl">{wpm}</span>{" "}
        <span>WPM</span>
      </div>
      <div>
        <span className="text-accent font-bold text-lg md:text-xl lg:text-2xl">{accuracy}</span>
        <span>% ACC</span>
      </div>
      <div>
        <span className="text-accent font-bold text-lg md:text-xl lg:text-2xl">
          {(elapsed / 1000).toFixed(1)}
        </span>
        <span>S </span>
        <span className="font-bold text-lg md:text-xl lg:text-2xl">
          / 60
        </span>
        <span>S</span>
      </div>
    </div>
  );
}