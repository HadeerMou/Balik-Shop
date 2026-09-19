import { IconStar } from "../Icons";

const REVIEWS = [
  {
    quote:
      "Ordered on Sunday, it was at my door in Cairo on Tuesday. The cardigan is thicker than it looks in the photos — in a good way.",
    name: "Mariam H.",
    place: "Cairo, Egypt",
    item: "Butter Knit Cardigan",
    tint: "bg-butter-200",
  },
  {
    quote:
      "Finally a bralette that doesn't dig. I bought one, then came back for three more in every colour.",
    name: "Noura A.",
    place: "Riyadh, Saudi Arabia",
    item: "Soft Swim Bralette Set",
    tint: "bg-sky-200",
  },
  {
    quote:
      "The little fish mug made my sister cry laughing. Packaging was beautiful, nothing broken after the trip to Baghdad.",
    name: "Zainab K.",
    place: "Baghdad, Iraq",
    item: "Balık Fish Mug",
    tint: "bg-coral-300",
  },
  {
    quote:
      "Sizing chart was accurate for once. The wide trousers came hemmed exactly as described and I'm 172cm.",
    name: "Elif Y.",
    place: "Istanbul, Türkiye",
    item: "Boardwalk Wide Trousers",
    tint: "bg-mint-300",
  },
];

export function Testimonials() {
  return (
    <section className="section py-14 sm:py-18">
      <div className="mb-7 text-center">
        <h2 className="font-display text-3xl font-bold text-navy-700 sm:text-4xl">
          4.8 stars, four countries
        </h2>
        <p className="mt-1.5 text-navy-500">Real reviews from real orders. Occasionally very blunt.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {REVIEWS.map((r, i) => (
          <figure
            key={r.name}
            className={`flex flex-col rounded-4xl border-[2.5px] border-navy-700 ${r.tint} p-5 shadow-pop ${
              i % 2 === 1 ? "lg:mt-6" : ""
            }`}
          >
            <span className="flex text-navy-700" aria-label="5 out of 5 stars">
              {[1, 2, 3, 4, 5].map((s) => (
                <IconStar key={s} className="h-4 w-4" />
              ))}
            </span>
            <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-navy-800">
              &ldquo;{r.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-4 border-t-2 border-navy-700/20 pt-3">
              <p className="font-display text-sm font-bold text-navy-800">{r.name}</p>
              <p className="text-xs text-navy-700/70">{r.place}</p>
              <p className="mt-1 text-xs font-semibold text-navy-700/80">on {r.item}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
