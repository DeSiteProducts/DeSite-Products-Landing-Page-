/**
 * Conventional fixed-bar grizzly (three-quarter view), drawn to contrast with
 * ScreenerArt: welded parallel bars, no springs, no adjustment, and rock
 * lodged between the bars the way the research brief describes.
 * Deliberately drawn in plain steel greys — no brand accent.
 */
export default function GrizzlyArt({ className = "" }: { className?: string }) {
  const id = "grizzly-art";

  const A = [110, 166];
  const u = [196, -40]; // down the slope, toward the high end
  const v = [70, 30]; // toward the viewer
  const pt = (a: number, b: number) => [
    A[0] + u[0] * a + v[0] * b,
    A[1] + u[1] * a + v[1] * b,
  ];
  const poly = (...ps: readonly (readonly number[])[]) =>
    ps.map((p) => p.join(",")).join(" ");

  const B = pt(1, 0);
  const C = pt(1, 1);
  const D = pt(0, 1);

  // Barras paralelas corriendo pendiente abajo, con hueco entre ellas.
  const bars: string[] = [];
  for (let j = 1; j < 6; j++) {
    const [x1, y1] = pt(0, j / 6);
    const [x2, y2] = pt(1, j / 6);
    bars.push(`M${x1} ${y1}L${x2} ${y2}`);
  }

  return (
    <svg
      viewBox="0 0 440 280"
      className={className}
      role="img"
      aria-label="Conventional fixed-bar grizzly screen illustration"
    >
      <defs>
        <linearGradient id={`${id}-steel`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#39424f" />
          <stop offset="100%" stopColor="#1b212b" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6b7a94" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#6b7a94" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="220" cy="150" rx="200" ry="120" fill={`url(#${id}-glow)`} />

      {/* Cucharón descargando */}
      <g transform="rotate(-14 190 44) scale(0.8) translate(24 6)">
        <path
          d="M118 14h108v26a26 26 0 0 1-26 26h-56a26 26 0 0 1-26-26Z"
          fill={`url(#${id}-steel)`}
          stroke="#4a5568"
          strokeWidth="3"
        />
        <path d="M124 62h96" stroke="#6b7a94" strokeWidth="4" strokeLinecap="round" />
      </g>
      <g fill="#5b6675">
        <rect x="196" y="82" width="15" height="11" rx="3" transform="rotate(-14 203 87)" />
        <rect x="224" y="98" width="11" height="9" rx="3" transform="rotate(16 229 102)" />
      </g>

      {/* Marco soldado, sin suspensión */}
      <polygon points={poly(A, B, C, D)} fill="#11161f" stroke="#4a5568" strokeWidth="2.5" />

      {/* Barras fijas */}
      <g stroke="#6b7a94" strokeWidth="6" strokeLinecap="round">
        {bars.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>

      {/* Roca atorada entre las barras */}
      <g fill="#3a3a3a" stroke="#565656" strokeWidth="1.5">
        <path d="M196 132l17-9 15 8-4 15-19 3Z" />
        <path d="M247 148l14-8 13 7-4 13-16 2Z" />
        <path d="M158 152l12-7 11 6-3 11-14 2Z" />
      </g>

      {/* Patas soldadas con cartelas, sin resortes */}
      <g stroke="#4a5568" strokeWidth="7" strokeLinecap="round">
        <path d={`M${D[0] - 6} ${D[1]}V252`} />
        <path d={`M${C[0] - 8} ${C[1]}V252`} />
        <path d={`M${A[0] + 5} ${A[1]}V248`} strokeOpacity="0.5" />
        <path d={`M${B[0] - 5} ${B[1]}V248`} strokeOpacity="0.5" />
      </g>
      <path
        d={`M${D[0] - 6} ${D[1] + 46}L${C[0] - 8} ${C[1] + 46}`}
        stroke="#4a5568"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <g fill="#4a5568">
        <path d={`M${D[0] - 6} ${D[1]}l16 0l-16 16Z`} />
        <path d={`M${C[0] - 8} ${C[1]}l16 0l-16 16Z`} />
      </g>

      {/* Material que sí pasó */}
      <path
        d="M150 256c24-30 72-33 100-11 16 13 39 14 54 4Z"
        fill="#252525"
        stroke="#3a3a3a"
        strokeWidth="1.5"
      />

      <path d="M20 258h400" stroke="#252525" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
