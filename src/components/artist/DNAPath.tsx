export type ChainNode = { x: number; y: number };
export type ChainTick = { x: number; year: number };
export type ChainLayout = { nodes: ChainNode[]; ticks: ChainTick[]; totalWidth: number };

export function computeDNAChainLayout(
  rigs: { year: number }[],
  {
    nodeWidth,
    minGap,
    maxGap,
    yearScale,
    paddingX,
    y,
  }: {
    nodeWidth: number;
    minGap: number;
    maxGap: number;
    yearScale: number;
    paddingX: number;
    y: number;
  }
): ChainLayout {
  if (rigs.length === 0) return { nodes: [], ticks: [], totalWidth: 0 };

  const nodes: ChainNode[] = [{ x: paddingX + nodeWidth / 2, y }];
  for (let i = 1; i < rigs.length; i += 1) {
    const yearGap = Math.max(1, Math.abs(rigs[i].year - rigs[i - 1].year));
    const gap = Math.min(Math.max(yearGap * yearScale, minGap), maxGap);
    nodes.push({ x: nodes[i - 1].x + nodeWidth + gap, y });
  }

  const seenYears = new Set<number>();
  const ticks = rigs.flatMap((rig, index) => {
    if (seenYears.has(rig.year)) return [];
    seenYears.add(rig.year);
    return [{ x: nodes[index].x, year: rig.year }];
  });

  return {
    nodes,
    ticks,
    totalWidth: nodes[nodes.length - 1].x + nodeWidth / 2 + paddingX,
  };
}

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
