import Link from "next/link";
import { ProductArt } from "../ProductArt";
import { IconArrow } from "../Icons";

const EDITS = [
  {
    title: "The linen days edit",
    copy: "Breathable shirts, wide trousers and slides for the part of the year that doesn't forgive polyester.",
    href: "/shop?category=clothing",
    tint: "bg-butter-200",
    kind: "top" as const,
    palette: ["#FFFBF0", "#F6EEDC", "#0F3557"] as [string, string, string],
  },
  {
    title: "Small bag, big night",
    copy: "Minis, clutches and a beaded strap you can unclip when the dancing starts.",
    href: "/shop?category=bags",
    tint: "bg-sky-200",
    kind: "bag" as const,
    palette: ["#4FB6F0", "#AFE2F9", "#0F3557"] as [string, string, string],
  },
  {
    title: "Soft everything",
    copy: "Wire-free sets, cotton basics and a silk slip that survives the washing machine.",
    href: "/shop?category=lingerie",
    tint: "bg-mint-300",
    kind: "lingerie" as const,
    palette: ["#6FDCBC", "#A9EDD8", "#0F3557"] as [string, string, string],
  },
];

export function Editorial() {
  return (
    <section className="section py-14 sm:py-18">
      <div className="mb-7">
        <h2 className="font-display text-3xl font-bold text-navy-700 sm:text-4xl">Shop the edits</h2>
        <p className="mt-1.5 text-navy-500">Three little collections we put together so you don&apos;t have to.</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {EDITS.map((e, i) => (
          <Link
            key={e.title}
            href={e.href}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border-[2.5px] border-navy-700 ${e.tint} p-6 shadow-pop transition-transform duration-200 hover:-translate-y-1`}
          >
            <div className="relative z-10 max-w-[70%]">
              <h3 className="font-display text-2xl font-bold leading-tight text-navy-800">{e.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-700/80">{e.copy}</p>
            </div>
            <span className="relative z-10 mt-8 inline-flex w-fit items-center gap-2 rounded-full border-2 border-navy-700 bg-white px-4 py-2 font-display text-sm font-semibold text-navy-700 transition group-hover:bg-navy-700 group-hover:text-butter-200">
              Explore <IconArrow className="h-4 w-4" />
            </span>
            <ProductArt
              kind={e.kind}
              palette={e.palette}
              seed={i + 7}
              className="pointer-events-none absolute -bottom-6 -right-6 w-44 opacity-90 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
