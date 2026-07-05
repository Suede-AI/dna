'use client';

import { useEffect, useRef, useState } from 'react';

export function useRevealOnScroll<T extends HTMLElement>(staggerMs = 0) {
  const ref = useRef<T>(null);
  const [armed, setArmed] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    setArmed(true);
    if (!node || typeof IntersectionObserver === 'undefined') {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return {
    ref,
    className: armed ? `reveal-on-scroll ${revealed ? 'is-revealed' : ''}` : '',
    style: { transitionDelay: `${Math.min(staggerMs, 120)}ms` },
  };
}
