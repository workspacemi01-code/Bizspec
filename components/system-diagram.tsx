/**
 * The hero visual: a business drawn the way an engineer would draw it.
 *
 * The brief rules out stock photos of handshakes, laptops and code. What is
 * left that says "business infrastructure" is a schematic of one — the systems
 * a company actually runs, hung off a single bus, with operations in the
 * middle where the work happens. Every label is a real system we implement, so
 * the picture carries information rather than decorating the page.
 *
 * Presentational, so it is hidden from assistive technology; the headline
 * beside it already says what the company does. The pulse travelling down the
 * bus is the one piece of motion on the page, and it stops for anyone who has
 * asked for reduced motion.
 */

const BUS_X = 160;
const BUS_TOP = 37;
const BUS_BOTTOM = 257;

const nodes = [
  { label: "CRM", y: 20, side: "left" as const },
  { label: "Inventory", y: 20, side: "right" as const },
  { label: "Books", y: 96, side: "left" as const },
  { label: "Desk", y: 96, side: "right" as const },
  { label: "Store", y: 240, side: "left" as const },
  { label: "Reports", y: 240, side: "right" as const },
];

const NODE_W = 92;
const NODE_H = 34;

export function SystemDiagram({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 300" className={className} role="presentation" aria-hidden fill="none">
      <defs>
        <pattern id="bs-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0v20" stroke="var(--color-line)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="320" height="300" fill="url(#bs-grid)" opacity="0.55" />

      {/* The bus. One line everything hangs off, which is the whole argument:
          the systems are not six separate purchases, they are one system. */}
      <line
        x1={BUS_X}
        y1={BUS_TOP}
        x2={BUS_X}
        y2={BUS_BOTTOM}
        stroke="var(--color-line-strong)"
        strokeWidth="2"
      />

      {nodes.map((n) => {
        const cy = n.y + NODE_H / 2;
        const x = n.side === "left" ? 8 : 220;
        const stubFrom = n.side === "left" ? x + NODE_W : x;
        return (
          <g key={`${n.label}-${n.side}`}>
            <line
              x1={stubFrom}
              y1={cy}
              x2={BUS_X}
              y2={cy}
              stroke="var(--color-line-strong)"
              strokeWidth="1.5"
            />
            {/* Junction dot, the way a schematic marks a real connection
                rather than two lines that merely cross. */}
            <circle cx={BUS_X} cy={cy} r="3" fill="var(--color-brand)" />
            <rect
              x={x}
              y={n.y}
              width={NODE_W}
              height={NODE_H}
              rx="3"
              fill="var(--color-paper)"
              stroke="var(--color-line-strong)"
              strokeWidth="1.5"
            />
            <text
              x={x + NODE_W / 2}
              y={cy + 4}
              textAnchor="middle"
              fontSize="11"
              fontFamily="var(--font-mono)"
              fill="var(--color-ink-soft)"
            >
              {n.label}
            </text>
          </g>
        );
      })}

      {/* Operations sits on the bus, not beside it. */}
      <rect
        x="84"
        y="142"
        width="152"
        height="44"
        rx="3"
        fill="var(--color-brand)"
        stroke="var(--color-brand)"
      />
      <text
        x="160"
        y="169"
        textAnchor="middle"
        fontSize="13"
        fontFamily="var(--font-mono)"
        letterSpacing="1.5"
        fill="#ffffff"
      >
        OPERATIONS
      </text>

      {/* Traffic on the bus. */}
      <circle cx={BUS_X} cy={BUS_TOP} r="3.5" fill="var(--color-brand)" className="bs-pulse" />

      <style>{`
        .bs-pulse {
          animation: bs-travel 4.5s cubic-bezier(0.6, 0, 0.4, 1) infinite;
        }
        @keyframes bs-travel {
          0%   { transform: translateY(0); opacity: 0; }
          12%  { opacity: 1; }
          88%  { opacity: 1; }
          100% { transform: translateY(${BUS_BOTTOM - BUS_TOP}px); opacity: 0; }
        }
      `}</style>
    </svg>
  );
}
