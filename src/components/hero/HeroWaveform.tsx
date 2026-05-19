export function HeroWaveform() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 80"
      preserveAspectRatio="none"
      className="absolute inset-x-0 bottom-0 w-full h-20 pointer-events-none"
      style={{ opacity: 0.4 }}
    >
      <path
        d="M0 40 Q 60 20 120 40 T 240 40 T 360 40 T 480 40 T 600 40 T 720 40 T 840 40 T 960 40 T 1080 40 T 1200 40"
        fill="none"
        stroke="var(--color-signal)"
        strokeWidth="1"
        strokeLinecap="round"
      >
        <animate
          attributeName="d"
          dur="12s"
          repeatCount="indefinite"
          values="
            M0 40 Q 60 20 120 40 T 240 40 T 360 40 T 480 40 T 600 40 T 720 40 T 840 40 T 960 40 T 1080 40 T 1200 40;
            M0 40 Q 60 60 120 40 T 240 40 T 360 40 T 480 40 T 600 40 T 720 40 T 840 40 T 960 40 T 1080 40 T 1200 40;
            M0 40 Q 60 20 120 40 T 240 40 T 360 40 T 480 40 T 600 40 T 720 40 T 840 40 T 960 40 T 1080 40 T 1200 40
          "
        />
      </path>
    </svg>
  );
}
