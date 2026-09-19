"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useStore, money } from "@/context/StoreProvider";
import { ProductArt } from "./ProductArt";
import { QtyStepper } from "./QtyStepper";
import { IconClose, IconTruck } from "./Icons";
import { Fish } from "./Fish";

export function CartDrawer() {
  const { drawerOpen, closeDrawer, items, setQty, remove, subtotal, region, price, count } = useStore();
  // Stay mounted for the closing animation, then unmount.
  const [mounted, setMounted] = useState(drawerOpen);

  useEffect(() => {
    if (drawerOpen) {
      setMounted(true);
      return;
    }
    const timer = window.setTimeout(() => setMounted(false), 220);
    return () => window.clearTimeout(timer);
  }, [drawerOpen]);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [drawerOpen, closeDrawer]);

  if (!mounted) return null;

  const remaining = Math.max(0, region.shipping.freeOver - subtotal);
  const progress = Math.min(100, (subtotal / region.shipping.freeOver) * 100);

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        className={`absolute inset-0 bg-navy-900/45 backdrop-blur-[2px] ${
          drawerOpen ? "animate-scrim-in" : "animate-scrim-out"
        }`}
        onClick={closeDrawer}
        aria-label="Close cart"
      />

      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l-[3px] border-navy-700 bg-cream ${
          drawerOpen ? "animate-drawer-in" : "animate-drawer-out"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
      >
        <div className="flex items-center justify-between border-b-[2.5px] border-navy-700 bg-butter-200 px-5 py-4">
          <h2 className="font-display text-xl font-bold text-navy-700">
            Your bag {count > 0 && <span className="text-navy-400">({count})</span>}
          </h2>
          <button
            onClick={closeDrawer}
            className="grid h-9 w-9 place-items-center rounded-full border-2 border-navy-700 bg-white"
            aria-label="Close cart"
          >
            <IconClose className="h-5 w-5" />
          </button>
        </div>

        {items.length > 0 && (
          <div className="border-b-2 border-navy-100 bg-white px-5 py-3">
            <p className="flex items-center gap-2 text-sm text-navy-600">
              <IconTruck className="h-4.5 w-4.5 text-sky-500" />
              {remaining > 0 ? (
                <span>
                  <strong className="font-display">{money(remaining, region)}</strong> away from free
                  shipping
                </span>
              ) : (
                <span className="font-display font-semibold text-mint-500">
                  Free shipping unlocked
                </span>
              )}
            </p>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full border-2 border-navy-700 bg-butter-100">
              <div
                className="h-full rounded-full bg-sky-400 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <Fish className="mb-4 w-24 animate-swim" />
              <p className="font-display text-lg font-semibold text-navy-700">Nothing in here yet</p>
              <p className="mt-1 max-w-[18rem] text-sm text-navy-400">
                Your bag is emptier than the sea at noon. Let&apos;s fix that.
              </p>
              <Link href="/shop" onClick={closeDrawer} className="btn-sky mt-5">
                Start shopping
              </Link>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((line, i) => (
                <li key={line.id} className="flex gap-3 rounded-3xl border-2 border-navy-700 bg-white p-3">
                  <Link
                    href={`/product/${line.product.slug}`}
                    onClick={closeDrawer}
                    className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 border-navy-700 bg-butter-50"
                  >
                    <ProductArt kind={line.product.art} palette={line.product.palette} seed={i} className="h-full w-full" />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-sm font-semibold text-navy-700">
                      {line.product.name}
                    </p>
                    <p className="mt-0.5 text-xs text-navy-400">
                      {[line.size, line.color].filter(Boolean).join(" · ") || "One size"}
                    </p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <QtyStepper compact value={line.qty} onChange={(q) => setQty(line.id, q)} min={0} />
                      <span className="font-display text-sm font-bold text-navy-700">
                        {price(line.product.usd * line.qty)}
                      </span>
                    </div>
                    <button
                      onClick={() => remove(line.id)}
                      className="mt-1.5 text-xs text-navy-400 underline hover:text-coral-600"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t-[2.5px] border-navy-700 bg-white px-5 py-4">
            <div className="flex items-center justify-between font-display text-lg font-bold text-navy-700">
              <span>Subtotal</span>
              <span>{money(subtotal, region)}</span>
            </div>
            <p className="mt-1 text-xs text-navy-400">
              Shipping and duties calculated at checkout · {region.flag} {region.country}
            </p>
            <Link href="/checkout" onClick={closeDrawer} className="btn-primary mt-3 w-full">
              Checkout
            </Link>
            <Link href="/cart" onClick={closeDrawer} className="btn-ghost mt-2 w-full">
              View full bag
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
