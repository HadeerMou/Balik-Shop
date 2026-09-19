import Link from "next/link";
import { Fish } from "../Fish";
import { ProductArt } from "../ProductArt";
import { IconArrow, IconSparkle, IconStar } from "../Icons";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b-[3px] border-navy-700 bg-butter-100 paper">
      {/* background blobs */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-sky-200 blur-2xl opacity-70" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-coral-300 blur-3xl opacity-50" />

      <div className="section relative grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_1fr] lg:py-20">
        <div className="animate-fade-up">
          <span className="chip bg-white shadow-pop-sm">
            <IconSparkle className="h-3.5 w-3.5 text-sky-500" />
            New season is live
          </span>

          <h1 className="mt-5 font-display text-[2.7rem] font-bold leading-[1.04] tracking-tight text-navy-700 sm:text-6xl lg:text-[4.2rem]">
            Everything you
            <br />
            keep adding to
            <br />
            <span className="relative inline-block">
              <span className="relative z-10">your cart</span>
              <span className="absolute inset-x-0 bottom-1.5 z-0 h-4 -rotate-1 rounded-full bg-sky-300 sm:h-5" />
            </span>
            <span className="text-sky-500">.</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-navy-600">
            Clothes, bags, shoes, lingerie, beauty and the little things that make a room feel like
            yours. Packed in Istanbul, delivered to your door across four countries.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/shop" className="btn-primary text-lg">
              Shop new in
              <IconArrow className="h-5 w-5" />
            </Link>
            <Link href="/shop?sort=sale" className="btn-butter text-lg">
              Sale up to 40% off
            </Link>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
            <div className="flex items-center gap-2">
              <span className="flex text-butter-500">
                {[1, 2, 3, 4, 5].map((i) => (
                  <IconStar key={i} className="h-4 w-4" />
                ))}
              </span>
              <span className="font-display text-sm font-semibold text-navy-600">
                4.8 from 3,400+ orders
              </span>
            </div>
            <span className="flex items-center gap-2 font-display text-sm font-semibold text-navy-600">
              <span className="text-base">🇪🇬 🇸🇦 🇮🇶 🇹🇷</span>
              Four countries, one bag
            </span>
          </div>
        </div>

        {/* illustrated collage */}
        <div className="relative mx-auto w-full max-w-[520px]">
          <div className="absolute inset-0 -rotate-6 rounded-[3rem] border-[3px] border-navy-700 bg-sky-300" />
          <div className="relative grid grid-cols-2 gap-3 rounded-[3rem] border-[3px] border-navy-700 bg-cream p-4 shadow-float">
            <HeroTile kind="dress" palette={["#4FB6F0", "#AFE2F9", "#0F3557"]} label="Clothing" className="row-span-2 aspect-[3/5]" />
            <HeroTile kind="bag" palette={["#FBEB9C", "#F7DE6B", "#0F3557"]} label="Bags" className="aspect-square" />
            <HeroTile kind="lipstick" palette={["#FF6F59", "#FFB0A2", "#0F3557"]} label="Beauty" className="aspect-square" />
          </div>

          {/* floating badges */}
          <div className="absolute left-1 top-6 rotate-[-8deg] rounded-2xl border-[2.5px] border-navy-700 bg-white px-3 py-2 shadow-pop animate-bob sm:-left-4">
            <p className="font-display text-xs font-bold uppercase tracking-wider text-navy-700">
              Free shipping
            </p>
            <p className="text-[0.7rem] text-navy-400">over your local threshold</p>
          </div>

          <div className="absolute -bottom-5 right-2 rotate-[6deg] rounded-full border-[2.5px] border-navy-700 bg-butter-300 px-4 py-2 shadow-pop">
            <p className="font-display text-sm font-bold text-navy-700">Cash on delivery ✓</p>
          </div>

          <Fish className="absolute -right-1 top-1/3 w-16 animate-swim drop-shadow sm:-right-6 sm:w-20" />
        </div>
      </div>
    </section>
  );
}

function HeroTile({
  kind,
  palette,
  label,
  className = "",
}: {
  kind: Parameters<typeof ProductArt>[0]["kind"];
  palette: [string, string, string];
  label: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-[1.75rem] border-[2.5px] border-navy-700 bg-white ${className}`}>
      <ProductArt kind={kind} palette={palette} className="h-full w-full" />
      <span className="absolute bottom-2 left-2 rounded-full border-2 border-navy-700 bg-white px-2.5 py-1 font-display text-[0.65rem] font-bold uppercase tracking-wider text-navy-700">
        {label}
      </span>
    </div>
  );
}
