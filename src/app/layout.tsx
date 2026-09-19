import type { Metadata, Viewport } from "next";
// Self-hosted brand fonts — no external request, works on slow connections
import "@fontsource-variable/fredoka";
import "@fontsource-variable/plus-jakarta-sans";
import "./globals.css";
import { StoreProvider } from "@/context/StoreProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: {
    default: "Balık Shop — clothes, bags, shoes, beauty & little joys",
    template: "%s · Balık Shop",
  },
  description:
    "Balık Shop is an online fashion store shipping to Egypt, Saudi Arabia, Iraq and Türkiye. Clothing, bags, shoes, lingerie, beauty, mugs and accessories.",
  keywords: ["Balık Shop", "online fashion", "Egypt", "Saudi Arabia", "Iraq", "Türkiye", "clothing", "bags", "beauty"],
  openGraph: {
    title: "Balık Shop",
    description: "Clothes, bags, shoes, lingerie, beauty and little joys. Shipping across EG, SA, IQ and TR.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0F3557",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <CartDrawer />
        </StoreProvider>
      </body>
    </html>
  );
}
