export type ArtKind =
  | "dress"
  | "top"
  | "shirt"
  | "jacket"
  | "trousers"
  | "bag"
  | "tote"
  | "clutch"
  | "backpack"
  | "shoe"
  | "sandal"
  | "heel"
  | "loafer"
  | "lingerie"
  | "briefs"
  | "cup"
  | "tumbler"
  | "cupset"
  | "lipstick"
  | "palette"
  | "perfume"
  | "dropper"
  | "sunglasses"
  | "jewelry"
  | "hairclaw"
  | "cap";

export type CategorySlug =
  | "clothing"
  | "bags"
  | "shoes"
  | "lingerie"
  | "beauty"
  | "home"
  | "accessories";

export type Category = {
  slug: CategorySlug;
  name: string;
  tagline: string;
  art: ArtKind;
  tint: string; // tailwind bg class for the category tile
};

export const CATEGORIES: Category[] = [
  { slug: "clothing", name: "Clothing", tagline: "Everyday fits & going-out sets", art: "dress", tint: "bg-butter-300" },
  { slug: "bags", name: "Bags", tagline: "Totes, minis & shoulder bags", art: "bag", tint: "bg-sky-300" },
  { slug: "shoes", name: "Shoes", tagline: "Sneakers, sandals & heels", art: "shoe", tint: "bg-coral-300" },
  { slug: "lingerie", name: "Lingerie", tagline: "Soft sets that actually fit", art: "lingerie", tint: "bg-mint-300" },
  { slug: "beauty", name: "Beauty", tagline: "Lips, lashes & glow", art: "lipstick", tint: "bg-butter-400" },
  { slug: "home", name: "Home & Sips", tagline: "Mugs, tumblers & little joys", art: "cup", tint: "bg-sky-200" },
  { slug: "accessories", name: "Accessories", tagline: "Shades, hoops & hair clips", art: "sunglasses", tint: "bg-coral-400" },
];

export type Product = {
  slug: string;
  name: string;
  category: CategorySlug;
  /** Base price in USD. The storefront converts per region. */
  usd: number;
  compareUsd?: number;
  art: ArtKind;
  palette: [string, string, string];
  colors: { name: string; hex: string }[];
  sizes?: string[];
  rating: number;
  reviews: number;
  badge?: "New" | "Bestseller" | "Almost gone" | "Sale";
  blurb: string;
  details: string[];
  material: string;
  tags: string[];
};

const P = {
  navy: "#0F3557",
  sky: "#4FB6F0",
  skyLight: "#AFE2F9",
  butter: "#FBEB9C",
  butterDeep: "#F7DE6B",
  coral: "#FF6F59",
  coralLight: "#FFB0A2",
  mint: "#6FDCBC",
  cream: "#FFFBF0",
  plum: "#8E5BA6",
  sage: "#9FBF8F",
  rose: "#E58AA0",
};

export const PRODUCTS: Product[] = [
  {
    slug: "denim-wave-midi-dress",
    name: "Denim Wave Midi Dress",
    category: "clothing",
    usd: 44,
    compareUsd: 59,
    art: "dress",
    palette: [P.sky, P.skyLight, P.navy],
    colors: [
      { name: "Ocean Blue", hex: "#4FB6F0" },
      { name: "Deep Navy", hex: "#0F3557" },
      { name: "Sand", hex: "#F6EEDC" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.8,
    reviews: 214,
    badge: "Bestseller",
    blurb: "A soft-washed denim midi with a swishy hem that moves like water. Buttons all the way down so you decide how much leg the day gets.",
    details: ["Button-through front", "Side pockets, deep enough for a phone", "Midi length, hits mid-calf on 165cm", "Machine wash cold"],
    material: "98% cotton, 2% elastane",
    tags: ["dress", "denim", "midi", "summer"],
  },
  {
    slug: "butter-knit-cardigan",
    name: "Butter Knit Cardigan",
    category: "clothing",
    usd: 38,
    art: "jacket",
    palette: [P.butter, P.butterDeep, P.navy],
    colors: [
      { name: "Butter", hex: "#FBEB9C" },
      { name: "Cream", hex: "#FFFBF0" },
      { name: "Coral", hex: "#FF6F59" },
    ],
    sizes: ["S", "M", "L"],
    rating: 4.9,
    reviews: 340,
    badge: "Bestseller",
    blurb: "The cardigan you steal from yourself. Chunky ribbed knit, dropped shoulders, and pearly buttons that make a t-shirt look considered.",
    details: ["Oversized fit — size down for a neat look", "Ribbed cuffs and hem", "Pearl-finish buttons", "Hand wash, dry flat"],
    material: "70% cotton, 30% acrylic blend",
    tags: ["knit", "cardigan", "layer"],
  },
  {
    slug: "little-fish-slip-dress",
    name: "Little Fish Slip Dress",
    category: "clothing",
    usd: 36,
    art: "dress",
    palette: [P.rose, P.coralLight, P.navy],
    colors: [
      { name: "Rose", hex: "#E58AA0" },
      { name: "Black", hex: "#1A1A1A" },
      { name: "Mint", hex: "#6FDCBC" },
    ],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.6,
    reviews: 128,
    badge: "New",
    blurb: "Bias-cut satin that skims instead of clings. Adjustable straps, no zip, and it packs down to nothing.",
    details: ["Bias cut for movement", "Adjustable spaghetti straps", "Fully lined bodice", "Dry clean or cold hand wash"],
    material: "Recycled satin",
    tags: ["dress", "satin", "party"],
  },
  {
    slug: "harbour-linen-shirt",
    name: "Harbour Linen Shirt",
    category: "clothing",
    usd: 32,
    art: "shirt",
    palette: [P.cream, "#F6EEDC", P.navy],
    colors: [
      { name: "Off White", hex: "#FFFBF0" },
      { name: "Sky", hex: "#AFE2F9" },
      { name: "Olive", hex: "#9FBF8F" },
    ],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.7,
    reviews: 96,
    blurb: "Breathable linen cut a little long so it works open over a swimsuit or tucked into trousers.",
    details: ["Relaxed unisex fit", "Coconut-shell buttons", "Curved hem", "Gets softer every wash"],
    material: "100% washed linen",
    tags: ["shirt", "linen", "summer"],
  },
  {
    slug: "boardwalk-wide-trousers",
    name: "Boardwalk Wide Trousers",
    category: "clothing",
    usd: 41,
    art: "trousers",
    palette: [P.navy, "#1E5183", P.butter],
    colors: [
      { name: "Navy", hex: "#0F3557" },
      { name: "Stone", hex: "#F6EEDC" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.5,
    reviews: 74,
    blurb: "High-waisted, wide-legged, and lined at the hip so nothing sticks. Comes hemmed for 168cm with extra fabric to let down.",
    details: ["Elastic back waist", "Real pockets", "Extra hem allowance", "Machine wash cold"],
    material: "Viscose-linen blend",
    tags: ["trousers", "wide leg"],
  },
  {
    slug: "sunset-crop-tee",
    name: "Sunset Crop Tee",
    category: "clothing",
    usd: 18,
    compareUsd: 24,
    art: "top",
    palette: [P.coral, P.coralLight, P.navy],
    colors: [
      { name: "Sunset", hex: "#FF6F59" },
      { name: "Butter", hex: "#FBEB9C" },
      { name: "Sky", hex: "#4FB6F0" },
    ],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.4,
    reviews: 189,
    badge: "Sale",
    blurb: "Heavyweight cotton tee with a boxy crop. Holds its shape through a whole summer of washing.",
    details: ["220gsm cotton", "Boxy crop, hits at the waist", "Ribbed neckband", "Pre-shrunk"],
    material: "100% combed cotton",
    tags: ["tee", "basic", "crop"],
  },

  {
    slug: "balik-mini-shoulder-bag",
    name: "Balık Mini Shoulder Bag",
    category: "bags",
    usd: 42,
    art: "bag",
    palette: [P.sky, P.skyLight, P.navy],
    colors: [
      { name: "Ocean", hex: "#4FB6F0" },
      { name: "Butter", hex: "#FBEB9C" },
      { name: "Black", hex: "#1A1A1A" },
    ],
    rating: 4.9,
    reviews: 412,
    badge: "Bestseller",
    blurb: "Small but not useless — phone, cards, lip balm and keys, with a little embossed fish on the flap.",
    details: ["Magnetic flap closure", "Adjustable shoulder strap", "Interior card slot", "Dust bag included"],
    material: "Vegan leather, recycled lining",
    tags: ["bag", "mini", "shoulder"],
  },
  {
    slug: "market-day-tote",
    name: "Market Day Tote",
    category: "bags",
    usd: 29,
    art: "tote",
    palette: [P.butterDeep, P.butter, P.navy],
    colors: [
      { name: "Straw", hex: "#F7DE6B" },
      { name: "Cream", hex: "#FFFBF0" },
    ],
    rating: 4.7,
    reviews: 158,
    blurb: "Canvas tote with a flat base so it stands up on its own. Fits a laptop, a melon, or both.",
    details: ["Flat reinforced base", "Inner zip pocket", "Shoulder-length handles", "Machine washable"],
    material: "Heavy cotton canvas",
    tags: ["tote", "canvas", "everyday"],
  },
  {
    slug: "pearl-strap-clutch",
    name: "Pearl Strap Clutch",
    category: "bags",
    usd: 34,
    compareUsd: 45,
    art: "clutch",
    palette: [P.cream, P.rose, P.navy],
    colors: [
      { name: "Pearl", hex: "#FFFBF0" },
      { name: "Rose", hex: "#E58AA0" },
    ],
    rating: 4.6,
    reviews: 87,
    badge: "Sale",
    blurb: "An evening clutch with a beaded strap you can unclip. Fits a phone flat, which most clutches do not.",
    details: ["Detachable beaded strap", "Snap frame closure", "Satin lining", "Comes boxed"],
    material: "Satin over structured frame",
    tags: ["clutch", "evening"],
  },
  {
    slug: "deep-blue-backpack",
    name: "Deep Blue Backpack",
    category: "bags",
    usd: 52,
    art: "backpack",
    palette: [P.navy, "#1E5183", P.sky],
    colors: [{ name: "Deep Navy", hex: "#0F3557" }],
    rating: 4.8,
    reviews: 203,
    badge: "Almost gone",
    blurb: "Padded laptop sleeve, water-resistant shell, and a back panel that doesn't sweat through.",
    details: ["Fits up to 15\" laptop", "Water-resistant coating", "Hidden back pocket", "Padded straps"],
    material: "Recycled polyester twill",
    tags: ["backpack", "work", "travel"],
  },

  {
    slug: "cloud-walk-sneakers",
    name: "Cloud Walk Sneakers",
    category: "shoes",
    usd: 54,
    art: "shoe",
    palette: [P.cream, P.sky, P.navy],
    colors: [
      { name: "Cream / Sky", hex: "#AFE2F9" },
      { name: "All White", hex: "#FFFFFF" },
      { name: "Navy", hex: "#0F3557" },
    ],
    sizes: ["36", "37", "38", "39", "40", "41"],
    rating: 4.8,
    reviews: 366,
    badge: "Bestseller",
    blurb: "Low-profile sneakers with a memory-foam footbed. The pair you reach for when you'll be on your feet all day.",
    details: ["Memory foam insole", "Rubber cupsole", "Removable laces", "True to size"],
    material: "Canvas upper, rubber sole",
    tags: ["sneakers", "flat", "comfort"],
  },
  {
    slug: "shoreline-slide-sandals",
    name: "Shoreline Slide Sandals",
    category: "shoes",
    usd: 26,
    art: "sandal",
    palette: [P.butterDeep, P.butter, P.navy],
    colors: [
      { name: "Butter", hex: "#FBEB9C" },
      { name: "Coral", hex: "#FF6F59" },
      { name: "Black", hex: "#1A1A1A" },
    ],
    sizes: ["36", "37", "38", "39", "40"],
    rating: 4.5,
    reviews: 141,
    badge: "New",
    blurb: "Moulded footbed slides that survive sand, pool and the walk home. Quick-dry strap.",
    details: ["Contoured footbed", "Quick-dry padded strap", "Grippy outsole", "Rinse clean"],
    material: "EVA and recycled webbing",
    tags: ["sandals", "summer", "slides"],
  },
  {
    slug: "midnight-square-heel",
    name: "Midnight Square Heel",
    category: "shoes",
    usd: 58,
    art: "heel",
    palette: [P.navy, "#1E5183", P.butter],
    colors: [
      { name: "Midnight", hex: "#0F3557" },
      { name: "Bone", hex: "#F6EEDC" },
    ],
    sizes: ["36", "37", "38", "39", "40"],
    rating: 4.4,
    reviews: 62,
    blurb: "A 7cm block heel with a padded sole — the rare going-out shoe you can stand in through dinner.",
    details: ["7cm stable block heel", "Padded insole", "Adjustable ankle strap", "Slightly narrow — size up for wide feet"],
    material: "Vegan leather",
    tags: ["heels", "evening"],
  },
  {
    slug: "harbour-loafers",
    name: "Harbour Loafers",
    category: "shoes",
    usd: 47,
    compareUsd: 62,
    art: "loafer",
    palette: ["#6B4A2F", "#9A7550", P.butter],
    colors: [
      { name: "Chestnut", hex: "#6B4A2F" },
      { name: "Black", hex: "#1A1A1A" },
    ],
    sizes: ["36", "37", "38", "39", "40", "41"],
    rating: 4.7,
    reviews: 118,
    badge: "Sale",
    blurb: "Chunky-soled loafers with a soft lining, so no break-in period and no blisters on day one.",
    details: ["Soft textile lining", "Lug rubber sole", "Metal snaffle detail", "Runs true to size"],
    material: "Vegan leather, rubber sole",
    tags: ["loafers", "work"],
  },

  {
    slug: "soft-swim-bralette-set",
    name: "Soft Swim Bralette Set",
    category: "lingerie",
    usd: 28,
    art: "lingerie",
    palette: [P.mint, "#A9EDD8", P.navy],
    colors: [
      { name: "Sea Glass", hex: "#6FDCBC" },
      { name: "Blush", hex: "#E58AA0" },
      { name: "Black", hex: "#1A1A1A" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.9,
    reviews: 288,
    badge: "Bestseller",
    blurb: "Wire-free bralette and brief in a modal blend that feels like nothing. Wide band, no dig.",
    details: ["Wire-free with removable pads", "Wide non-slip underband", "Sold as a two-piece set", "Cold wash, air dry"],
    material: "Modal and elastane",
    tags: ["set", "bralette", "comfort"],
  },
  {
    slug: "lace-tide-bodysuit",
    name: "Lace Tide Bodysuit",
    category: "lingerie",
    usd: 35,
    art: "lingerie",
    palette: [P.plum, "#C39BD6", P.navy],
    colors: [
      { name: "Plum", hex: "#8E5BA6" },
      { name: "Ivory", hex: "#FFFBF0" },
    ],
    sizes: ["S", "M", "L"],
    rating: 4.6,
    reviews: 71,
    badge: "New",
    blurb: "Stretch lace bodysuit with a lined gusset and snap closure — works as lingerie or under a blazer.",
    details: ["Four-way stretch lace", "Lined gusset with snaps", "Adjustable straps", "Hand wash"],
    material: "Stretch lace",
    tags: ["bodysuit", "lace"],
  },
  {
    slug: "everyday-cotton-briefs-3-pack",
    name: "Everyday Cotton Briefs — 3 Pack",
    category: "lingerie",
    usd: 19,
    art: "briefs",
    palette: [P.cream, P.butter, P.navy],
    colors: [{ name: "Neutral Mix", hex: "#F6EEDC" }],
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    rating: 4.8,
    reviews: 501,
    blurb: "Full-coverage cotton briefs with a flat seam that disappears under everything. Three to a pack.",
    details: ["Flat-seam finish", "Breathable cotton gusset", "Three per pack", "Machine wash"],
    material: "95% cotton, 5% elastane",
    tags: ["basics", "cotton", "pack"],
  },
  {
    slug: "silk-night-slip",
    name: "Silk Night Slip",
    category: "lingerie",
    usd: 46,
    art: "dress",
    palette: [P.rose, "#F5C3CE", P.navy],
    colors: [
      { name: "Shell Pink", hex: "#F5C3CE" },
      { name: "Navy", hex: "#0F3557" },
    ],
    sizes: ["S", "M", "L"],
    rating: 4.7,
    reviews: 93,
    blurb: "A washable silk-blend slip that's cool in summer and doesn't wrinkle into a raisin overnight.",
    details: ["Machine washable silk blend", "Side slit", "French seams", "Comes in a reusable pouch"],
    material: "Silk-viscose blend",
    tags: ["sleep", "silk"],
  },

  {
    slug: "coral-reef-lip-set",
    name: "Coral Reef Lip Set",
    category: "beauty",
    usd: 24,
    compareUsd: 33,
    art: "lipstick",
    palette: [P.coral, P.coralLight, P.navy],
    colors: [{ name: "3-shade set", hex: "#FF6F59" }],
    rating: 4.8,
    reviews: 276,
    badge: "Sale",
    blurb: "Three creamy satin lipsticks — a nude, a rose and a true coral — that layer over each other without going patchy.",
    details: ["Three full-size bullets", "Satin, non-drying finish", "Vitamin E and shea", "Cruelty free"],
    material: "Vegan formula",
    tags: ["lipstick", "set", "makeup"],
  },
  {
    slug: "deep-sea-eye-palette",
    name: "Deep Sea Eye Palette",
    category: "beauty",
    usd: 31,
    art: "palette",
    palette: [P.sky, P.navy, P.butter],
    colors: [{ name: "12 shades", hex: "#4FB6F0" }],
    rating: 4.7,
    reviews: 184,
    badge: "New",
    blurb: "Twelve blues, bronzes and creams that blend instead of flaking. Mirror in the lid, actually usable.",
    details: ["12 pressed shades", "Matte, satin and shimmer", "Full-size lid mirror", "Talc free"],
    material: "Vegan formula",
    tags: ["eyeshadow", "palette", "makeup"],
  },
  {
    slug: "glass-skin-glow-drops",
    name: "Glass Skin Glow Drops",
    category: "beauty",
    usd: 22,
    art: "dropper",
    palette: [P.butter, P.cream, P.navy],
    colors: [{ name: "Universal", hex: "#FBEB9C" }],
    rating: 4.6,
    reviews: 212,
    blurb: "A few drops mixed into moisturiser or worn alone. Lit-from-within, not glitter.",
    details: ["30ml dropper bottle", "Niacinamide and squalane", "Fragrance free", "Layer under or over makeup"],
    material: "Vegan formula",
    tags: ["skincare", "glow"],
  },
  {
    slug: "salt-air-eau-de-parfum",
    name: "Salt Air Eau de Parfum",
    category: "beauty",
    usd: 49,
    art: "perfume",
    palette: [P.skyLight, P.sky, P.navy],
    colors: [{ name: "50ml", hex: "#AFE2F9" }],
    rating: 4.9,
    reviews: 141,
    badge: "Bestseller",
    blurb: "Bergamot, sea salt and warm driftwood. Smells like the ten minutes after you leave the beach.",
    details: ["50ml eau de parfum", "6–8 hour wear", "Bergamot · sea salt · driftwood", "Refillable bottle"],
    material: "Vegan, alcohol-based",
    tags: ["perfume", "fragrance"],
  },

  {
    slug: "balik-fish-mug",
    name: "Balık Fish Mug",
    category: "home",
    usd: 16,
    art: "cup",
    palette: [P.butter, P.sky, P.navy],
    colors: [
      { name: "Butter", hex: "#FBEB9C" },
      { name: "Sky", hex: "#4FB6F0" },
    ],
    rating: 4.9,
    reviews: 388,
    badge: "Bestseller",
    blurb: "Our little blue fish, glazed onto a chunky 350ml stoneware mug. Dishwasher safe, obviously.",
    details: ["350ml stoneware", "Hand-glazed fish motif", "Dishwasher and microwave safe", "Gift boxed"],
    material: "Glazed stoneware",
    tags: ["mug", "ceramic", "gift"],
  },
  {
    slug: "ocean-tumbler-600ml",
    name: "Ocean Tumbler 600ml",
    category: "home",
    usd: 27,
    art: "tumbler",
    palette: [P.sky, P.skyLight, P.navy],
    colors: [
      { name: "Ocean", hex: "#4FB6F0" },
      { name: "Sand", hex: "#F6EEDC" },
      { name: "Navy", hex: "#0F3557" },
    ],
    rating: 4.7,
    reviews: 165,
    blurb: "Double-walled steel tumbler that keeps iced coffee cold through a Cairo afternoon. Leak-proof lid.",
    details: ["600ml, double-walled", "24h cold / 8h hot", "Leak-proof flip lid", "Fits standard cup holders"],
    material: "Stainless steel",
    tags: ["tumbler", "travel"],
  },
  {
    slug: "wave-ceramic-cup-set",
    name: "Wave Ceramic Cup Set",
    category: "home",
    usd: 38,
    compareUsd: 48,
    art: "cupset",
    palette: [P.cream, P.mint, P.navy],
    colors: [{ name: "Set of 4", hex: "#A9EDD8" }],
    rating: 4.6,
    reviews: 77,
    badge: "Sale",
    blurb: "Four small cups in four glazes for Turkish coffee, cortados or stubbornly long conversations.",
    details: ["Set of 4 × 120ml", "Four coordinated glazes", "Stackable", "Dishwasher safe"],
    material: "Glazed ceramic",
    tags: ["cups", "set", "coffee"],
  },

  {
    slug: "tide-line-sunglasses",
    name: "Tide Line Sunglasses",
    category: "accessories",
    usd: 25,
    art: "sunglasses",
    palette: [P.navy, P.sky, P.butter],
    colors: [
      { name: "Tortoise", hex: "#8A5A2B" },
      { name: "Navy", hex: "#0F3557" },
      { name: "Clear", hex: "#E7E7E7" },
    ],
    rating: 4.5,
    reviews: 154,
    badge: "New",
    blurb: "Wide rectangular frames with real UV400 lenses and spring hinges that forgive being sat on.",
    details: ["UV400 protection", "Spring hinges", "Hard case and cloth included", "Unisex fit"],
    material: "Acetate frame",
    tags: ["sunglasses", "uv"],
  },
  {
    slug: "gold-fish-hoop-earrings",
    name: "Gold Fish Hoop Earrings",
    category: "accessories",
    usd: 21,
    art: "jewelry",
    palette: [P.butterDeep, P.butter, P.navy],
    colors: [
      { name: "Gold", hex: "#E5B94E" },
      { name: "Silver", hex: "#C8CCD0" },
    ],
    rating: 4.8,
    reviews: 229,
    blurb: "Chunky 30mm hoops with a tiny fish charm. Waterproof plating that won't turn your ears green.",
    details: ["30mm hoops", "18k gold plating over brass", "Hypoallergenic posts", "Waterproof — swim in them"],
    material: "Plated brass",
    tags: ["earrings", "hoops", "gold"],
  },
  {
    slug: "seashell-hair-claw",
    name: "Seashell Hair Claw",
    category: "accessories",
    usd: 12,
    art: "hairclaw",
    palette: [P.rose, P.cream, P.navy],
    colors: [
      { name: "Shell", hex: "#F5C3CE" },
      { name: "Tortoise", hex: "#8A5A2B" },
      { name: "Sky", hex: "#AFE2F9" },
    ],
    rating: 4.7,
    reviews: 312,
    blurb: "A big, strong claw that holds thick hair without the jaw-snap of cheap ones.",
    details: ["11cm, holds thick hair", "Reinforced steel spring", "Smooth teeth, no snagging", "Three colourways"],
    material: "Cellulose acetate",
    tags: ["hair", "claw"],
  },
  {
    slug: "canvas-fish-cap",
    name: "Canvas Fish Cap",
    category: "accessories",
    usd: 19,
    art: "cap",
    palette: [P.sky, P.cream, P.navy],
    colors: [
      { name: "Ocean", hex: "#4FB6F0" },
      { name: "Cream", hex: "#FFFBF0" },
    ],
    rating: 4.4,
    reviews: 88,
    blurb: "Soft unstructured cap with the Balık fish embroidered small on the front. Adjustable strap at the back.",
    details: ["Unstructured six-panel", "Embroidered fish", "Adjustable metal buckle", "One size"],
    material: "Cotton canvas",
    tags: ["cap", "hat"],
  },
];

export const BY_SLUG = Object.fromEntries(PRODUCTS.map((p) => [p.slug, p]));

export function productsIn(category?: CategorySlug) {
  return category ? PRODUCTS.filter((p) => p.category === category) : PRODUCTS;
}

export function relatedTo(product: Product, count = 4) {
  return PRODUCTS.filter((p) => p.category === product.category && p.slug !== product.slug)
    .concat(PRODUCTS.filter((p) => p.category !== product.category))
    .slice(0, count);
}

export const SIZE_ORDER = ["XS", "S", "M", "L", "XL", "2XL", "36", "37", "38", "39", "40", "41"];
