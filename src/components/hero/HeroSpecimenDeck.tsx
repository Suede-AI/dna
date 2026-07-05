import Link from 'next/link';
import { RigImage } from '../media/RigImage';
import type { Rig } from '@/lib/manifest';

export function HeroSpecimenDeck({ rigs }: { rigs: Rig[] }) {
  if (rigs.length === 0) return null;

  return (
    <aside className="hero-specimen-deck" aria-label="Selected signal chain specimens">
      {rigs.map((rig, index) => (
        <Link
          key={rig.id}
          href={`/${rig.artistSlug}#rig-${rig.year}`}
          className={`hero-specimen hero-specimen--${index === 0 ? 'lead' : 'support'} rig-interactive-card`}
        >
          <div className="hero-specimen__meta">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <span>{rig.year}</span>
          </div>
          <figure className="hero-specimen__figure">
            <RigImage
              rig={rig}
              alt={`${rig.artistName} guitar rig setup, ${rig.year} — Guitar Geek archive`}
              priority={index === 0}
              sizes={index === 0 ? '(min-width: 1024px) 44vw, 92vw' : '(min-width: 1024px) 24vw, 46vw'}
              className="object-contain"
            />
          </figure>
          <div className="hero-specimen__caption">
            <span>{rig.artistName}</span>
            <span className="rig-arrow">OPEN DNA →</span>
          </div>
        </Link>
      ))}
    </aside>
  );
}
