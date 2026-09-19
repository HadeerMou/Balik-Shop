"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/catalog";
import { CATEGORIES } from "@/lib/catalog";
import { useStore } from "@/context/StoreProvider";
import { ProductArt } from "@/components/ProductArt";
import { QtyStepper } from "@/components/QtyStepper";
import { Stars } from "@/components/Stars";
import { IconBag, IconCheck, IconChevron, IconHeart, IconReturn, IconShield, IconTruck } from "@/components/Icons";

export function ProductDetail({ product }: { product: Product }) {
  const { price, add, region } = useStore();
  const [size, setSize] = useState<string | undefined>(product.sizes?.[1] ?? product.sizes?.[0]);
  const [color, setColor] = useState(product.colors[0]?.name);
  const [qty, setQty] = useState(1);
  const [view, setView] = useState(0);
  const [saved, setSaved] = useState(false);
  const [added, setAdded] = useState(false);

  const onSale = Boolean(product.compareUsd);
  const saving = onSale ? Math.round(((product.compareUsd! - product.usd) / product.compareUsd!) * 100) : 0;
  const category = CATEGORIES.find((c) => c.slug === product.category);

  const activeColor = product.colors.find((c) => c.name === color);
  const palette: [string, string, string] = activeColor
    ? [activeColor.hex, product.palette[1], product.palette[2]]
    : product.palette;

  function handleAdd() {
    add(product.slug, { size, color, qty });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="section py-8 lg:py-12">
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-navy-400">
        <Link href="/" className="hover:text-navy-700">Home</Link>
        <span>/</span>
        <Link href={`/shop?category=${product.category}`} className="hover:text-navy-700">
          {category?.name}
        </Link>
        <span>/</span>
        <span className="text-navy-700">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* gallery */}
        <div>
          <div className="relative overflow-hidden rounded-[2.5rem] border-[3px] border-navy-700 bg-gradient-to-b from-butter-50 to-white shadow-pop-lg">
            <ProductArt kind={product.art} palette={palette} zoom={view} className="aspect-square w-full p-6" />
            {onSale && (
              <span className="absolute left-5 top-5 rounded-full border-2 border-navy-700 bg-coral-500 px-3 py-1.5 font-display text-xs font-bold uppercase tracking-wider text-white">
                −{saving}%
              </span>
            )}
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                onClick={() => setView(i)}
                aria-label={`View ${i + 1}`}
                className={`overflow-hidden rounded-2xl border-2 bg-white transition ${
                  view === i ? "border-navy-700 ring-4 ring-sky-200" : "border-navy-200 hover:border-navy-700"
                }`}
              >
                <ProductArt kind={product.art} palette={palette} zoom={i} className="aspect-square w-full" />
              </button>
            ))}
          </div>
        </div>

        {/* buy box */}
        <div>
          {product.badge && (
            <span className="chip bg-butter-200">{product.badge}</span>
          )}
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-navy-700 sm:text-[2.6rem]">
            {product.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-4">
            <Stars rating={product.rating} reviews={product.reviews} size="md" />
            <span className="text-sm text-navy-400">·</span>
            <Link href={`/shop?category=${product.category}`} className="text-sm text-sky-600 underline-wave">
              More in {category?.name}
            </Link>
          </div>

          <div className="mt-5 flex items-end gap-3">
            <span className={`font-display text-4xl font-bold ${onSale ? "text-coral-600" : "text-navy-700"}`}>
              {price(product.usd)}
            </span>
            {onSale && (
              <>
                <span className="pb-1 text-lg text-navy-300 line-through">{price(product.compareUsd!)}</span>
                <span className="mb-1.5 rounded-full bg-coral-500 px-2 py-0.5 font-display text-xs font-bold text-white">
                  Save {saving}%
                </span>
              </>
            )}
          </div>
          <p className="mt-1 text-xs text-navy-400">
            Priced in {region.currency} for {region.flag} {region.country}. Taxes included.
          </p>

          <p className="mt-5 leading-relaxed text-navy-600">{product.blurb}</p>

          {/* colours */}
          <div className="mt-7">
            <div className="flex items-baseline justify-between">
              <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-navy-600">
                Colour
              </h2>
              <span className="text-sm text-navy-500">{color}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  aria-label={c.name}
                  aria-pressed={c.name === color}
                  className={`grid h-11 w-11 place-items-center rounded-full border-[2.5px] border-navy-700 transition ${
                    c.name === color ? "ring-4 ring-sky-300" : "hover:scale-105"
                  }`}
                  style={{ backgroundColor: c.hex }}
                >
                  {c.name === color && (
                    <IconCheck className="h-5 w-5 text-navy-800 mix-blend-luminosity" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* sizes */}
          {product.sizes && (
            <div className="mt-7">
              <div className="flex items-baseline justify-between">
                <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-navy-600">
                  Size
                </h2>
                <button className="text-sm text-sky-600 underline-wave">Size guide</button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    aria-pressed={s === size}
                    className={`h-12 min-w-[3rem] rounded-2xl border-[2.5px] border-navy-700 px-3 font-display font-semibold transition ${
                      s === size
                        ? "bg-navy-700 text-butter-200 shadow-pop-sm"
                        : "bg-white text-navy-700 hover:bg-butter-100"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* add to bag */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <QtyStepper value={qty} onChange={setQty} />
            <button onClick={handleAdd} className="btn-primary min-w-[9rem] flex-1 whitespace-nowrap px-4 text-base sm:px-6 sm:text-lg">
              {added ? (
                <>
                  <IconCheck className="h-5 w-5" /> Added to bag
                </>
              ) : (
                <>
                  <IconBag className="h-5 w-5" /> Add to bag
                  <span className="hidden sm:inline"> — {price(product.usd * qty)}</span>
                </>
              )}
            </button>
            <button
              onClick={() => setSaved((v) => !v)}
              aria-pressed={saved}
              aria-label="Save to wishlist"
              className={`grid h-[52px] w-[52px] place-items-center rounded-full border-[2.5px] border-navy-700 shadow-pop transition active:translate-y-[3px] active:shadow-none ${
                saved ? "bg-coral-500 text-white" : "bg-white text-navy-700 hover:bg-butter-100"
              }`}
            >
              <IconHeart className="h-5 w-5" />
            </button>
          </div>
          <Link href="/checkout" className="btn-butter mt-3 w-full text-lg">
            Buy it now
          </Link>

          {/* shipping strip */}
          <div className="mt-7 space-y-2.5 rounded-3xl border-2 border-navy-700 bg-sky-100 p-5">
            <Row icon={<IconTruck className="h-5 w-5" />}>
              <strong className="font-display">{region.shipping.days}</strong> to {region.country} with{" "}
              {region.shipping.courier}
            </Row>
            <Row icon={<IconReturn className="h-5 w-5" />}>
              Free returns within 14 days, unworn with tags
            </Row>
            <Row icon={<IconShield className="h-5 w-5" />}>
              {region.cod ? "Cash on delivery available" : "Secure card payment"} · encrypted checkout
            </Row>
          </div>

          {/* accordions */}
          <div className="mt-7 divide-y-2 divide-navy-100 border-y-2 border-navy-100">
            <Accordion title="Product details" defaultOpen>
              <ul className="space-y-1.5">
                {product.details.map((d) => (
                  <li key={d} className="flex gap-2">
                    <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-sky-500" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-navy-400">Material: {product.material}</p>
            </Accordion>
            <Accordion title="Shipping & delivery">
              <p>
                Orders leave our Istanbul studio within 24 hours. Delivery to {region.country} takes{" "}
                {region.shipping.days} with {region.shipping.courier}, fully tracked.
              </p>
              <p className="mt-2">
                Shipping is free over {new Intl.NumberFormat("en-US").format(region.shipping.freeOver)}{" "}
                {region.currency}. Below that it&apos;s a flat{" "}
                {new Intl.NumberFormat("en-US").format(region.shipping.fee)} {region.currency}.
              </p>
            </Accordion>
            <Accordion title="Returns & exchanges">
              <p>
                Changed your mind? Send it back within 14 days, unworn with tags on, and we&apos;ll
                refund the item price. Exchanges for a different size ship free.
              </p>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <p className="flex items-start gap-3 text-sm text-navy-700">
      <span className="mt-0.5 shrink-0 text-sky-600">{icon}</span>
      <span>{children}</span>
    </p>
  );
}

function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-4 text-left font-display text-base font-semibold text-navy-700"
      >
        {title}
        <IconChevron className={`h-4 w-4 transition-transform ${open ? "rotate-90" : ""}`} />
      </button>
      {open && <div className="pb-5 text-sm leading-relaxed text-navy-600">{children}</div>}
    </div>
  );
}
