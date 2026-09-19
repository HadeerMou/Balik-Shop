import Link from "next/link";
import { CATEGORIES } from "@/lib/catalog";
import { REGION_LIST } from "@/lib/regions";
import { Fish } from "./Fish";
import { LogoBadge } from "./Logo";
import { IconArrow, IconReturn, IconShield, IconTruck } from "./Icons";

const PROMISES = [
  { icon: IconTruck, title: "4 countries, one bag", body: "Egypt, Saudi Arabia, Iraq and Türkiye — local couriers, tracked door to door." },
  { icon: IconReturn, title: "14-day returns", body: "Didn't fit? Send it back within 14 days, unworn, tags on." },
  { icon: IconShield, title: "Pay your way", body: "Card, Apple Pay, instalments — and cash on delivery in EG, SA and IQ." },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t-[3px] border-navy-700 bg-butter-100">
      {/* promises */}
      <div className="border-b-[2.5px] border-navy-700 bg-white">
        <div className="section grid gap-6 py-10 sm:grid-cols-3">
          {PROMISES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-navy-700 bg-sky-200 text-navy-700">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display font-semibold text-navy-700">{title}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-navy-500">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* newsletter */}
      <div className="border-b-[2.5px] border-navy-700 bg-sky-200 paper">
        <div className="section flex flex-col items-center gap-5 py-12 text-center">
          <Fish className="w-20 animate-swim" />
          <h2 className="max-w-xl font-display text-3xl font-bold leading-tight text-navy-700 sm:text-4xl">
            Get the drop before it swims away
          </h2>
          <p className="max-w-md text-navy-600">
            One email a week. New arrivals, restocks and a code for your first order.
          </p>
          <form className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
            <label htmlFor="newsletter" className="sr-only">
              Email address
            </label>
            <input id="newsletter" type="email" required placeholder="you@email.com" className="field flex-1" />
            <button type="submit" className="btn-primary shrink-0">
              Join
              <IconArrow className="h-4 w-4" />
            </button>
          </form>
          <p className="text-xs text-navy-500">No spam. Unsubscribe in one click.</p>
        </div>
      </div>

      {/* links */}
      <div className="section grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <LogoBadge size={64} />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy-600">
            Balık Shop is a small online store with a big appetite — clothes, bags, shoes, lingerie,
            beauty and the little things that make a day nicer.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {REGION_LIST.map((r) => (
              <span key={r.code} className="chip bg-white">
                <span>{r.flag}</span>
                {r.country}
              </span>
            ))}
          </div>
        </div>

        <FooterCol
          title="Shop"
          links={CATEGORIES.map((c) => ({ label: c.name, href: `/shop?category=${c.slug}` }))}
        />
        <FooterCol
          title="Help"
          links={[
            { label: "Shipping & delivery", href: "/shop" },
            { label: "Returns & exchanges", href: "/shop" },
            { label: "Size guide", href: "/shop" },
            { label: "Track my order", href: "/shop" },
            { label: "Contact us", href: "/shop" },
          ]}
        />
        <FooterCol
          title="Balık"
          links={[
            { label: "Our story", href: "/" },
            { label: "Instagram", href: "/" },
            { label: "TikTok", href: "/" },
            { label: "Careers", href: "/" },
            { label: "Wholesale", href: "/" },
          ]}
        />
      </div>

      <div className="border-t-2 border-navy-200">
        <div className="section flex flex-col items-center justify-between gap-3 py-5 text-xs text-navy-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Balık Shop. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span>Privacy</span>
            <span>Terms</span>
            <span className="flex items-center gap-1.5">
              Secure checkout
              <span className="flex gap-1">
                {["VISA", "MC", "mada", "COD"].map((m) => (
                  <span key={m} className="rounded border border-navy-300 bg-white px-1.5 py-0.5 font-display text-[0.6rem] font-bold text-navy-600">
                    {m}
                  </span>
                ))}
              </span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-navy-700">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="text-sm text-navy-600 transition hover:text-sky-600 hover:underline-wave">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
