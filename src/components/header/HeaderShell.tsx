'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type ReactNode } from 'react';

const NAV = [
  { href: '/', label: 'DNA' },
  { href: '/#archive', label: 'ARCHIVE' },
  { href: '/docs', label: 'DOCS' },
  { href: '/articles', label: 'ARTICLES' },
  { href: '/about', label: 'ABOUT' },
];

export function HeaderShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const rootStyle = document.documentElement.style;
    const property = '--measured-header-h';
    const previousValue = rootStyle.getPropertyValue(property);
    const previousPriority = rootStyle.getPropertyPriority(property);
    const measure = () => {
      rootStyle.setProperty(property, `${header.getBoundingClientRect().height}px`);
    };
    measure();
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    if (observer) observer.observe(header, { box: 'border-box' });
    else window.addEventListener('resize', measure);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', measure);
      if (previousValue) rootStyle.setProperty(property, previousValue, previousPriority);
      else rootStyle.removeProperty(property);
    };
  }, []);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  const currentPage =
    pathname === '/about'
      ? 'ABOUT'
      : pathname?.startsWith('/docs')
        ? 'DOCS'
        : pathname?.startsWith('/articles')
          ? 'ARTICLES'
          : 'DNA';

  return (
    <header
      ref={headerRef}
      data-scrolled={scrolled || undefined}
      className="site-header sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--color-ink-1)]/60"
    >
      <div className="border-b hairline">
        <div className="mx-auto max-w-[1600px] px-6 flex flex-wrap content-center items-center gap-x-5 gap-y-1 sm:flex-nowrap sm:gap-8" style={{ height: 'var(--header-main-h)' }}>
          {/* No aria-label: the accessible name comes from the visible SUEDE/DNA wordmark, so the two match. */}
          <a href="https://suedeai.ai" className="flex items-center gap-3 text-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/suede-mark.svg" alt="" width={28} height={28} />
            <span className="mono text-sm tracking-[0.12em] font-medium">
              <span className="text-white">SUEDE</span>
              <span className="mx-1 text-[color:var(--color-signal)]">/</span>
              <span className="text-[color:var(--color-bone)]">DNA</span>
            </span>
          </a>
          <nav aria-label="Main navigation" className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-start sm:gap-6 mono-label">
            {NAV.map((item) => {
              const isCurrent = item.label === currentPage && item.href !== '/#archive';
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isCurrent ? 'page' : undefined}
                  className="text-white hover:text-[color:var(--color-signal)] transition-colors"
                  style={{ color: isCurrent ? 'var(--color-signal)' : undefined }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="ml-auto hidden sm:block mono-label">
            <a
              href="https://archive.org/details/guitargeek-archives"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[color:var(--color-mute-readable)] hover:text-[color:var(--color-signal)]"
            >
              SOURCE ↗
            </a>
          </div>
        </div>
      </div>
      {children}
    </header>
  );
}
