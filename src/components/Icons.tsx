type IconProps = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const IconSearch = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </svg>
);

export const IconBag = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
    <path d="M4 8h16l-1.2 12H5.2z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
);

export const IconHeart = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
    <path d="M12 20s-7-4.4-7-9.2A4 4 0 0 1 12 8a4 4 0 0 1 7 2.8C19 15.6 12 20 12 20z" />
  </svg>
);

export const IconUser = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
    <circle cx="12" cy="8.5" r="3.5" />
    <path d="M5 20c1.2-3.6 4-5.2 7-5.2s5.8 1.6 7 5.2" />
  </svg>
);

export const IconMenu = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const IconClose = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const IconArrow = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);

export const IconChevron = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
    <path d="M8 5l7 7-7 7" />
  </svg>
);

export const IconPlus = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IconMinus = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
    <path d="M5 12h14" />
  </svg>
);

export const IconCheck = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7" />
  </svg>
);

export const IconTruck = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
    <path d="M2 7h11v9H2zM13 10h4.5l3 3.5V16H13z" />
    <circle cx="6.5" cy="18" r="1.8" />
    <circle cx="17.5" cy="18" r="1.8" />
  </svg>
);

export const IconShield = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
    <path d="M12 3l7 3v5.5c0 4.3-3 7.7-7 9-4-1.3-7-4.7-7-9V6z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

export const IconReturn = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
    <path d="M4 9h10a5 5 0 0 1 0 10H8" />
    <path d="M7 5L3.5 9 7 13" />
  </svg>
);

export const IconStar = ({ className, filled = true }: IconProps & { filled?: boolean }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round">
    <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1.1 5.9L12 17l-5.3 2.7 1.1-5.9-4.3-4.1 5.9-.8z" />
  </svg>
);

export const IconSparkle = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
    <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z" />
  </svg>
);

export const IconWave = ({ className }: IconProps) => (
  <svg viewBox="0 0 120 20" className={className} {...base} strokeWidth={3} aria-hidden="true">
    <path d="M2 12c8-10 16 10 24 0s16 10 24 0 16 10 24 0 16 10 24 0" />
  </svg>
);
