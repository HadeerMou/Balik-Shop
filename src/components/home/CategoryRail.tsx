import Link from "next/link";
import { CATEGORIES } from "@/lib/catalog";
import { ProductArt } from "../ProductArt";
import { IconArrow } from "../Icons";

const PALETTES: Record<string, [string, string, string]> = {
  clothing: ["#4FB6F0", "#AFE2F9", "#0F3557"],
  bags: ["#FBEB9C", "#F7DE6B", "#0F3557"],
  shoes: ["#FF6F59", "#FFB0A2", "#0F3557"],
  lingerie: ["#6FDCBC", "#A9EDD8", "#0F3557"],
  beauty: ["#E58AA0", "#F5C3CE", "#0F3557"],
  home: ["#4FB6F0", "#FBEB9C", "#0F3557"],
  accessories: ["#8E5BA6", "#C39BD6", "#0F3557"],
};

export function CategoryRail() {
  return (
    <section className="section py-14 sm:py-18">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-3xl font-bold text-navy-700 sm:text-4xl">
            Pick your pond
          </h2>
          <p className="mt-1.5 text-navy-500">Seven aisles, no wrong turns.</p>
        </div>
        <Link href="/shop" className="btn-ghost btn-sm">
          All products
          <IconArrow className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {CATEGORIES.map((c, i) => (
          <Link
            key={c.slug}
            href={`/shop?category=${c.slug}`}
            className={`group relative overflow-hidden rounded-4xl border-[2.5px] border-navy-700 ${c.tint} p-4 shadow-pop transition-transform duration-200 hover:-translate-y-1 ${
              i === 0 ? "sm:col-span-1 lg:col-span-2 lg:flex lg:items-center lg:gap-4" : ""
            }`}
          >
            <div className={`mx-auto ${i === 0 ? "lg:mx-0 lg:w-40" : ""} w-28 sm:w-32`}>
              <ProductArt
                kind={c.art}
                palette={PALETTES[c.slug]}
                seed={i + 2}
                className="w-full transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
              />
            </div>
            <div className={i === 0 ? "lg:flex-1" : ""}>
              <p className="mt-2 font-display text-lg font-bold leading-tight text-navy-800 sm:text-xl">
                {c.name}
              </p>
              <p className="mt-0.5 text-xs leading-snug text-navy-700/70 sm:text-sm">{c.tagline}</p>
              <span className="mt-2 inline-flex items-center gap-1 font-display text-xs font-semibold uppercase tracking-wider text-navy-800 opacity-0 transition group-hover:opacity-100">
                Shop <IconArrow className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        ))}

        <Link
          href="/shop?sort=sale"
          className="group relative flex flex-col items-center justify-center overflow-hidden rounded-4xl border-[2.5px] border-navy-700 bg-navy-700 p-5 text-center shadow-pop transition-transform hover:-translate-y-1"
        >
          <p className="font-display text-4xl font-bold leading-none text-butter-300">40%</p>
          <p className="mt-1 font-display text-lg font-bold text-white">off the sale rail</p>
          <p className="mt-1 text-xs text-sky-200">While sizes last</p>
          <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-butter-300 px-3 py-1.5 font-display text-xs font-bold uppercase tracking-wider text-navy-800">
            Shop sale <IconArrow className="h-3.5 w-3.5" />
          </span>
        </Link>
      </div>
    </section>
  );
}
