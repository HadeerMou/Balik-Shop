type FishProps = {
  className?: string;
  body?: string;
  fin?: string;
  stroke?: string;
  strokeWidth?: number;
};

/** The Balık fish, rebuilt as vector so it scales anywhere in the UI. */
export function Fish({
  className,
  body = "#4FB6F0",
  fin = "#AFE2F9",
  stroke = "#0F3557",
  strokeWidth = 0,
}: FishProps) {
  return (
    <svg viewBox="0 0 120 72" className={className} fill="none" aria-hidden="true">
      <g stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round">
        {/* tail */}
        <path
          d="M92 36c0-10 9-21 18-24 4-1 7 2 6 6-2 7-2 29 0 36 1 4-2 7-6 6-9-3-18-14-18-24z"
          fill={body}
        />
        {/* body */}
        <path
          d="M8 36C8 18 27 4 52 4c24 0 44 14 44 32S76 68 52 68C27 68 8 54 8 36z"
          fill={body}
        />
        {/* cheek highlight */}
        <path d="M40 46c0-7 6-13 13-13s13 6 13 13-6 12-13 12-13-5-13-12z" fill={fin} opacity="0.95" />
        {/* gill lines */}
        <path d="M74 20c6 9 6 23 0 32M84 24c4 7 4 17 0 24" stroke={stroke} strokeWidth="4" strokeLinecap="round" />
        {/* top fin */}
        <path d="M44 6c8-7 20-9 26-4-8 1-18 4-26 4z" fill={fin} />
        {/* eye */}
        <circle cx="30" cy="30" r="5" fill={stroke} />
      </g>
    </svg>
  );
}

export function FishOutline({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 72" className={className} fill="none" aria-hidden="true">
      <path
        d="M8 36C8 18 27 4 52 4c24 0 44 14 44 32S76 68 52 68C27 68 8 54 8 36z"
        stroke="currentColor"
        strokeWidth="5"
      />
      <path
        d="M92 36c0-10 9-21 18-24 4-1 7 2 6 6-2 7-2 29 0 36 1 4-2 7-6 6-9-3-18-14-18-24z"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <circle cx="30" cy="30" r="4" fill="currentColor" />
    </svg>
  );
}
