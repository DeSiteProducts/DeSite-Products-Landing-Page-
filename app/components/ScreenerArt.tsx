type Variant = "slg108" | "slg78" | "slg56";

type Props = {
  variant: Variant;
  className?: string;
};

/**
 * Vector illustration of a DeSite SLG screener (three-quarter view).
 * These machines have no engine and no undercarriage: a tilting mesh deck on a
 * sprung frame, loaded straight from a bucket. Swap for real photography when
 * it is available.
 */
const sizes = {
  slg108: {
    label: "SLG 108",
    accent: "#7fcfff",
    A: [95, 160],
    u: [230, -46],
    v: [78, 34],
    wall: 34,
    cols: 9,
    bucket: 1,
    wheels: false,
  },
  slg78: {
    label: "SLG 78",
    accent: "#38B6FF",
    A: [120, 168],
    u: [180, -36],
    v: [64, 28],
    wall: 26,
    cols: 7,
    bucket: 0.74,
    wheels: false,
  },
  slg56: {
    label: "SLG 56",
    accent: "#1d9ae6",
    A: [140, 172],
    u: [150, -30],
    v: [54, 24],
    wall: 16,
    cols: 6,
    bucket: 0.58,
    wheels: true,
  },
} as const;

export default function ScreenerArt({ variant, className = "" }: Props) {
  const id = `sa-${variant}`;
  const { label, accent, A, u, v, wall, cols, bucket, wheels } = sizes[variant];

  const pt = (a: number, b: number) => [A[0] + u[0] * a + v[0] * b, A[1] + u[1] * a + v[1] * b];
  const poly = (...ps: readonly (readonly number[])[]) =>
    ps.map((p) => p.join(",")).join(" ");

  const B = pt(1, 0);
  const C = pt(1, 1);
  const D = pt(0, 1);

  const mesh: string[] = [];
  for (let i = 1; i < cols; i++) {
    const [x1, y1] = pt(i / cols, 0);
    const [x2, y2] = pt(i / cols, 1);
    mesh.push(`M${x1} ${y1}L${x2} ${y2}`);
  }
  for (let j = 1; j < 4; j++) {
    const [x1, y1] = pt(0, j / 4);
    const [x2, y2] = pt(1, j / 4);
    mesh.push(`M${x1} ${y1}L${x2} ${y2}`);
  }

  // Rubber skirts hanging off the near edge (SLG 56).
  const skirts: string[] = [];
  for (let i = 0; i <= 6; i++) {
    const [x, y] = pt(i / 6, 1);
    skirts.push(`M${x} ${y}v9`);
  }

  const legFoot = wheels ? 232 : 255;

  return (
    <svg viewBox="0 0 440 280" className={className} role="img" aria-label={`DeSite ${label} screener illustration`}>
      <defs>
        <linearGradient id={`${id}-deck`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0a3178" />
          <stop offset="100%" stopColor="#041a41" />
        </linearGradient>
        <linearGradient id={`${id}-steel`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2f3b52" />
          <stop offset="100%" stopColor="#161d2b" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.3" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="220" cy="150" rx="200" ry="120" fill={`url(#${id}-glow)`} />

      {/* Bucket tipping material onto the deck */}
      <g transform={`rotate(-14 190 44) scale(${bucket}) translate(${(1 - bucket) * 120} ${(1 - bucket) * 30})`}>
        <path
          d="M118 14h108v26a26 26 0 0 1-26 26h-56a26 26 0 0 1-26-26Z"
          fill={`url(#${id}-steel)`}
          stroke="#4a5568"
          strokeWidth="3"
        />
        <path d="M124 62h96" stroke={accent} strokeWidth="4" strokeLinecap="round" />
      </g>
      <g fill={accent} fillOpacity="0.85">
        <rect x="196" y="80" width="15" height="11" rx="3" transform="rotate(-14 203 85)" />
        <rect x="222" y="96" width="11" height="9" rx="3" transform="rotate(16 227 100)" />
        <rect x="188" y="104" width="13" height="10" rx="3" transform="rotate(-24 194 109)" />
      </g>

      {/* Riser box walls along the two upper edges */}
      <polygon
        points={poly(A, B, [B[0], B[1] - wall], [A[0], A[1] - wall])}
        fill="#161d2b"
        stroke="#4a5568"
        strokeWidth="2.5"
      />
      <polygon
        points={poly(B, C, [C[0], C[1] - wall], [B[0], B[1] - wall])}
        fill={`url(#${id}-steel)`}
        stroke="#4a5568"
        strokeWidth="2.5"
      />

      {/* Screen deck with square mesh */}
      <polygon points={poly(A, B, C, D)} fill={`url(#${id}-deck)`} stroke={accent} strokeOpacity="0.6" strokeWidth="2.5" />
      <g stroke={accent} strokeOpacity="0.55" strokeWidth="1.6">
        {mesh.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>

      {/* Rubber deck skirts */}
      {wheels && (
        <g stroke="#252525" strokeWidth="4" strokeLinecap="round">
          {skirts.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
      )}

      {/* Screened material falling through — drawn under the frame */}
      <path
        d={
          wheels
            ? "M196 256c18-24 52-27 72-9 12 10 27 11 38 4Z"
            : "M138 256c26-34 78-38 108-12 17 15 42 16 58 4Z"
        }
        fill="#252525"
        stroke="#3a3a3a"
        strokeWidth="1.5"
      />
      <path
        d={wheels ? "M222 251c8-9 20-10 28-3" : "M172 250c11-12 27-13 38-4"}
        stroke={accent}
        strokeOpacity="0.45"
        strokeWidth="1.5"
        fill="none"
      />

      {/* Spring suspension on the two near corners */}
      <g stroke="#6b7a94" strokeWidth="2.5" fill="none" strokeLinecap="round">
        {[D, C].map(([x, y]) => (
          <path key={x} d={`M${x - 6} ${y}v5l-8 4l16 5l-16 5l16 5l-8 4v5`} />
        ))}
      </g>

      {/* Frame legs and rail */}
      <g stroke="#4a5568" strokeWidth="7" strokeLinecap="round">
        <path d={`M${D[0] - 6} ${D[1] + 33}V${legFoot}`} />
        <path d={`M${C[0] - 8} ${C[1] + 33}V${legFoot}`} />
        <path d={`M${A[0] + 5} ${A[1]}V${legFoot - 3}`} strokeOpacity="0.5" />
        <path d={`M${B[0] - 5} ${B[1]}V${legFoot - 3}`} strokeOpacity="0.5" />
      </g>
      <path
        d={`M${D[0] - 6} ${D[1] + 46}L${C[0] - 8} ${C[1] + 46}`}
        stroke="#4a5568"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Removable wheels and quick-disconnect hitch (SLG 56) */}
      {wheels && (
        <g>
          <path d={`M${D[0] - 6} ${legFoot}L96 250`} stroke="#4a5568" strokeWidth="6" strokeLinecap="round" />
          <path d="M96 250l-14-6v12Z" fill="#4a5568" />
          {[
            [D[0] - 6, legFoot],
            [C[0] - 8, legFoot],
          ].map(([x]) => (
            <g key={x}>
              <circle cx={x} cy={245} r={14} fill="#161d2b" stroke="#4a5568" strokeWidth="3" />
              <circle cx={x} cy={245} r={5} fill="#2f3b52" />
            </g>
          ))}
        </g>
      )}

      {/* Ground line */}
      <path d="M20 258h400" stroke="#252525" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
