"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { BY_SLUG, type Product } from "@/lib/catalog";
import { DEFAULT_REGION, REGIONS, convert, type Region, type RegionCode } from "@/lib/regions";

export type CartLine = {
  id: string; // slug|size|color
  slug: string;
  size?: string;
  color?: string;
  qty: number;
};

type StoreValue = {
  // region
  region: Region;
  regionCode: RegionCode;
  setRegion: (code: RegionCode) => void;
  price: (usd: number) => string;
  raw: (usd: number) => number;

  // cart
  lines: CartLine[];
  items: (CartLine & { product: Product })[];
  count: number;
  subtotal: number;
  shippingFee: number;
  total: number;
  add: (slug: string, opts?: { size?: string; color?: string; qty?: number }) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;

  // cart drawer
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;

  ready: boolean;
};

const StoreContext = createContext<StoreValue | null>(null);
const CART_KEY = "balik.cart.v1";
const REGION_KEY = "balik.region.v1";

function safeGet(key: string) {
  try {
    return typeof window === "undefined" ? null : window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* private mode — cart simply won't persist */
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [regionCode, setRegionCode] = useState<RegionCode>(DEFAULT_REGION);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [ready, setReady] = useState(false);

  // hydrate
  useEffect(() => {
    const storedCart = safeGet(CART_KEY);
    if (storedCart) {
      try {
        const parsed = JSON.parse(storedCart) as CartLine[];
        if (Array.isArray(parsed)) setLines(parsed.filter((l) => BY_SLUG[l.slug]));
      } catch {
        /* ignore malformed cart */
      }
    }
    const storedRegion = safeGet(REGION_KEY) as RegionCode | null;
    if (storedRegion && REGIONS[storedRegion]) setRegionCode(storedRegion);
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) safeSet(CART_KEY, JSON.stringify(lines));
  }, [lines, ready]);

  useEffect(() => {
    if (ready) safeSet(REGION_KEY, regionCode);
  }, [regionCode, ready]);

  // lock scroll while the drawer is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const region = REGIONS[regionCode];

  const add: StoreValue["add"] = useCallback((slug, opts = {}) => {
    const { size, color, qty = 1 } = opts;
    const id = [slug, size ?? "-", color ?? "-"].join("|");
    setLines((prev) => {
      const existing = prev.find((l) => l.id === id);
      if (existing) {
        return prev.map((l) => (l.id === id ? { ...l, qty: Math.min(99, l.qty + qty) } : l));
      }
      return [...prev, { id, slug, size, color, qty }];
    });
    setDrawerOpen(true);
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.id !== id)
        : prev.map((l) => (l.id === id ? { ...l, qty: Math.min(99, qty) } : l)),
    );
  }, []);

  const remove = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const items = useMemo(
    () =>
      lines
        .map((l) => ({ ...l, product: BY_SLUG[l.slug] }))
        .filter((l): l is CartLine & { product: Product } => Boolean(l.product)),
    [lines],
  );

  const subtotal = useMemo(
    () => items.reduce((sum, l) => sum + convert(l.product.usd, region) * l.qty, 0),
    [items, region],
  );

  const shippingFee = useMemo(() => {
    if (subtotal === 0) return 0;
    return subtotal >= region.shipping.freeOver ? 0 : region.shipping.fee;
  }, [subtotal, region]);

  const value: StoreValue = {
    region,
    regionCode,
    setRegion: setRegionCode,
    price: (usd) => {
      const amount = convert(usd, region);
      return `${region.symbol} ${new Intl.NumberFormat("en-US").format(amount)}`;
    },
    raw: (usd) => convert(usd, region),
    lines,
    items,
    count: items.reduce((n, l) => n + l.qty, 0),
    subtotal,
    shippingFee,
    total: subtotal + shippingFee,
    add,
    setQty,
    remove,
    clear,
    drawerOpen,
    openDrawer,
    closeDrawer,
    ready,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}

export function money(amount: number, region: Region) {
  return `${region.symbol} ${new Intl.NumberFormat("en-US").format(Math.round(amount))}`;
}
