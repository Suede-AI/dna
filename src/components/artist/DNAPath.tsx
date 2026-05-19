export type ChainNode = { x: number; y: number };

export function computeDNAPath(nodes: ChainNode[]): string {
  if (nodes.length === 0) return '';
  if (nodes.length === 1) return `M ${nodes[0].x} ${nodes[0].y}`;

  let d = `M ${nodes[0].x} ${nodes[0].y}`;
  for (let i = 1; i < nodes.length; i++) {
    const a = nodes[i - 1];
    const b = nodes[i];
    const dx = (b.x - a.x) * 0.5;
    const c1x = a.x + dx;
    const c1y = a.y;
    const c2x = b.x - dx;
    const c2y = b.y;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${b.x} ${b.y}`;
  }
  return d;
}

export function DNAPath({ nodes }: { nodes: ChainNode[] }) {
  const d = computeDNAPath(nodes);
  if (!d || nodes.length < 2) return null;
  const minX = Math.min(...nodes.map((n) => n.x));
  const maxX = Math.max(...nodes.map((n) => n.x));
  const minY = Math.min(...nodes.map((n) => n.y));
  const maxY = Math.max(...nodes.map((n) => n.y));
  return (
    <svg
      aria-hidden
      viewBox={`${minX - 20} ${minY - 20} ${maxX - minX + 40} ${maxY - minY + 40}`}
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full pointer-events-none"
    >
      <path d={d} fill="none" stroke="var(--color-signal)" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}
