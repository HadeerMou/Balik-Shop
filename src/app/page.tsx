import Link from "next/link";
import { PRODUCTS } from "@/lib/catalog";
import { Hero } from "@/components/home/Hero";
import { CategoryRail } from "@/components/home/CategoryRail";
import { ShippingBand } from "@/components/home/ShippingBand";
import { Editorial } from "@/components/home/Editorial";
import { Testimonials } from "@/components/home/Testimonials";
import { ProductGrid } from "@/components/ProductGrid";
import { Marquee } from "@/components/Marquee";
import { IconArrow } from "@/components/Icons";

export default function HomePage() {
  const newIn = PRODUCTS.filter((p) => p.badge === "New")
    .concat(PRODUCTS.filter((p) => p.badge !== "New"))
    .slice(0, 8);
  const bestsellers = PRODUCTS.filter((p) => p.rating >= 4.7).slice(0, 4);

  return (
    <>
      <Hero />

      <div className="border-b-[3px] border-navy-700 bg-sky-400 py-2.5 text-navy-800">
        <Marquee
          speed="fast"
          items={[
            "New in every Thursday",
            "Free shipping thresholds per country",
            "Cash on delivery available",
            "14-day returns",
            "Balık Shop",
          ]}
        />
      </div>

      <CategoryRail />

      {/* New in */}
      <section className="section pb-4">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-3xl font-bold text-navy-700 sm:text-4xl">Fresh catch</h2>
            <p className="mt-1.5 text-navy-500">This week&apos;s arrivals, before they swim off.</p>
          </div>
          <Link href="/shop" className="btn-ghost btn-sm">
            See all
            <IconArrow className="h-4 w-4" />
          </Link>
        </div>
        <ProductGrid products={newIn} />
      </section>

      <Editorial />

      <ShippingBand />

      {/* Bestsellers */}
      <section className="section py-14 sm:py-18">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-3xl font-bold text-navy-700 sm:text-4xl">
              Everyone&apos;s buying
            </h2>
            <p className="mt-1.5 text-navy-500">The ones we restock the most.</p>
          </div>
          <Link href="/shop?sort=rating" className="btn-ghost btn-sm">
            Top rated
            <IconArrow className="h-4 w-4" />
          </Link>
        </div>
        <ProductGrid products={bestsellers} offset={12} />
      </section>

      <Testimonials />
    </>
  );
}
