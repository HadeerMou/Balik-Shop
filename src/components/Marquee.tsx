import { Fish } from "./Fish";

export function Marquee({
  items,
  className = "",
  speed = "normal",
}: {
  items: string[];
  className?: string;
  speed?: "normal" | "fast";
}) {
  const strip = [...items, ...items];
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className={`flex w-max ${speed === "fast" ? "animate-marquee-fast" : "animate-marquee"}`}
      >
        {[0, 1].map((dup) => (
          <ul key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
            {strip.slice(0, items.length).map((item, i) => (
              <li key={`${dup}-${i}`} className="flex items-center gap-4 whitespace-nowrap px-5">
                <span className="font-display text-sm font-semibold uppercase tracking-[0.18em]">
                  {item}
                </span>
                <Fish className="h-3 w-5 shrink-0" body="currentColor" fin="rgba(255,255,255,.55)" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
