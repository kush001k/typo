export default function LiveStats({ wpm, accuracy, elapsed }) {
  return (
    <div className="flex gap-8 text-xs tracking-widest uppercase text-muted-fg">
      <div>
        <span className="text-accent font-bold text-lg">{wpm}</span>{" "}
        <span>WPM</span>
      </div>
      <div>
        <span className="text-accent font-bold text-lg">{accuracy}</span>
        <span>% ACC</span>
      </div>
      <div>
        <span className="text-accent font-bold text-lg">
          {(elapsed / 1000).toFixed(1)}
        </span>
        <span>S</span>
      </div>
    </div>
  );
}