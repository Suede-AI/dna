import { ImageResponse } from 'next/og';
import { getStats } from '@/lib/manifest';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Suede DNA — Signal Chains, Archived';

export default async function Image() {
  const stats = getStats();
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#050b16',
          display: 'flex',
          flexDirection: 'column',
          padding: 80,
          color: '#fff',
          fontFamily: 'system-ui',
        }}
      >
        <div style={{ fontSize: 18, letterSpacing: 4, color: 'rgba(255,255,255,0.4)' }}>SUEDE / DNA</div>
        <div
          style={{
            fontSize: 120,
            fontWeight: 800,
            letterSpacing: -2,
            lineHeight: 1,
            marginTop: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span>SIGNAL CHAINS,</span>
          <span>ARCHIVED.</span>
        </div>
        <div style={{ marginTop: 32, fontSize: 22, color: 'rgba(255,255,255,0.62)', display: 'flex' }}>
          {`${stats.totalRigs} rigs · ${stats.totalArtists} artists · ${stats.yearMin}–${stats.yearMax}`}
        </div>
        <div
          style={{
            marginTop: 32,
            height: 4,
            width: '100%',
            background: 'linear-gradient(to right, rgba(34,211,238,0), #22d3ee, rgba(34,211,238,0))',
          }}
        />
      </div>
    ),
    size
  );
}
