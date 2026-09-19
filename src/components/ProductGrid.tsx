import type { Product } from "@/lib/catalog";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ products, offset = 0 }: { products: Product[]; offset?: number }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-5 lg:grid-cols-4">
      {products.map((p, i) => (
        <ProductCard key={p.slug} product={p} index={i + offset} />
      ))}
    </div>
  );
}
