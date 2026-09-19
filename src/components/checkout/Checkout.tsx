"use client";

import Link from "next/link";
import { useState } from "react";
import { useStore, money } from "@/context/StoreProvider";
import { REGION_LIST } from "@/lib/regions";
import { ProductArt } from "@/components/ProductArt";
import { RegionPicker } from "@/components/RegionPicker";
import { Fish } from "@/components/Fish";
import { IconArrow, IconCheck, IconReturn, IconShield, IconTruck } from "@/components/Icons";

const STEPS = ["Contact", "Delivery", "Payment"] as const;

const PHONE_PREFIX: Record<string, string> = { EG: "+20", SA: "+966", IQ: "+964", TR: "+90" };
const AREA_LABEL: Record<string, string> = {
  EG: "Governorate",
  SA: "Region",
  IQ: "Governorate",
  TR: "Province (il)",
};
const AREAS: Record<string, string[]> = {
  EG: ["Cairo", "Giza", "Alexandria", "Dakahlia", "Sharqia", "Port Said", "Aswan"],
  SA: ["Riyadh", "Makkah", "Eastern Province", "Madinah", "Asir", "Qassim"],
  IQ: ["Baghdad", "Basra", "Erbil", "Najaf", "Karbala", "Sulaymaniyah"],
  TR: ["İstanbul", "Ankara", "İzmir", "Antalya", "Bursa", "Adana"],
};

export function Checkout() {
  const { items, subtotal, shippingFee, total, region, price, clear, ready } = useStore();
  const [step, setStep] = useState(0);
  const [express, setExpress] = useState(false);
  const [payment, setPayment] = useState<"card" | "cod" | "wallet">(region.cod ? "cod" : "card");
  const [placed, setPlaced] = useState(false);

  const expressFee = Math.round(region.shipping.fee * 1.8) || region.step * 10;
  const grandTotal = total + (express ? expressFee : 0);

  if (!ready) {
    return <div className="section py-28 text-center font-display text-navy-400">Loading checkout…</div>;
  }

  if (placed) {
    return <Confirmation region={region} total={grandTotal} onReset={() => { clear(); setPlaced(false); }} />;
  }

  if (items.length === 0) {
    return (
      <div className="section py-24 text-center">
        <Fish className="mx-auto w-28 animate-swim" />
        <h1 className="mt-6 font-display text-3xl font-bold text-navy-700">Nothing to check out</h1>
        <p className="mt-2 text-navy-500">Add a few pieces to your bag first.</p>
        <Link href="/shop" className="btn-primary mt-6">Shop everything</Link>
      </div>
    );
  }

  return (
    <div className="section py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-4xl font-bold text-navy-700 sm:text-5xl">Checkout</h1>
        <RegionPicker />
      </div>

      {/* stepper */}
      <ol className="mb-9 flex items-center gap-2 sm:gap-4">
        {STEPS.map((label, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <li key={label} className="flex flex-1 items-center gap-2 sm:gap-3">
              <button
                onClick={() => i <= step && setStep(i)}
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border-[2.5px] border-navy-700 font-display text-sm font-bold transition ${
                  done ? "bg-mint-400 text-navy-800" : active ? "bg-navy-700 text-butter-200" : "bg-white text-navy-300"
                }`}
                aria-current={active ? "step" : undefined}
              >
                {done ? <IconCheck className="h-4 w-4" /> : i + 1}
              </button>
              <span className={`hidden font-display text-sm font-semibold sm:block ${active ? "text-navy-700" : "text-navy-400"}`}>
                {label}
              </span>
              {i < STEPS.length - 1 && (
                <span className={`h-1 flex-1 rounded-full ${done ? "bg-mint-400" : "bg-navy-100"}`} />
              )}
            </li>
          );
        })}
      </ol>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            if (step < STEPS.length - 1) setStep(step + 1);
            else setPlaced(true);
          }}
        >
          {step === 0 && (
            <Panel title="Contact details" hint="We'll send tracking here — nothing else.">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="First name" name="first" required />
                <Field label="Last name" name="last" required />
                <Field label="Email" name="email" type="email" required className="sm:col-span-2" />
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block font-display text-sm font-semibold text-navy-600">
                    Phone
                  </label>
                  <div className="flex gap-2">
                    <span className="grid w-20 place-items-center rounded-2xl border-[2.5px] border-navy-700 bg-butter-100 font-display font-semibold text-navy-700">
                      {PHONE_PREFIX[region.code]}
                    </span>
                    <input required name="phone" inputMode="tel" placeholder="10 123 4567" className="field" />
                  </div>
                </div>
              </div>
              <label className="mt-4 flex items-start gap-3 text-sm text-navy-600">
                <input type="checkbox" defaultChecked className="mt-1 h-4 w-4 accent-sky-500" />
                Email me new drops and restocks (one a week, max)
              </label>
            </Panel>
          )}

          {step === 1 && (
            <>
              <Panel title="Delivery address" hint={`Shipping to ${region.country}`}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Street address" name="address" required className="sm:col-span-2" />
                  <Field label="Apartment, floor (optional)" name="address2" className="sm:col-span-2" />
                  <Field label="City" name="city" required />
                  <div>
                    <label className="mb-1.5 block font-display text-sm font-semibold text-navy-600">
                      {AREA_LABEL[region.code]}
                    </label>
                    <select name="area" className="field" required defaultValue="">
                      <option value="" disabled>Select…</option>
                      {AREAS[region.code].map((a) => (
                        <option key={a}>{a}</option>
                      ))}
                    </select>
                  </div>
                  <Field label="Postal code (optional)" name="zip" />
                  <div>
                    <label className="mb-1.5 block font-display text-sm font-semibold text-navy-600">
                      Country
                    </label>
                    <div className="field flex items-center gap-2 bg-butter-50">
                      <span>{region.flag}</span>
                      {region.country}
                    </div>
                  </div>
                </div>
              </Panel>

              <Panel title="Delivery speed">
                <div className="space-y-3">
                  <Choice
                    checked={!express}
                    onChange={() => setExpress(false)}
                    title={`Standard — ${region.shipping.days}`}
                    sub={`${region.shipping.courier}, tracked`}
                    right={shippingFee === 0 ? "Free" : money(shippingFee, region)}
                  />
                  <Choice
                    checked={express}
                    onChange={() => setExpress(true)}
                    title="Express — 1–2 days"
                    sub="Priority handling, same courier"
                    right={money(expressFee, region)}
                  />
                </div>
              </Panel>
            </>
          )}

          {step === 2 && (
            <>
              <Panel title="Payment" hint="This is a front-end demo — no card is charged.">
                <div className="space-y-3">
                  <Choice
                    checked={payment === "card"}
                    onChange={() => setPayment("card")}
                    title="Credit / debit card"
                    sub="Visa, Mastercard, mada"
                    right="🔒"
                  />
                  {payment === "card" && (
                    <div className="grid gap-4 rounded-3xl border-2 border-navy-200 bg-butter-50 p-4 sm:grid-cols-2">
                      <Field label="Card number" name="card" placeholder="4242 4242 4242 4242" className="sm:col-span-2" />
                      <Field label="Expiry" name="exp" placeholder="MM / YY" />
                      <Field label="CVC" name="cvc" placeholder="123" />
                    </div>
                  )}
                  <Choice
                    checked={payment === "wallet"}
                    onChange={() => setPayment("wallet")}
                    title="Apple Pay / Google Pay"
                    sub="One tap, no typing"
                    right="⚡"
                  />
                  {region.cod && (
                    <Choice
                      checked={payment === "cod"}
                      onChange={() => setPayment("cod")}
                      title="Cash on delivery"
                      sub={`Pay the ${region.shipping.courier} courier at your door`}
                      right="💵"
                    />
                  )}
                </div>
              </Panel>

              <Panel title="Billing address">
                <label className="flex items-start gap-3 text-sm text-navy-600">
                  <input type="checkbox" defaultChecked className="mt-1 h-4 w-4 accent-sky-500" />
                  Same as my delivery address
                </label>
              </Panel>
            </>
          )}

          <div className="flex items-center justify-between gap-3">
            {step > 0 ? (
              <button type="button" onClick={() => setStep(step - 1)} className="btn-ghost">
                Back
              </button>
            ) : (
              <Link href="/cart" className="btn-ghost">Back to bag</Link>
            )}
            <button type="submit" className="btn-primary text-lg">
              {step === STEPS.length - 1 ? `Place order · ${money(grandTotal, region)}` : "Continue"}
              <IconArrow className="h-5 w-5" />
            </button>
          </div>
        </form>

        {/* summary */}
        <aside className="lg:sticky lg:top-32 lg:h-fit">
          <div className="rounded-4xl border-[3px] border-navy-700 bg-white p-6 shadow-pop-lg">
            <h2 className="font-display text-lg font-bold text-navy-700">
              Your order <span className="text-navy-400">({items.length})</span>
            </h2>
            <ul className="mt-4 max-h-[280px] space-y-3 overflow-y-auto pr-1">
              {items.map((line, i) => (
                <li key={line.id} className="flex items-center gap-3">
                  <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border-2 border-navy-700 bg-butter-50">
                    <ProductArt kind={line.product.art} palette={line.product.palette} seed={i} className="h-full w-full" />
                    <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full border-2 border-navy-700 bg-navy-700 font-display text-[0.6rem] font-bold text-butter-200">
                      {line.qty}
                    </span>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-display text-sm font-semibold text-navy-700">
                      {line.product.name}
                    </span>
                    <span className="block text-xs text-navy-400">
                      {[line.size, line.color].filter(Boolean).join(" · ") || "One size"}
                    </span>
                  </span>
                  <span className="shrink-0 font-display text-sm font-bold text-navy-700">
                    {price(line.product.usd * line.qty)}
                  </span>
                </li>
              ))}
            </ul>

            <dl className="mt-5 space-y-2.5 border-t-2 border-navy-100 pt-5 text-navy-600">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd className="font-display font-semibold text-navy-700">{money(subtotal, region)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>{express ? "Express shipping" : "Shipping"}</dt>
                <dd className="font-display font-semibold">
                  {express ? money(expressFee, region) : shippingFee === 0 ? <span className="text-mint-500">Free</span> : money(shippingFee, region)}
                </dd>
              </div>
              <div className="flex justify-between border-t-2 border-navy-100 pt-3 font-display text-lg font-bold text-navy-700">
                <dt>Total</dt>
                <dd>{money(grandTotal, region)}</dd>
              </div>
            </dl>

            <div className="mt-5 space-y-2 rounded-3xl bg-sky-100 p-4 text-xs text-navy-600">
              <p className="flex items-center gap-2"><IconTruck className="h-4 w-4 text-sky-600" /> {region.shipping.days} with {region.shipping.courier}</p>
              <p className="flex items-center gap-2"><IconReturn className="h-4 w-4 text-sky-600" /> Free 14-day returns</p>
              <p className="flex items-center gap-2"><IconShield className="h-4 w-4 text-sky-600" /> Encrypted, PCI-compliant checkout</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Confirmation({
  region,
  total,
  onReset,
}: {
  region: (typeof REGION_LIST)[number];
  total: number;
  onReset: () => void;
}) {
  const order = `BLK-${Math.floor(100000 + Math.random() * 899999)}`;
  return (
    <div className="section py-16">
      <div className="mx-auto max-w-2xl rounded-[2.5rem] border-[3px] border-navy-700 bg-white p-10 text-center shadow-pop-lg">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full border-[3px] border-navy-700 bg-mint-300">
          <IconCheck className="h-10 w-10 text-navy-800" />
        </span>
        <h1 className="mt-6 font-display text-4xl font-bold text-navy-700">Order placed</h1>
        <p className="mt-3 text-navy-600">
          Thank you — your order <strong className="font-display">{order}</strong> is confirmed.
          We&apos;ll email tracking as soon as it leaves the studio.
        </p>

        <dl className="mt-8 grid gap-4 text-left sm:grid-cols-3">
          <Stat label="Total paid" value={money(total, region)} />
          <Stat label="Delivering to" value={`${region.flag} ${region.country}`} />
          <Stat label="Arrives in" value={region.shipping.days} />
        </dl>

        <Fish className="mx-auto mt-8 w-24 animate-swim" />

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/shop" onClick={onReset} className="btn-primary">Keep shopping</Link>
          <Link href="/" onClick={onReset} className="btn-ghost">Back home</Link>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border-2 border-navy-700 bg-butter-100 p-4">
      <dt className="font-display text-xs font-semibold uppercase tracking-wider text-navy-500">{label}</dt>
      <dd className="mt-1 font-display text-lg font-bold text-navy-700">{value}</dd>
    </div>
  );
}

function Panel({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-4xl border-[2.5px] border-navy-700 bg-white p-6 shadow-pop">
      <h2 className="font-display text-xl font-bold text-navy-700">{title}</h2>
      {hint && <p className="mt-1 text-sm text-navy-400">{hint}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1.5 block font-display text-sm font-semibold text-navy-600">
        {label}
      </label>
      <input id={name} name={name} type={type} required={required} placeholder={placeholder} className="field" />
    </div>
  );
}

function Choice({
  checked,
  onChange,
  title,
  sub,
  right,
}: {
  checked: boolean;
  onChange: () => void;
  title: string;
  sub: string;
  right: string;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={checked}
      className={`flex w-full items-center gap-4 rounded-3xl border-[2.5px] px-5 py-4 text-left transition ${
        checked ? "border-navy-700 bg-sky-100 shadow-pop-sm" : "border-navy-200 bg-white hover:border-navy-700"
      }`}
    >
      <span
        className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 border-navy-700 ${
          checked ? "bg-navy-700" : "bg-white"
        }`}
      >
        {checked && <span className="h-1.5 w-1.5 rounded-full bg-butter-200" />}
      </span>
      <span className="flex-1">
        <span className="block font-display font-semibold text-navy-700">{title}</span>
        <span className="block text-sm text-navy-400">{sub}</span>
      </span>
      <span className="shrink-0 font-display font-semibold text-navy-700">{right}</span>
    </button>
  );
}
