import { Suspense } from "react";
import type { Metadata } from "next";
import { ShopBrowser } from "@/components/shop/ShopBrowser";

export const metadata: Metadata = {
  title: "Shop everything",
  description:
    "Browse clothing, bags, shoes, lingerie, beauty, homeware and accessories. Filter by size, colour and price in your own currency.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="section py-24 text-center font-display text-navy-400">Loading the shop…</div>}>
      <ShopBrowser />
    </Suspense>
  );
}
