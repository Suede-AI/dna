import Link from 'next/link';
import { HeaderTicker } from './HeaderTicker';

const NAV = [
  { href: '/', label: 'DNA' },
  { href: '/#archive', label: 'ARCHIVE' },
  { href: '/about', label: 'ABOUT' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--color-ink-1)]/60">
      <div className="border-b hairline">
        <div className="mx-auto max-w-[1600px] h-16 px-6 flex items-center gap-8">
          <Link href="/" aria-label="Suede home" className="text-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/suede-mark.svg" alt="" width={28} height={28} />
          </Link>
          <nav aria-label="Main navigation" className="flex items-center gap-6 mono-label">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white hover:text-[color:var(--color-signal)] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto mono-label">
            <a
              href="https://archive.org/details/guitargeek-archives"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[color:var(--color-mute)] hover:text-[color:var(--color-signal)]"
            >
              SOURCE ↗
            </a>
          </div>
        </div>
      </div>
      <HeaderTicker />
    </header>
  );
}
