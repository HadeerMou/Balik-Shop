import { IconStar } from "./Icons";

export function Stars({ rating, reviews, size = "sm" }: { rating: number; reviews?: number; size?: "sm" | "md" }) {
  const dim = size === "md" ? "h-4.5 w-4.5" : "h-3.5 w-3.5";
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="flex text-butter-500" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => (
          <IconStar key={i} className={`${dim} ${i <= Math.round(rating) ? "" : "opacity-30"}`} />
        ))}
      </span>
      <span className="font-display text-xs font-semibold text-navy-500">
        {rating.toFixed(1)}
        {reviews !== undefined && <span className="font-sans font-normal text-navy-400"> ({reviews})</span>}
      </span>
    </span>
  );
}
