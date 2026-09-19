import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Your bag",
  description: "Review the pieces in your Balık Shop bag before checkout.",
};

export default function CartPage() {
  return <CartView />;
}
