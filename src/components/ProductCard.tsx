"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/catalog";
import { useStore } from "@/context/StoreProvider";
import { ProductArt } from "./ProductArt";
import { Stars } from "./Stars";
import { IconBag, IconHeart } from "./Icons";

const BADGE_STYLE: Record<string, string> = {
  New: "bg-sky-300 text-navy-800",
  Bestseller: "bg-butter-300 text-navy-800",
  "Almost gone": "bg-navy-700 text-butter-200",
  Sale: "bg-coral-500 text-white",
};

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { price, add } = useStore();
  const [saved, setSaved] = useState(false);
  const onSale = Boolean(product.compareUsd);

  return (
    <article className="group relative flex flex-col">
      <div className="relative overflow-hidden rounded-4xl border-[2.5px] border-navy-700 bg-white shadow-pop transition-transform duration-200 group-hover:-translate-y-1">
        <Link href={`/product/${product.slug}`} className="block" aria-label={product.name}>
          <div className="relative aspect-[4/5] bg-gradient-to-b from-butter-50 to-white">
            <ProductArt
              kind={product.art}
              palette={product.palette}
              seed={index}
              className="h-full w-full p-3 transition-transform duration-300 group-hover:scale-[1.05]"
            />
          </div>
        </Link>

        {product.badge && (
          <span
            className={`absolute left-3 top-3 rounded-full border-2 border-navy-700 px-2.5 py-1 font-display text-[0.65rem] font-bold uppercase tracking-wider ${
              BADGE_STYLE[product.badge]
            }`}
          >
            {product.badge}
          </span>
        )}

        <button
          type="button"
          onClick={() => setSaved((v) => !v)}
          aria-pressed={saved}
          aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
          className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border-2 border-navy-700 transition ${
            saved ? "bg-coral-500 text-white" : "bg-white/90 text-navy-700 hover:bg-butter-100"
          }`}
        >
          <IconHeart className="h-4.5 w-4.5" />
        </button>

        {/* quick add — slides up on hover, always visible on touch */}
        <div className="absolute inset-x-3 bottom-3 translate-y-0 opacity-100 transition-all duration-200 sm:translate-y-3 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
          <button
            type="button"
            onClick={() =>
              add(product.slug, {
                size: product.sizes?.[Math.floor(product.sizes.length / 2)],
                color: product.colors[0]?.name,
              })
            }
            className="btn-primary btn-sm w-full"
          >
            <IconBag className="h-4 w-4" />
            Quick add
          </button>
        </div>
      </div>

      <div className="mt-3 px-1">
        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
          <h3 className="font-display text-[1rem] font-semibold leading-snug text-navy-700 sm:text-[1.05rem]">
            <Link href={`/product/${product.slug}`} className="hover:underline-wave">
              {product.name}
            </Link>
          </h3>
          <div className="flex items-baseline gap-2 sm:shrink-0 sm:flex-col sm:items-end sm:gap-0 sm:text-right">
            <p className={`font-display font-bold ${onSale ? "text-coral-600" : "text-navy-700"}`}>
              {price(product.usd)}
            </p>
            {onSale && (
              <p className="text-xs text-navy-300 line-through">{price(product.compareUsd!)}</p>
            )}
          </div>
        </div>

        <div className="mt-1.5 flex items-center justify-between gap-2">
          <Stars rating={product.rating} reviews={product.reviews} />
          <span className="flex items-center gap-1">
            {product.colors.slice(0, 4).map((c) => (
              <span
                key={c.name}
                title={c.name}
                className="h-3.5 w-3.5 rounded-full border-2 border-navy-700"
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </span>
        </div>
      </div>
    </article>
  );
}
