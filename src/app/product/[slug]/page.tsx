import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BY_SLUG, PRODUCTS, relatedTo } from "@/lib/catalog";
import { ProductDetail } from "@/components/product/ProductDetail";
import { ProductGrid } from "@/components/ProductGrid";
import { IconArrow } from "@/components/Icons";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = BY_SLUG[slug];
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.blurb,
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = BY_SLUG[slug];
  if (!product) notFound();

  const related = relatedTo(product, 4);

  return (
    <>
      <ProductDetail product={product} />

      <section className="section pb-6">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-2xl font-bold text-navy-700 sm:text-3xl">
            Swims well with
          </h2>
          <Link href="/shop" className="btn-ghost btn-sm">
            Shop all <IconArrow className="h-4 w-4" />
          </Link>
        </div>
        <ProductGrid products={related} offset={5} />
      </section>
    </>
  );
}
