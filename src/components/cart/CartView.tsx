"use client";

import Link from "next/link";
import { useState } from "react";
import { useStore, money } from "@/context/StoreProvider";
import { PRODUCTS } from "@/lib/catalog";
import { ProductArt } from "@/components/ProductArt";
import { ProductGrid } from "@/components/ProductGrid";
import { QtyStepper } from "@/components/QtyStepper";
import { Fish } from "@/components/Fish";
import { IconArrow, IconCheck, IconReturn, IconTruck } from "@/components/Icons";

export function CartView() {
  const { items, setQty, remove, subtotal, shippingFee, total, region, price, count, clear, ready } =
    useStore();
  const [promo, setPromo] = useState("");
  const [promoState, setPromoState] = useState<"idle" | "ok" | "bad">("idle");

  const remaining = Math.max(0, region.shipping.freeOver - subtotal);
  const suggestions = PRODUCTS.filter((p) => !items.some((i) => i.slug === p.slug)).slice(0, 4);

  if (!ready) {
    return <div className="section py-28 text-center font-display text-navy-400">Loading your bag…</div>;
  }

  if (items.length === 0) {
    return (
      <div className="section py-16">
        <div className="flex flex-col items-center rounded-[2.5rem] border-[3px] border-navy-700 bg-white py-20 text-center shadow-pop-lg">
          <Fish className="w-32 animate-swim" />
          <h1 className="mt-6 font-display text-3xl font-bold text-navy-700">Your bag is empty</h1>
          <p className="mt-2 max-w-sm text-navy-500">
            Nothing caught your eye yet? Start with the pieces everyone keeps reordering.
          </p>
          <Link href="/shop" className="btn-primary mt-6 text-lg">
            Shop everything <IconArrow className="h-5 w-5" />
          </Link>
        </div>

        <section className="mt-16">
          <h2 className="mb-6 font-display text-2xl font-bold text-navy-700">Popular right now</h2>
          <ProductGrid products={suggestions} />
        </section>
      </div>
    );
  }

  return (
    <div className="section py-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-4xl font-bold text-navy-700 sm:text-5xl">Your bag</h1>
          <p className="mt-2 text-navy-500">
            {count} {count === 1 ? "item" : "items"} · shipping to {region.flag} {region.country}
          </p>
        </div>
        <button onClick={clear} className="text-sm text-navy-400 underline hover:text-coral-600">
          Empty bag
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* lines */}
        <div>
          {remaining > 0 ? (
            <div className="mb-5 flex items-center gap-3 rounded-3xl border-2 border-navy-700 bg-butter-200 px-5 py-3.5">
              <IconTruck className="h-5 w-5 shrink-0 text-navy-700" />
              <p className="text-sm text-navy-700">
                Add <strong className="font-display">{money(remaining, region)}</strong> more and
                shipping is on us.
              </p>
            </div>
          ) : (
            <div className="mb-5 flex items-center gap-3 rounded-3xl border-2 border-navy-700 bg-mint-300 px-5 py-3.5">
              <IconCheck className="h-5 w-5 shrink-0 text-navy-800" />
              <p className="text-sm font-semibold text-navy-800">Free shipping unlocked.</p>
            </div>
          )}

          <ul className="space-y-4">
            {items.map((line, i) => (
              <li
                key={line.id}
                className="flex flex-col gap-4 rounded-4xl border-[2.5px] border-navy-700 bg-white p-4 shadow-pop sm:flex-row"
              >
                <Link
                  href={`/product/${line.product.slug}`}
                  className="h-32 w-full shrink-0 overflow-hidden rounded-3xl border-2 border-navy-700 bg-butter-50 sm:h-28 sm:w-28"
                >
                  <ProductArt kind={line.product.art} palette={line.product.palette} seed={i} className="h-full w-full" />
                </Link>

                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-display text-lg font-semibold text-navy-700">
                        <Link href={`/product/${line.product.slug}`} className="hover:underline-wave">
                          {line.product.name}
                        </Link>
                      </h2>
                      <p className="mt-1 text-sm text-navy-400">
                        {[line.size && `Size ${line.size}`, line.color].filter(Boolean).join(" · ") ||
                          "One size"}
                      </p>
                    </div>
                    <p className="shrink-0 font-display text-lg font-bold text-navy-700">
                      {price(line.product.usd * line.qty)}
                    </p>
                  </div>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                    <QtyStepper value={line.qty} onChange={(q) => setQty(line.id, q)} min={0} />
                    <button
                      onClick={() => remove(line.id)}
                      className="text-sm text-navy-400 underline hover:text-coral-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <Link href="/shop" className="btn-ghost btn-sm mt-6">
            Keep shopping
          </Link>
        </div>

        {/* summary */}
        <aside className="lg:sticky lg:top-32 lg:h-fit">
          <div className="rounded-4xl border-[3px] border-navy-700 bg-white p-6 shadow-pop-lg">
            <h2 className="font-display text-xl font-bold text-navy-700">Order summary</h2>

            <dl className="mt-5 space-y-3 text-navy-600">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd className="font-display font-semibold text-navy-700">{money(subtotal, region)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Shipping</dt>
                <dd className="font-display font-semibold">
                  {shippingFee === 0 ? (
                    <span className="text-mint-500">Free</span>
                  ) : (
                    money(shippingFee, region)
                  )}
                </dd>
              </div>
              <div className="flex justify-between text-sm text-navy-400">
                <dt>Estimated delivery</dt>
                <dd>{region.shipping.days}</dd>
              </div>
            </dl>

            {/* promo */}
            <form
              className="mt-5 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                setPromoState(promo.trim().toUpperCase() === "BALIK10" ? "ok" : "bad");
              }}
            >
              <input
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                placeholder="Promo code"
                aria-label="Promo code"
                className="field py-2.5 text-sm"
              />
              <button type="submit" className="btn-ghost btn-sm shrink-0">
                Apply
              </button>
            </form>
            {promoState === "ok" && (
              <p className="mt-2 text-xs font-semibold text-mint-500">
                BALIK10 applied at checkout — 10% off.
              </p>
            )}
            {promoState === "bad" && (
              <p className="mt-2 text-xs text-coral-600">That code isn&apos;t swimming here. Try BALIK10.</p>
            )}

            <div className="mt-5 flex items-baseline justify-between border-t-2 border-navy-100 pt-5">
              <span className="font-display text-lg font-bold text-navy-700">Total</span>
              <span className="font-display text-2xl font-bold text-navy-700">
                {money(total, region)}
              </span>
            </div>

            <Link href="/checkout" className="btn-primary mt-5 w-full text-lg">
              Checkout <IconArrow className="h-5 w-5" />
            </Link>

            <p className="mt-4 flex items-center justify-center gap-2 text-xs text-navy-400">
              <IconReturn className="h-4 w-4" />
              14-day returns · {region.cod ? "cash on delivery available" : "secure card payment"}
            </p>
          </div>
        </aside>
      </div>

      <section className="mt-20">
        <h2 className="mb-6 font-display text-2xl font-bold text-navy-700">Add a little something</h2>
        <ProductGrid products={suggestions} offset={9} />
      </section>
    </div>
  );
}
