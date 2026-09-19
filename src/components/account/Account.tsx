"use client";

import Link from "next/link";
import { useStore, money } from "@/context/StoreProvider";
import { RegionPicker } from "@/components/RegionPicker";
import { Fish } from "@/components/Fish";
import { IconArrow, IconBag, IconReturn, IconShield, IconTruck, IconUser } from "@/components/Icons";

export function Account() {
  const { region, items, count, subtotal, ready } = useStore();

  return (
    <div className="section py-10">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold text-navy-700 sm:text-5xl">Your account</h1>
        <p className="mt-2 text-navy-500">
          Everything Balık remembers about you on this device.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* sign-in — intentionally not wired up, there is no auth backend yet */}
        <section className="rounded-[2.5rem] border-[3px] border-navy-700 bg-white p-7 shadow-pop-lg">
          <span className="chip bg-butter-200">
            <IconUser className="h-3.5 w-3.5" /> Coming soon
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold text-navy-700 sm:text-3xl">
            Accounts are still swimming over
          </h2>
          <p className="mt-2 max-w-md text-navy-500">
            Saved addresses, order history and a wishlist that follows you between devices are on
            the way. Until then your bag and delivery region are kept safely in this browser — no
            sign-in needed.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Perk icon={<IconTruck className="h-5 w-5 text-sky-500" />} label="Track every order" />
            <Perk icon={<IconReturn className="h-5 w-5 text-coral-500" />} label="One-tap returns" />
            <Perk icon={<IconShield className="h-5 w-5 text-mint-500" />} label="Saved addresses" />
          </div>

          <div className="mt-7 rounded-3xl border-2 border-navy-100 bg-butter-50 p-5">
            <p className="font-display font-semibold text-navy-700">
              Need help with an order right now?
            </p>
            <p className="mt-1 text-sm text-navy-500">
              Our team answers in {region.flag} {region.country} within a few hours.
            </p>
            <Link href="/shop" className="btn-ghost btn-sm mt-3">
              Contact us <IconArrow className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <div className="space-y-6">
          {/* delivery region — a real, persisted preference */}
          <section className="rounded-[2.5rem] border-[3px] border-navy-700 bg-white p-7 shadow-pop">
            <h2 className="font-display text-xl font-bold text-navy-700">Delivery region</h2>
            <p className="mt-1 text-sm text-navy-500">
              Sets your currency and shipping estimates across the shop.
            </p>
            <div className="mt-4">
              <RegionPicker />
            </div>
            <dl className="mt-5 space-y-2 border-t-2 border-navy-100 pt-4 text-sm">
              <Row label="Courier" value={region.shipping.courier} />
              <Row label="Delivery" value={region.shipping.days} />
              <Row
                label="Free shipping over"
                value={money(region.shipping.freeOver, region)}
              />
              <Row
                label="Cash on delivery"
                value={region.cod ? "Available" : "Not available"}
              />
            </dl>
          </section>

          {/* current bag */}
          <section className="rounded-[2.5rem] border-[3px] border-navy-700 bg-white p-7 shadow-pop">
            <h2 className="flex items-center gap-2 font-display text-xl font-bold text-navy-700">
              <IconBag className="h-5 w-5" /> Your bag
            </h2>
            {!ready ? (
              <p className="mt-3 text-sm text-navy-400">Checking your bag…</p>
            ) : count === 0 ? (
              <div className="mt-4 flex flex-col items-center py-4 text-center">
                <Fish className="w-20 animate-swim" />
                <p className="mt-3 text-sm text-navy-500">Nothing saved yet.</p>
                <Link href="/shop" className="btn-sky btn-sm mt-4">
                  Start shopping
                </Link>
              </div>
            ) : (
              <>
                <p className="mt-2 text-navy-500">
                  {count} {count === 1 ? "item" : "items"} waiting ·{" "}
                  <strong className="font-display text-navy-700">{money(subtotal, region)}</strong>
                </p>
                <ul className="mt-4 space-y-1.5 text-sm text-navy-600">
                  {items.slice(0, 4).map((line) => (
                    <li key={line.id} className="flex justify-between gap-3">
                      <span className="truncate">{line.product.name}</span>
                      <span className="shrink-0 text-navy-400">×{line.qty}</span>
                    </li>
                  ))}
                  {items.length > 4 && (
                    <li className="text-navy-400">+{items.length - 4} more</li>
                  )}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Link href="/cart" className="btn-ghost btn-sm">
                    View bag
                  </Link>
                  <Link href="/checkout" className="btn-primary btn-sm">
                    Checkout
                  </Link>
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

function Perk({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border-2 border-navy-100 bg-butter-50 px-3 py-2.5">
      {icon}
      <span className="font-display text-sm font-semibold text-navy-700">{label}</span>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-navy-500">{label}</dt>
      <dd className="font-display font-semibold text-navy-700">{value}</dd>
    </div>
  );
}