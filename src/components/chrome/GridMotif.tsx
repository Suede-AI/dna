export function GridMotif() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        backgroundImage:
          'linear-gradient(to right, var(--color-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
      }}
    >
      <div
        className="absolute inset-x-0 bottom-0 h-[200px]"
        style={{
          background: 'linear-gradient(to top, var(--color-signal-glow), transparent)',
          opacity: 0.18,
        }}
      />
    </div>
  );
}
