import type { Metadata } from "next";
import { Checkout } from "@/components/checkout/Checkout";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Secure checkout with local delivery across Egypt, Saudi Arabia, Iraq and Türkiye.",
};

export default function CheckoutPage() {
  return <Checkout />;
}
