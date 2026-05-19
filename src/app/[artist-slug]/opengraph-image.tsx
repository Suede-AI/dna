import { ImageResponse } from 'next/og';
import { getArtistBySlug, getRigsByArtistSlug } from '@/lib/manifest';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Suede DNA artist page';

export default async function Image({ params }: { params: Promise<{ 'artist-slug': string }> }) {
  const { 'artist-slug': artistSlug } = await params;
  const artist = getArtistBySlug(artistSlug);
  if (!artist) {
    return new ImageResponse(<div style={{ background: '#050b16', width: '100%', height: '100%' }} />, size);
  }
  const firstRig = getRigsByArtistSlug(artist.slug)[0];
  let imgData: string | null = null;
  if (firstRig) {
    try {
      const res = await fetch(firstRig.src);
      if (res.ok) {
        const buf = Buffer.from(await res.arrayBuffer());
        imgData = `data:image/${firstRig.format};base64,${buf.toString('base64')}`;
      }
    } catch {
      imgData = null;
    }
  }
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', background: '#050b16', display: 'flex', color: '#fff', fontFamily: 'system-ui' }}>
        <div style={{ width: '50%', height: '100%', display: 'flex' }}>
          {imgData ? (
            <img src={imgData} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', background: '#09101b' }} />
          )}
        </div>
        <div style={{ width: '50%', padding: 60, display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 18, letterSpacing: 4, color: 'rgba(255,255,255,0.4)' }}>SUEDE / DNA</div>
          <div
            style={{
              marginTop: 'auto',
              fontSize: 84,
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 1,
            }}
          >
            {artist.name}
          </div>
          <div style={{ marginTop: 24, fontSize: 22, color: 'rgba(255,255,255,0.62)', display: 'flex' }}>
            {`${artist.count} rigs · ${artist.yearMin}–${artist.yearMax}`}
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
      </div>
    ),
    size
  );
}
