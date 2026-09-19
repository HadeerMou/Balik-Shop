"use client";

import { IconMinus, IconPlus } from "./Icons";

export function QtyStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  compact = false,
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  compact?: boolean;
}) {
  const btn = `grid place-items-center rounded-full text-navy-700 transition hover:bg-butter-200 disabled:opacity-30 ${
    compact ? "h-7 w-7" : "h-9 w-9"
  }`;
  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full border-2 border-navy-700 bg-white ${
        compact ? "p-0.5" : "p-1"
      }`}
    >
      <button type="button" onClick={() => onChange(value - 1)} disabled={value <= min} className={btn} aria-label="Decrease quantity">
        <IconMinus className="h-4 w-4" />
      </button>
      <span className={`min-w-[1.75rem] text-center font-display font-semibold ${compact ? "text-sm" : ""}`} aria-live="polite">
        {value}
      </span>
      <button type="button" onClick={() => onChange(value + 1)} disabled={value >= max} className={btn} aria-label="Increase quantity">
        <IconPlus className="h-4 w-4" />
      </button>
    </div>
  );
}
