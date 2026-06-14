import MarqueeImport from "react-fast-marquee";

const Marquee = MarqueeImport.default ?? MarqueeImport;

const stats = [
  { value: "400PM", label: "TYPING SPEED" },
  { value: "99%", label: "ACCURACY" },
  { value: "∞", label: "LIMITLESS" },
  { value: "0.3s", label: "REACTION" },
  { value: "WPM", label: "TRACKING" },
  { value: "5", label: "LEVELS" },
];

export default function StatsMarquee() {
  return (
    <div className="bg-accent text-accent-fg py-3 border-y-2 border-accent">
      <Marquee speed={80} autoFill gradient={false} pauseOnHover={false}>
        {stats.map((stat, i) => (
          <div key={i} className="flex items-baseline gap-3 px-8">
            <span className="text-2xl md:text-3xl font-bold uppercase tracking-tighter">
              {stat.value}
            </span>
            <span className="text-xs tracking-widest uppercase">
              {stat.label}
            </span>
          </div>
        ))}
      </Marquee>
    </div>
  );
}
