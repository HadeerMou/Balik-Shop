"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CATEGORIES } from "@/lib/catalog";
import { useStore } from "@/context/StoreProvider";
import { Logo } from "./Logo";
import { Marquee } from "./Marquee";
import { RegionPicker } from "./RegionPicker";
import { IconBag, IconClose, IconHeart, IconMenu, IconSearch, IconUser } from "./Icons";

const ANNOUNCEMENTS = [
  "Free shipping over the local threshold",
  "Cash on delivery in EG · SA · IQ",
  "New drop every Thursday",
  "14-day easy returns",
  "Ships to Egypt · Saudi · Iraq · Türkiye",
];

export function Header() {
  const { count, openDrawer, region } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Note: this only fires on a pathname change. Tapping a category from the
  // drawer goes /shop?category=a -> /shop?category=b, same pathname, so each
  // drawer link closes the menu itself via onClick. Reading useSearchParams
  // here instead would push the whole header behind a Suspense boundary and
  // drop it out of the prerendered HTML.
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40">
      {/* announcement bar */}
      <div className="bg-navy-700 py-2 text-butter-200">
        <Marquee items={ANNOUNCEMENTS} />
      </div>

      <div
        className={`border-b-[2.5px] border-navy-700 bg-cream/95 backdrop-blur transition-shadow ${
          scrolled ? "shadow-[0_6px_0_-2px_rgba(15,53,87,0.18)]" : ""
        }`}
      >
        <div className="section flex h-[68px] items-center gap-3 sm:h-[76px] sm:gap-5">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-full border-2 border-navy-700 bg-white text-navy-700 lg:hidden"
            aria-label="Open menu"
          >
            <IconMenu className="h-5 w-5" />
          </button>

          <Logo />

          <nav className="ml-4 hidden flex-1 items-center gap-1 lg:flex">
            {CATEGORIES.slice(0, 6).map((c) => (
              <Link
                key={c.slug}
                href={`/shop?category=${c.slug}`}
                className="rounded-full px-3 py-2 font-display text-[0.95rem] font-semibold text-navy-600 transition hover:bg-butter-200 hover:text-navy-800"
              >
                {c.name}
              </Link>
            ))}
            <Link
              href="/shop?sort=sale"
              className="rounded-full bg-coral-500 px-3 py-2 font-display text-[0.95rem] font-semibold text-white transition hover:bg-coral-600"
            >
              Sale
            </Link>
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full border-2 border-navy-700 bg-white text-navy-700 transition hover:bg-butter-100"
              aria-label="Search"
              aria-expanded={searchOpen}
            >
              <IconSearch className="h-5 w-5" />
            </button>

            <div className="hidden sm:block">
              <RegionPicker />
            </div>

            <Link
              href="/shop"
              className="hidden h-10 w-10 place-items-center rounded-full border-2 border-navy-700 bg-white text-navy-700 transition hover:bg-butter-100 md:grid"
              aria-label="Wishlist"
            >
              <IconHeart className="h-5 w-5" />
            </Link>
            <Link
              href="/account"
              className="hidden h-10 w-10 place-items-center rounded-full border-2 border-navy-700 bg-white text-navy-700 transition hover:bg-butter-100 md:grid"
              aria-label="Account"
            >
              <IconUser className="h-5 w-5" />
            </Link>

            <button
              type="button"
              onClick={openDrawer}
              className="relative grid h-10 w-10 place-items-center rounded-full border-2 border-navy-700 bg-butter-300 text-navy-700 transition hover:bg-butter-400"
              aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
            >
              <IconBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-[20px] place-items-center rounded-full border-2 border-navy-700 bg-coral-500 px-1 font-display text-[0.65rem] font-bold text-white">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t-2 border-navy-100 bg-white/90 py-4">
            <div className="section">
              <form
                className="flex items-center gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  const value = new FormData(e.currentTarget).get("q");
                  window.location.href = `/shop?q=${encodeURIComponent(String(value ?? ""))}`;
                }}
              >
                <input
                  name="q"
                  autoFocus
                  placeholder="Search dresses, mugs, hoops…"
                  className="field"
                  aria-label="Search products"
                />
                <button type="submit" className="btn-primary btn-sm px-5">
                  Go
                </button>
              </form>
              <p className="mt-2 text-xs text-navy-400">
                Popular: cardigan · mini bag · sneakers · lip set · fish mug
              </p>
            </div>
          </div>
        )}
      </div>

      {/* mobile drawer menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            className="absolute inset-0 bg-navy-900/45"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 flex h-full w-[86%] max-w-sm flex-col border-r-[3px] border-navy-700 bg-cream">
            <div className="flex items-center justify-between border-b-[2.5px] border-navy-700 px-5 py-4">
              <Logo compact />
              <button
                onClick={() => setMenuOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full border-2 border-navy-700 bg-white"
                aria-label="Close menu"
              >
                <IconClose className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-5 py-6">
              <Link
                href="/shop"
                onClick={() => setMenuOpen(false)}
                className="mb-2 block rounded-2xl bg-navy-700 px-4 py-3 font-display text-lg font-semibold text-butter-200"
              >
                Shop everything
              </Link>
              {CATEGORIES.map((c) => (
                <Link
                  key={c.slug}
                  href={`/shop?category=${c.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between border-b-2 border-navy-100 px-1 py-3 font-display text-lg font-semibold text-navy-700"
                >
                  {c.name}
                  <span className="text-xs font-normal text-navy-400">{c.tagline}</span>
                </Link>
              ))}
            </nav>
            <div className="border-t-[2.5px] border-navy-700 bg-butter-100 px-5 py-4">
              <p className="mb-2 font-display text-xs font-semibold uppercase tracking-widest text-navy-500">
                Shipping to
              </p>
              <RegionPicker compact />
              <p className="mt-2 text-xs text-navy-500">
                {region.shipping.courier} · {region.shipping.days}
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
