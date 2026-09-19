import { REGION_LIST } from "@/lib/regions";
import { FishOutline } from "../Fish";
import { IconTruck } from "../Icons";

export function ShippingBand() {
  return (
    <section className="relative overflow-hidden border-y-[3px] border-navy-700 bg-navy-700 py-14 text-butter-100">
      <FishOutline className="pointer-events-none absolute -left-10 top-6 w-56 text-sky-400/25" />
      <FishOutline className="pointer-events-none absolute -right-14 bottom-2 w-72 rotate-12 text-sky-400/20" />

      <div className="section relative">
        <div className="max-w-2xl">
          <span className="chip border-butter-200 bg-transparent text-butter-200">
            <IconTruck className="h-3.5 w-3.5" />
            Delivery
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            We ship to four countries — and price in all four currencies.
          </h2>
          <p className="mt-3 text-sky-100/80">
            Switch your country in the header and every price on the site updates. No surprise
            conversion at checkout.
          </p>
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {REGION_LIST.map((r) => (
            <div
              key={r.code}
              className="rounded-4xl border-[2.5px] border-butter-200/40 bg-navy-800/60 p-5 backdrop-blur transition hover:border-butter-200"
            >
              <p className="text-3xl leading-none">{r.flag}</p>
              <p className="mt-3 font-display text-xl font-bold text-white">{r.country}</p>
              <dl className="mt-3 space-y-1.5 text-sm text-sky-100/80">
                <div className="flex justify-between gap-2">
                  <dt>Delivery</dt>
                  <dd className="font-display font-semibold text-butter-200">{r.shipping.days}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt>Courier</dt>
                  <dd>{r.shipping.courier}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt>Currency</dt>
                  <dd>{r.currency}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt>Cash on delivery</dt>
                  <dd className={r.cod ? "text-mint-300" : "text-coral-300"}>
                    {r.cod ? "Yes" : "Card only"}
                  </dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
