import Link from 'next/link';

export function IndexCard({
  href,
  eyebrow,
  title,
  description,
}: {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="rig-interactive-card hairline block rounded-[var(--radius-card)] p-6"
      style={{ background: 'var(--color-ink-2)' }}
    >
      <p className="mono-label">{eyebrow}</p>
      <h2 className="mt-2 font-[820] text-white" style={{ fontSize: 'clamp(1.25rem, 1rem + 1vw, 1.75rem)' }}>
        {title}
      </h2>
      <p className="mt-3 text-[color:var(--color-bone)] leading-relaxed">{description}</p>
      <span className="rig-arrow mono-label mt-4 inline-block text-[color:var(--color-mute-readable)]">
        READ →
      </span>
    </Link>
  );
}
