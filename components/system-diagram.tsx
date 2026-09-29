/**
 * The hero visual: connected business systems, drawn rather than photographed.
 *
 * The brief rules out stock photos of handshakes, laptops and code. What is
 * left that says "business infrastructure" is the shape of one: named nodes
 * with traffic between them. Labels are real parts of the work, so the picture
 * carries information rather than decorating the page.
 *
 * Purely presentational, so it is hidden from assistive technology — the
 * headline beside it already says what the company does.
 */
export function SystemDiagram({ className = "" }: { className?: string }) {
  const nodes = [
    { x: 150, y: 44, label: "CRM" },
    { x: 40, y: 132, label: "Inventory" },
    { x: 262, y: 132, label: "Books" },
    { x: 150, y: 168, label: "Operations", primary: true },
    { x: 40, y: 258, label: "Store" },
    { x: 262, y: 258, label: "Support" },
  ];

  const links: [number, number][] = [
    [0, 3],
    [1, 3],
    [2, 3],
    [3, 4],
    [3, 5],
    [1, 4],
    [2, 5],
  ];

  return (
    <svg
      viewBox="0 0 320 320"
      className={className}
      role="presentation"
      aria-hidden
      fill="none"
    >
      {/* A quiet grid so the nodes sit on something rather than float. */}
      <defs>
        <pattern id="bs-grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0v32" stroke="var(--color-line)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="320" height="320" fill="url(#bs-grid)" opacity="0.7" />

      {links.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="var(--color-line-strong)"
          strokeWidth="1.5"
        />
      ))}

      {nodes.map((n) => (
        <g key={n.label}>
          <circle
            cx={n.x}
            cy={n.y}
            r={n.primary ? 30 : 22}
            fill={n.primary ? "var(--color-brand)" : "var(--color-paper)"}
            stroke={n.primary ? "var(--color-brand)" : "var(--color-line-strong)"}
            strokeWidth="1.5"
          />
          <text
            x={n.x}
            y={n.y + 3.5}
            textAnchor="middle"
            fontSize="9.5"
            fontFamily="var(--font-mono)"
            fill={n.primary ? "#ffffff" : "var(--color-ink-soft)"}
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
