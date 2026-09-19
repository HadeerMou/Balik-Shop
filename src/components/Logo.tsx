import Link from "next/link";
import { Fish } from "./Fish";

/** The circular Balık Shop badge, rebuilt in vector from the shop's profile mark. */
export function LogoBadge({ size = 56, className = "" }: { size?: number; className?: string }) {
  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center rounded-full bg-butter-300 border-[2.5px] border-navy-700 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <span
        className="flex flex-col items-center justify-center leading-none font-display font-bold text-navy-700"
        style={{ fontSize: size * 0.21 }}
      >
        <span className="tracking-tight">Balık</span>
        <Fish className="my-[0.14em] w-[0.9em]" />
        <span className="tracking-tight">Shop</span>
      </span>
    </span>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-3" aria-label="Balık Shop — home">
      <span className="relative">
        <LogoBadge size={compact ? 44 : 52} className="transition-transform duration-200 group-hover:-rotate-6" />
      </span>
      {!compact && (
        <span className="hidden font-display text-2xl font-bold leading-none tracking-tight text-navy-700 sm:block">
          Balık
          <span className="text-sky-500">.</span>
          <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.34em] text-navy-400">
            Shop
          </span>
        </span>
      )}
    </Link>
  );
}
