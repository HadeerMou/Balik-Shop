"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { CATEGORIES, PRODUCTS, SIZE_ORDER, type CategorySlug } from "@/lib/catalog";
import { useStore } from "@/context/StoreProvider";
import { ProductGrid } from "@/components/ProductGrid";
import { IconClose, IconSearch, IconSparkle } from "@/components/Icons";
import { Fish } from "@/components/Fish";

type Sort = "featured" | "new" | "price-asc" | "price-desc" | "rating" | "sale";

const SORTS: { value: Sort; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "new", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
  { value: "sale", label: "On sale" },
];

const COLOR_FAMILIES = [
  { name: "Blue", hex: "#4FB6F0", match: ["ocean", "sky", "blue", "navy", "midnight", "sea"] },
  { name: "Yellow", hex: "#FBEB9C", match: ["butter", "straw", "gold"] },
  { name: "Red", hex: "#FF6F59", match: ["coral", "sunset", "rose", "shell", "blush", "pink"] },
  { name: "Green", hex: "#6FDCBC", match: ["sea glass", "olive", "mint"] },
  { name: "Neutral", hex: "#F6EEDC", match: ["cream", "off white", "all white", "stone", "bone", "sand", "pearl", "ivory", "neutral", "clear", "silver"] },
  { name: "Black / Brown", hex: "#3A2A1E", match: ["black", "chestnut", "tortoise"] },
  { name: "Purple", hex: "#8E5BA6", match: ["plum"] },
];

export function ShopBrowser() {
  const router = useRouter();
  const params = useSearchParams();
  const { region, price } = useStore();

  const urlCategory = params.get("category") as CategorySlug | null;
  const urlSort = (params.get("sort") as Sort) ?? "featured";
  const urlQuery = params.get("q") ?? "";

  const [categories, setCategories] = useState<CategorySlug[]>(urlCategory ? [urlCategory] : []);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [saleOnly, setSaleOnly] = useState(urlSort === "sale");
  const [sort, setSort] = useState<Sort>(urlSort);
  const [query, setQuery] = useState(urlQuery);
  const [maxPrice, setMaxPrice] = useState(60); // USD base
  const [sheetOpen, setSheetOpen] = useState(false);

  // Going from /shop?category=bags to /shop?category=shoes keeps this component
  // mounted, so the state above (seeded once on mount) would stay on the old
  // category while the URL changed underneath it. Re-read the params whenever
  // they change so every category link works, not just the first one.
  useEffect(() => {
    setCategories(urlCategory ? [urlCategory] : []);
    setSort(urlSort);
    setSaleOnly(urlSort === "sale");
    setQuery(urlQuery);
    setSheetOpen(false);
  }, [urlCategory, urlSort, urlQuery]);

  const availableSizes = useMemo(() => {
    const set = new Set<string>();
    PRODUCTS.forEach((p) => p.sizes?.forEach((s) => set.add(s)));
    return SIZE_ORDER.filter((s) => set.has(s));
  }, []);

  const results = useMemo(() => {
    let list = PRODUCTS.slice();

    if (categories.length) list = list.filter((p) => categories.includes(p.category));
    if (sizes.length) list = list.filter((p) => p.sizes?.some((s) => sizes.includes(s)));
    if (colors.length) {
      list = list.filter((p) =>
        p.colors.some((c) => {
          const name = c.name.toLowerCase();
          return colors.some((familyName) => {
            const family = COLOR_FAMILIES.find((f) => f.name === familyName);
            return family?.match.some((m) => name.includes(m));
          });
        }),
      );
    }
    if (saleOnly) list = list.filter((p) => Boolean(p.compareUsd));
    if (maxPrice < 60) list = list.filter((p) => p.usd <= maxPrice);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q)) ||
          p.category.includes(q) ||
          p.blurb.toLowerCase().includes(q),
      );
    }

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.usd - b.usd);
        break;
      case "price-desc":
        list.sort((a, b) => b.usd - a.usd);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "new":
        list.sort((a, b) => Number(b.badge === "New") - Number(a.badge === "New"));
        break;
      case "sale":
        list.sort((a, b) => Number(Boolean(b.compareUsd)) - Number(Boolean(a.compareUsd)));
        break;
      default:
        list.sort((a, b) => b.reviews - a.reviews);
    }
    return list;
  }, [categories, sizes, colors, saleOnly, maxPrice, query, sort]);

  const activeCount =
    categories.length + sizes.length + colors.length + (saleOnly ? 1 : 0) + (maxPrice < 60 ? 1 : 0);

  function toggle<T>(list: T[], value: T, set: (next: T[]) => void) {
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  function clearAll() {
    setCategories([]);
    setSizes([]);
    setColors([]);
    setSaleOnly(false);
    setMaxPrice(60);
    setQuery("");
    router.replace("/shop");
  }

  const heading = categories.length === 1 ? CATEGORIES.find((c) => c.slug === categories[0])?.name : "All products";

  const filterPanel = (
    <div className="space-y-7">
      <FilterGroup title="Category">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <Toggle
              key={c.slug}
              active={categories.includes(c.slug)}
              onClick={() => toggle(categories, c.slug, setCategories)}
            >
              {c.name}
            </Toggle>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Size">
        <div className="flex flex-wrap gap-2">
          {availableSizes.map((s) => (
            <Toggle key={s} active={sizes.includes(s)} onClick={() => toggle(sizes, s, setSizes)} square>
              {s}
            </Toggle>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Colour">
        <div className="flex flex-wrap gap-2">
          {COLOR_FAMILIES.map((c) => {
            const active = colors.includes(c.name);
            return (
              <button
                key={c.name}
                onClick={() => toggle(colors, c.name, setColors)}
                aria-pressed={active}
                className={`inline-flex items-center gap-2 rounded-full border-2 border-navy-700 px-3 py-1.5 font-display text-xs font-semibold transition ${
                  active ? "bg-navy-700 text-butter-200" : "bg-white text-navy-700 hover:bg-butter-100"
                }`}
              >
                <span
                  className="h-3.5 w-3.5 rounded-full border-2 border-navy-700"
                  style={{ backgroundColor: c.hex }}
                />
                {c.name}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup title={`Max price — ${price(maxPrice)}`}>
        <input
          type="range"
          min={12}
          max={60}
          step={2}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-sky-500"
          aria-label="Maximum price"
        />
        <div className="mt-1 flex justify-between text-xs text-navy-400">
          <span>{price(12)}</span>
          <span>{maxPrice >= 60 ? "Any" : price(maxPrice)}</span>
        </div>
      </FilterGroup>

      <FilterGroup title="Offers">
        <Toggle active={saleOnly} onClick={() => setSaleOnly((v) => !v)}>
          <IconSparkle className="h-3.5 w-3.5" />
          On sale only
        </Toggle>
      </FilterGroup>

      <div className="rounded-3xl border-2 border-navy-700 bg-sky-100 p-4">
        <p className="font-display text-sm font-semibold text-navy-700">
          {region.flag} Shipping to {region.country}
        </p>
        <p className="mt-1 text-xs text-navy-500">
          {region.shipping.days} with {region.shipping.courier}. Free over{" "}
          {new Intl.NumberFormat("en-US").format(region.shipping.freeOver)} {region.currency}.
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* page head */}
      <div className="border-b-[3px] border-navy-700 bg-butter-100 paper">
        <div className="section py-9">
          <nav className="mb-3 flex items-center gap-2 text-xs text-navy-400">
            <Link href="/" className="hover:text-navy-700">Home</Link>
            <span>/</span>
            <span className="text-navy-700">{heading}</span>
          </nav>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-4xl font-bold text-navy-700 sm:text-5xl">{heading}</h1>
              <p className="mt-2 text-navy-500">
                {results.length} {results.length === 1 ? "piece" : "pieces"} · prices shown in{" "}
                {region.currency}
              </p>
            </div>
            <div className="relative w-full max-w-sm">
              <IconSearch className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-navy-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the shop…"
                aria-label="Search products"
                className="field pl-11"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="section grid gap-8 py-10 lg:grid-cols-[250px_1fr]">
        {/* desktop filters */}
        <aside className="hidden lg:block">
          <div className="sticky top-32">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-navy-700">Filters</h2>
              {activeCount > 0 && (
                <button onClick={clearAll} className="text-xs font-semibold text-coral-600 underline">
                  Clear all
                </button>
              )}
            </div>
            {filterPanel}
          </div>
        </aside>

        <div>
          {/* toolbar */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => setSheetOpen(true)}
              className="btn-ghost btn-sm lg:hidden"
              aria-label="Open filters"
            >
              Filters {activeCount > 0 && <span className="rounded-full bg-coral-500 px-1.5 text-white">{activeCount}</span>}
            </button>

            <div className="flex flex-wrap items-center gap-2">
              {categories.map((c) => (
                <Pill key={c} onRemove={() => toggle(categories, c, setCategories)}>
                  {CATEGORIES.find((x) => x.slug === c)?.name}
                </Pill>
              ))}
              {sizes.map((s) => (
                <Pill key={s} onRemove={() => toggle(sizes, s, setSizes)}>Size {s}</Pill>
              ))}
              {colors.map((c) => (
                <Pill key={c} onRemove={() => toggle(colors, c, setColors)}>{c}</Pill>
              ))}
              {saleOnly && <Pill onRemove={() => setSaleOnly(false)}>On sale</Pill>}
              {maxPrice < 60 && <Pill onRemove={() => setMaxPrice(60)}>Under {price(maxPrice)}</Pill>}
            </div>

            <label className="ml-auto flex items-center gap-2 text-sm text-navy-500">
              Sort
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="rounded-full border-2 border-navy-700 bg-white px-3 py-1.5 font-display text-sm font-semibold text-navy-700 focus:outline-none focus:ring-4 focus:ring-sky-200"
              >
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </label>
          </div>

          {results.length > 0 ? (
            <ProductGrid products={results} />
          ) : (
            <div className="flex flex-col items-center rounded-4xl border-[2.5px] border-dashed border-navy-300 bg-white/60 py-20 text-center">
              <Fish className="w-24 animate-swim" />
              <p className="mt-4 font-display text-xl font-bold text-navy-700">Nothing in this net</p>
              <p className="mt-1 max-w-sm text-sm text-navy-500">
                Try loosening a filter or two — or let us show you everything.
              </p>
              <button onClick={clearAll} className="btn-sky mt-5">Reset filters</button>
            </div>
          )}
        </div>
      </div>

      {/* mobile filter sheet */}
      {sheetOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button className="absolute inset-0 bg-navy-900/45" onClick={() => setSheetOpen(false)} aria-label="Close filters" />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-[2rem] border-t-[3px] border-navy-700 bg-cream p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-navy-700">Filters</h2>
              <button
                onClick={() => setSheetOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full border-2 border-navy-700 bg-white"
                aria-label="Close filters"
              >
                <IconClose className="h-5 w-5" />
              </button>
            </div>
            {filterPanel}
            <div className="sticky bottom-0 mt-6 flex gap-2 bg-cream pt-3">
              <button onClick={clearAll} className="btn-ghost flex-1">Clear</button>
              <button onClick={() => setSheetOpen(false)} className="btn-primary flex-1">
                Show {results.length}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-[0.14em] text-navy-600">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Toggle({
  active,
  onClick,
  children,
  square = false,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  square?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-1.5 border-2 border-navy-700 font-display text-xs font-semibold transition ${
        square ? "h-9 min-w-[2.25rem] justify-center rounded-xl px-2" : "rounded-full px-3 py-1.5"
      } ${active ? "bg-navy-700 text-butter-200" : "bg-white text-navy-700 hover:bg-butter-100"}`}
    >
      {children}
    </button>
  );
}

function Pill({ children, onRemove }: { children: React.ReactNode; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-navy-700 bg-butter-200 px-3 py-1 font-display text-xs font-semibold text-navy-700">
      {children}
      <button onClick={onRemove} aria-label="Remove filter" className="grid h-4 w-4 place-items-center rounded-full bg-navy-700 text-butter-200">
        <IconClose className="h-2.5 w-2.5" />
      </button>
    </span>
  );
}
