export default function ProgressBar({ progress }) {
  return (
    <div className="w-full h-1 bg-border">
      <div
        className="h-full bg-accent transition-all duration-200"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}