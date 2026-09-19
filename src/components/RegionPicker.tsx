"use client";

import { useEffect, useRef, useState } from "react";
import { useStore } from "@/context/StoreProvider";
import { REGION_LIST } from "@/lib/regions";
import { IconChevron, IconCheck } from "./Icons";

export function RegionPicker({ compact = false }: { compact?: boolean }) {
  const { region, setRegion } = useStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={`inline-flex items-center gap-2 rounded-full border-2 border-navy-700 bg-white px-3 py-1.5 font-display text-sm font-semibold text-navy-700 transition hover:bg-butter-100 ${
          compact ? "" : "shadow-pop-sm active:translate-y-[3px] active:shadow-none"
        }`}
      >
        <span className="text-base leading-none">{region.flag}</span>
        <span>{region.currency}</span>
        <IconChevron className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-90" : ""}`} />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-60 overflow-hidden rounded-3xl border-[2.5px] border-navy-700 bg-white shadow-float"
        >
          <p className="border-b-2 border-navy-100 bg-butter-100 px-4 py-2 font-display text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-navy-500">
            Ship to
          </p>
          {REGION_LIST.map((r) => {
            const active = r.code === region.code;
            return (
              <button
                key={r.code}
                role="option"
                aria-selected={active}
                onClick={() => {
                  setRegion(r.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left transition ${
                  active ? "bg-sky-100" : "hover:bg-butter-50"
                }`}
              >
                <span className="text-lg leading-none">{r.flag}</span>
                <span className="flex-1">
                  <span className="block font-display text-sm font-semibold text-navy-700">
                    {r.country}
                  </span>
                  <span className="block text-xs text-navy-400">
                    {r.currency} · {r.shipping.days}
                  </span>
                </span>
                {active && <IconCheck className="h-4 w-4 text-sky-600" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
