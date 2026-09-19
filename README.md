# Balık Shop — storefront (front-end)

A modern, playful e-commerce front end for **Balık Shop**, built from the shop's own logo:
navy lettering, the sky-blue fish, and the butter-yellow circle.

Front end only — no backend, no database, no payment provider. Every product, price and
order is mock data, wired so a real API can drop in later without redesigning anything.

---

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build && npm start    # production build
```

Node 18.17+ required.

---

## What's in the box

| Page | Route | What it does |
|---|---|---|
| Home | `/` | Hero, category tiles, new-in grid, editorial edits, shipping band, bestsellers, reviews |
| Shop | `/shop` | Full catalogue with live filters (category, size, colour, price, sale) + sort + search |
| Product | `/product/[slug]` | Gallery with detail crops, colour + size pickers, quantity, accordions, related products |
| Bag | `/cart` | Line items, quantity stepper, free-shipping progress, promo code, order summary |
| Checkout | `/checkout` | Three steps (contact → delivery → payment), local address fields, order confirmation |
| 404 | any | Branded not-found page |

Plus a slide-in cart drawer, a mobile nav drawer, and a mobile filter sheet.

### Four countries, four currencies

The header country picker switches between **🇪🇬 Egypt, 🇸🇦 Saudi Arabia, 🇮🇶 Iraq and 🇹🇷 Türkiye**.
Switching it updates, everywhere on the site:

- currency and every displayed price (prices are stored once in USD and converted)
- delivery estimate and courier name
- the free-shipping threshold and flat shipping fee
- whether cash on delivery is offered
- checkout address fields (governorate / region / province) and phone prefix

All of that lives in one file: **`src/lib/regions.ts`**. Change a rate or a courier there and
the whole site follows.

### Promo code

`BALIK10` is accepted in the bag as a demo.

---

## Design system

Everything is driven by `tailwind.config.ts`, so a rebrand is a few hex values.

| Token | Value | From |
|---|---|---|
| `navy-700` | `#0F3557` | the logo lettering |
| `sky-400` | `#4FB6F0` | the fish |
| `butter-300` | `#FBEB9C` | the logo circle |
| `coral-500` | `#FF6F59` | sale / accent |
| `mint-400` | `#6FDCBC` | success / secondary |

- **Type:** Fredoka (display, matches the logo's rounded lettering) + Plus Jakarta Sans (body).
  Both are self-hosted via `@fontsource-variable/*` — no Google Fonts request, which keeps the
  site fast on slower connections in the region.
- **Look:** thick navy outlines, hard offset shadows (`shadow-pop`), fully rounded corners,
  wavy underlines, a swimming fish, and a scrolling announcement marquee.
- **Motion:** subtle and respectful — everything is disabled under `prefers-reduced-motion`.

### Reusable classes

`.btn-primary` `.btn-butter` `.btn-sky` `.btn-ghost` `.card-pop` `.chip` `.field` `.section`
`.ink` `.underline-wave` — defined in `src/app/globals.css`.

---

## Structure

```
src/
  app/
    layout.tsx            header + footer + cart drawer shell
    page.tsx              home
    shop/page.tsx         listing
    product/[slug]/       product detail (pre-rendered for all 29 products)
    cart/  checkout/      bag and checkout
    icon.svg              favicon (the fish badge)
  components/
    Header  Footer  CartDrawer  RegionPicker  ProductCard  ProductGrid
    ProductArt.tsx        26 hand-drawn SVG product illustrations
    Fish.tsx  Logo.tsx    the brand mark, rebuilt as vector
    home/ shop/ product/ cart/ checkout/
  context/
    StoreProvider.tsx     cart + region state, persisted to localStorage
  lib/
    catalog.ts            29 products, 7 categories
    regions.ts            the four markets
```

### About the product images

There's no photography yet, so every product has a **custom vector illustration** drawn in the
brand style — a dress, a sneaker, a mug, a lipstick, a hair claw, and so on. They're in
`src/components/ProductArt.tsx`.

When real photos are shot, replace `<ProductArt … />` with `<Image … />` in three places:
`ProductCard.tsx`, `ProductDetail.tsx` and `CartDrawer.tsx`. Nothing else changes.

---

## Wiring up a backend later

The front end deliberately keeps every data touchpoint in one place:

1. **Products** — `src/lib/catalog.ts` exports `PRODUCTS`. Swap it for a fetch from Shopify,
   Medusa, Strapi or your own API. The `Product` type is the contract.
2. **Cart** — `src/context/StoreProvider.tsx` holds cart state in `localStorage`. Replace
   `add` / `setQty` / `remove` with API calls; the components don't change.
3. **Checkout** — `src/components/checkout/Checkout.tsx` submits to local state. Point the
   final `onSubmit` at your order endpoint / payment provider.
4. **Pricing** — `src/lib/regions.ts` uses static FX rates. Replace `rate` with live rates,
   or return prices already localised from the API.

## Not built yet

Accounts and order history, wishlist persistence, size-guide and policy pages, real search
indexing, Arabic/Turkish localisation with RTL, and a CMS for the editorial blocks. All of
these fit the existing layout — say the word and they can be added.
