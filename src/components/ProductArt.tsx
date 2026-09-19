import type { ArtKind } from "@/lib/catalog";

const INK = "#0F3557";
const LIGHT = "#FFFBF0";

type Props = {
  kind: ArtKind;
  palette: [string, string, string];
  className?: string;
  /** Slight per-product variation so a grid never looks stamped. */
  seed?: number;
  /** 0 = full shot, 1–3 = "detail" crops used by the product gallery. */
  zoom?: number;
};

const ZOOMS = [
  { s: 1, dx: 0, dy: 0 },
  { s: 1.9, dx: 6, dy: -26 },
  { s: 1.9, dx: -8, dy: 30 },
  { s: 1.45, dx: 0, dy: 6 },
];

/**
 * Hand-drawn style product illustrations, one per product type.
 * Swap this component for <Image /> once real photography is shot.
 */
export function ProductArt({ kind, palette, className = "", seed = 0, zoom = 0 }: Props) {
  const [main, accent] = palette;
  const rotate = ((seed % 5) - 2) * 1.4;
  const id = `${kind}-${seed}-${zoom}`;
  const z = ZOOMS[zoom % ZOOMS.length];
  const transform = `rotate(${rotate} 100 100) translate(${(1 - z.s) * 100 + z.dx} ${
    (1 - z.s) * 100 + z.dy
  }) scale(${z.s})`;

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label="Product illustration"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <clipPath id={`clip-${id}`}>
          <rect width="200" height="200" />
        </clipPath>
      </defs>

      <g clipPath={`url(#clip-${id})`}>
        <circle cx="100" cy="98" r="76" fill={accent} opacity="0.45" />
        <circle cx="100" cy="98" r="76" fill="none" stroke={INK} strokeWidth="2" opacity="0.16" />
        <path
          d="M8 176c16-10 30-10 46 0s30 10 46 0 30-10 46 0 30 10 46 0v40H8z"
          fill={accent}
          opacity="0.5"
        />
      </g>

      <g clipPath={`url(#clip-${id})`}>
        <g
          stroke={INK}
          strokeWidth="5"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
          transform={transform}
        >
          {shape(kind, main, accent)}
        </g>
      </g>
    </svg>
  );
}

function shape(kind: ArtKind, main: string, accent: string) {
  switch (kind) {
    /* ---------- clothing ---------- */
    case "dress":
      return (
        <>
          <path d="M80 44l6 18M120 44l-6 18" />
          <path d="M84 60h32l24 98c-27 9-53 9-80 0z" fill={main} />
          <path d="M84 60c6 10 26 10 32 0" fill={accent} />
          <path d="M70 128c20 6 40 6 60 0" strokeWidth="3" opacity="0.5" />
        </>
      );

    case "top":
      return (
        <>
          <path
            d="M70 56l16-8c8 12 20 12 28 0l16 8 22 24-16 16-6 54c-20 6-40 6-60 0l-6-54-16-16z"
            fill={main}
          />
          <path d="M86 48c8 12 20 12 28 0" fill={accent} />
          <path d="M78 136c15 4 29 4 44 0" strokeWidth="3" opacity="0.45" />
        </>
      );

    case "shirt":
      return (
        <>
          <path d="M68 58l18-8 14 16 14-16 18 8 20 24-16 14-4 56c-21 6-43 6-64 0l-4-56-16-14z" fill={main} />
          <path d="M86 50l14 16-14 10-10-14zM114 50l-14 16 14 10 10-14z" fill={accent} />
          <path d="M100 76v70" strokeWidth="3" />
          <circle cx="100" cy="98" r="3.5" fill={INK} stroke="none" />
          <circle cx="100" cy="122" r="3.5" fill={INK} stroke="none" />
        </>
      );

    case "jacket":
      return (
        <>
          <path d="M68 58L46 72l-6 58 22 5 4-30" fill={main} />
          <path d="M132 58l22 14 6 58-22 5-4-30" fill={main} />
          <path d="M68 58h64l8 28-6 68c-24 6-44 6-68 0l-6-68z" fill={accent} />
          <path d="M100 60v94" />
          <circle cx="100" cy="86" r="4" fill={INK} stroke="none" />
          <circle cx="100" cy="108" r="4" fill={INK} stroke="none" />
          <circle cx="100" cy="130" r="4" fill={INK} stroke="none" />
        </>
      );

    case "trousers":
      return (
        <>
          <path d="M66 68h68l6 110h-32l-8-74-8 74H60z" fill={main} />
          <path d="M66 48h68v22H66z" fill={accent} />
          <path d="M100 76v18" strokeWidth="3" opacity="0.6" />
          <circle cx="100" cy="59" r="3.5" fill={INK} stroke="none" />
        </>
      );

    /* ---------- bags ---------- */
    case "bag":
      return (
        <>
          <path d="M68 88C68 46 132 46 132 88" strokeWidth="6" />
          <rect x="52" y="86" width="96" height="70" rx="16" fill={main} />
          <path d="M52 104V98c0-8 6-14 14-14h68c8 0 14 6 14 14v6z" fill={accent} />
          <path d="M52 108h96" strokeWidth="4" />
          <rect x="92" y="102" width="16" height="14" rx="4" fill={accent} />
        </>
      );

    case "tote":
      return (
        <>
          <path d="M74 86C74 46 126 46 126 86" strokeWidth="6" />
          <path d="M86 86c0-26 28-26 28 0" strokeWidth="5" opacity="0.55" />
          <path d="M54 84h92l-9 76H63z" fill={main} />
          <rect x="82" y="110" width="36" height="26" rx="6" fill={accent} />
        </>
      );

    case "clutch":
      return (
        <>
          <path d="M50 96h100v44a14 14 0 0 1-14 14H64a14 14 0 0 1-14-14z" fill={main} />
          <path d="M50 96l50-30 50 30z" fill={accent} />
          <circle cx="100" cy="112" r="7" fill={accent} />
          <g fill={accent} stroke={INK} strokeWidth="3">
            <circle cx="60" cy="80" r="5" />
            <circle cx="76" cy="66" r="5" />
            <circle cx="100" cy="60" r="5" />
            <circle cx="124" cy="66" r="5" />
            <circle cx="140" cy="80" r="5" />
          </g>
        </>
      );

    case "backpack":
      return (
        <>
          <path d="M74 76c-6-26 18-30 22-8M126 76c6-26-18-30-22-8" strokeWidth="5" />
          <rect x="52" y="72" width="96" height="92" rx="24" fill={main} />
          <path d="M52 100V96c0-14 10-24 24-24h48c14 0 24 10 24 24v4z" fill={accent} />
          <rect x="74" y="116" width="52" height="34" rx="10" fill={accent} />
          <path d="M84 132h32" strokeWidth="4" />
        </>
      );

    /* ---------- shoes ---------- */
    case "shoe":
      return (
        <>
          <path
            d="M34 136c0-20 8-34 26-40l44-14c12-4 20 0 26 10l12 20 18 8c8 4 10 10 8 16z"
            fill={main}
          />
          <path d="M28 136h144c4 0 6 4 6 10 0 8-6 12-14 12H42c-10 0-14-6-14-14z" fill={accent} />
          <path d="M62 120q24-10 46 2" strokeWidth="4" opacity="0.7" />
          <path d="M78 98l10 14M92 92l10 14M106 86l10 14" strokeWidth="4" opacity="0.7" />
        </>
      );

    case "sandal":
      return (
        <>
          <path
            d="M100 40c30 0 48 22 48 58v34c0 20-18 32-48 32s-48-12-48-32v-34c0-36 18-58 48-58z"
            fill={main}
          />
          <path d="M54 86q46-18 92 0v20q-46-14-92 0z" fill={accent} />
          <path d="M60 140q40 10 80 0" strokeWidth="4" opacity="0.5" />
        </>
      );

    case "heel":
      // top-down view: pointed toe, open throat, block heel behind
      return (
        <>
          <rect x="86" y="158" width="28" height="22" rx="6" fill={main} />
          <path d="M100 32c17 11 32 30 33 60v42c0 21-15 34-33 34s-33-13-33-34V92c1-30 16-49 33-60z" fill={main} />
          <ellipse cx="100" cy="128" rx="26" ry="20" fill={LIGHT} />
          <path d="M100 52c9 9 16 22 17 40" strokeWidth="3.5" opacity="0.45" />
        </>
      );

    case "loafer":
      // top-down view: round toe, saddle strap across the throat
      return (
        <>
          <path d="M100 38c24 0 39 21 39 54v40c0 21-16 33-39 33s-39-12-39-33V92c0-33 15-54 39-54z" fill={main} />
          <ellipse cx="100" cy="126" rx="29" ry="22" fill={LIGHT} />
          <path d="M64 96c24-11 48-11 72 0v18c-24-10-48-10-72 0z" fill={accent} />
          <path d="M90 104h20" strokeWidth="4" />
        </>
      );

    /* ---------- lingerie ---------- */
    case "lingerie":
      return (
        <>
          {/* bra, tucked behind and off to one side */}
          <path d="M104 40L92 18M142 38l-8-22" strokeWidth="6" />
          <circle cx="114" cy="58" r="20" fill={accent} />
          <circle cx="148" cy="58" r="20" fill={accent} />
          <rect x="94" y="68" width="74" height="13" rx="6" fill={accent} />
          {/* brief, front and centre */}
          <rect x="30" y="96" width="98" height="16" rx="7" fill={main} />
          <path d="M30 112h98l-10 34c-7 17-21 26-32 21-7-3-12-10-15-19-3 9-8 16-15 19-11 5-25-4-32-21z" fill={main} />
        </>
      );

    case "briefs":
      return (
        <>
          <path d="M40 62h80l-8 26c-6 13-17 20-26 16-6-2-10-8-12-15-2 7-7 13-13 15-9 4-20-3-26-16z" fill={accent} />
          <path d="M48 98h84l-8 28c-6 14-18 21-27 17-6-3-11-9-13-16-2 7-7 13-13 16-9 4-21-3-27-17z" fill={LIGHT} />
          <path d="M56 134h88l-9 30c-6 15-19 23-28 18-6-3-11-9-14-17-3 8-8 14-14 17-9 5-22-3-28-18z" fill={main} />
        </>
      );

    /* ---------- beauty ---------- */
    case "lipstick":
      return (
        <>
          <path d="M82 96V62l36-14v48z" fill={accent} />
          <rect x="76" y="94" width="48" height="16" rx="5" fill={main} />
          <rect x="80" y="108" width="40" height="54" rx="7" fill={main} />
          <path d="M80 130h40" strokeWidth="4" opacity="0.55" />
        </>
      );

    case "palette":
      return (
        <>
          <rect x="34" y="50" width="132" height="102" rx="16" fill={main} />
          <rect x="42" y="58" width="116" height="26" rx="8" fill={LIGHT} />
          <path d="M34 90h132" strokeWidth="4" />
          <g stroke={INK} strokeWidth="3.5">
            <rect x="46" y="98" width="26" height="20" rx="5" fill={LIGHT} />
            <rect x="78" y="98" width="26" height="20" rx="5" fill={accent} />
            <rect x="110" y="98" width="26" height="20" rx="5" fill="#FBEB9C" />
            <rect x="46" y="124" width="26" height="20" rx="5" fill={accent} />
            <rect x="78" y="124" width="26" height="20" rx="5" fill="#FBEB9C" />
            <rect x="110" y="124" width="26" height="20" rx="5" fill={LIGHT} />
          </g>
        </>
      );

    case "perfume":
      return (
        <>
          <rect x="84" y="50" width="32" height="22" rx="6" fill={accent} />
          <rect x="90" y="70" width="20" height="18" fill={main} />
          <rect x="62" y="86" width="76" height="74" rx="18" fill={main} />
          <rect x="76" y="106" width="48" height="30" rx="8" fill={LIGHT} opacity="0.9" />
          <path d="M124 58c10-6 18-4 22 2" strokeWidth="4" />
        </>
      );

    case "dropper":
      return (
        <>
          <path d="M90 44h20v34H90z" fill={accent} />
          <rect x="82" y="34" width="36" height="16" rx="6" fill={main} />
          <path d="M70 92c0-10 8-16 18-16h24c10 0 18 6 18 16v52c0 12-8 20-20 20H90c-12 0-20-8-20-20z" fill={main} />
          <path d="M84 104h32v32H84z" fill={LIGHT} opacity="0.9" />
          <path d="M92 118h16" strokeWidth="4" opacity="0.6" />
        </>
      );

    /* ---------- home ---------- */
    case "cup":
      return (
        <>
          <path d="M128 92c24-4 30 6 30 18s-8 22-30 20" strokeWidth="7" />
          <path d="M60 70h70l-6 78c-1 8-6 12-14 12H80c-8 0-13-4-14-12z" fill={main} />
          <path d="M60 70h70l-1.6 20H61.6z" fill={accent} />
          <path d="M76 112c8-8 16 8 24 0s16 8 24 0" strokeWidth="4" opacity="0.7" />
        </>
      );

    case "tumbler":
      return (
        <>
          <path d="M72 62h56l-6 96c-1 8-6 12-14 12H92c-8 0-13-4-14-12z" fill={main} />
          <rect x="66" y="46" width="68" height="20" rx="8" fill={accent} />
          <rect x="94" y="34" width="20" height="14" rx="5" fill={accent} />
          <path d="M78 104c8-7 16 7 22 0s14 7 22 0" strokeWidth="4" opacity="0.7" />
        </>
      );

    case "cupset":
      return (
        <>
          <path d="M40 96h44l-5 52c-1 7-5 10-11 10H56c-6 0-10-3-11-10z" fill={main} />
          <path d="M78 76h44l-5 72c-1 7-5 10-11 10H94c-6 0-10-3-11-10z" fill={accent} />
          <path d="M116 96h44l-5 52c-1 7-5 10-11 10h-12c-6 0-10-3-11-10z" fill={main} />
          <path d="M40 110h44M78 92h44M116 110h44" strokeWidth="4" opacity="0.55" />
        </>
      );

    /* ---------- accessories ---------- */
    case "sunglasses":
      return (
        <>
          <path d="M42 92H22M158 92h20" strokeWidth="6" />
          <rect x="36" y="82" width="56" height="42" rx="18" fill={main} />
          <rect x="108" y="82" width="56" height="42" rx="18" fill={main} />
          <path d="M92 94c6-6 10-6 16 0" strokeWidth="6" />
          <path d="M48 96c6-6 14-8 20-6" stroke={LIGHT} strokeWidth="5" opacity="0.8" />
        </>
      );

    case "jewelry":
      return (
        <>
          <circle cx="76" cy="112" r="34" fill="none" strokeWidth="11" stroke={main} />
          <circle cx="76" cy="112" r="34" fill="none" strokeWidth="3" stroke={INK} opacity="0.55" />
          <circle cx="132" cy="90" r="22" fill="none" strokeWidth="9" stroke={main} />
          <circle cx="132" cy="90" r="22" fill="none" strokeWidth="3" stroke={INK} opacity="0.55" />
          <circle cx="76" cy="74" r="6" fill={accent} />
          <circle cx="132" cy="66" r="5" fill={accent} />
        </>
      );

    case "hairclaw":
      return (
        <>
          <path d="M60 78l8-16 7 16M80 76l8-18 7 18M100 76l8-18 7 18M120 78l8-16 7 16" fill={accent} />
          <path d="M46 104c0-16 12-26 28-26h56c18 0 28 12 26 28l-4 24c-2 14-14 22-28 20l-60-10c-12-2-18-12-18-22z" fill={main} />
          <path d="M60 116l76 10" strokeWidth="4" opacity="0.5" />
        </>
      );

    case "cap":
      return (
        <>
          <path d="M42 118c0-38 26-62 58-62s58 24 58 62z" fill={main} />
          <path d="M38 116h124c14 0 20 10 14 20s-24 10-38 4l-96-12z" fill={accent} />
          <circle cx="100" cy="56" r="7" fill={accent} />
          <path d="M100 62v54" strokeWidth="3.5" opacity="0.45" />
          <circle cx="76" cy="96" r="7" fill={accent} />
        </>
      );

    default:
      return <circle cx="100" cy="100" r="46" fill={main} />;
  }
}
