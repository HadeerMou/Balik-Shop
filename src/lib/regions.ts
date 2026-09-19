export type RegionCode = "EG" | "SA" | "IQ" | "TR";

export type Region = {
  code: RegionCode;
  country: string;
  flag: string;
  currency: string;
  symbol: string;
  /** Multiplier applied to the USD base price. Swap for live FX when the backend lands. */
  rate: number;
  /** Rounding step so prices land on tidy numbers in local currency. */
  step: number;
  shipping: {
    days: string;
    fee: number; // in local currency, 0 = free
    freeOver: number; // local currency threshold
    courier: string;
  };
  cod: boolean;
};

export const REGIONS: Record<RegionCode, Region> = {
  EG: {
    code: "EG",
    country: "Egypt",
    flag: "🇪🇬",
    currency: "EGP",
    symbol: "E£",
    rate: 48,
    step: 5,
    shipping: { days: "2–4 days", fee: 75, freeOver: 2500, courier: "Bosta" },
    cod: true,
  },
  SA: {
    code: "SA",
    country: "Saudi Arabia",
    flag: "🇸🇦",
    currency: "SAR",
    symbol: "SR",
    rate: 3.75,
    step: 1,
    shipping: { days: "3–6 days", fee: 25, freeOver: 300, courier: "SMSA" },
    cod: true,
  },
  IQ: {
    code: "IQ",
    country: "Iraq",
    flag: "🇮🇶",
    currency: "IQD",
    symbol: "IQD",
    rate: 1310,
    step: 250,
    shipping: { days: "5–9 days", fee: 9000, freeOver: 120000, courier: "Aramex" },
    cod: true,
  },
  TR: {
    code: "TR",
    country: "Türkiye",
    flag: "🇹🇷",
    currency: "TRY",
    symbol: "₺",
    rate: 34,
    step: 5,
    shipping: { days: "1–3 days", fee: 60, freeOver: 1500, courier: "Yurtiçi Kargo" },
    cod: false,
  },
};

export const REGION_LIST = Object.values(REGIONS);
export const DEFAULT_REGION: RegionCode = "EG";

export function convert(usd: number, region: Region) {
  const raw = usd * region.rate;
  return Math.max(region.step, Math.round(raw / region.step) * region.step);
}

export function formatMoney(amountLocal: number, region: Region) {
  const formatted = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: region.currency === "IQD" ? 0 : region.step < 1 ? 2 : 0,
  }).format(amountLocal);
  return `${region.symbol} ${formatted}`;
}

export function priceIn(usd: number, region: Region) {
  return formatMoney(convert(usd, region), region);
}
