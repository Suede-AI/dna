import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'About Suede DNA';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#050b16',
          color: '#fff',
          fontFamily: 'system-ui',
          display: 'flex',
          flexDirection: 'column',
          padding: 80,
        }}
      >
        <div style={{ fontSize: 18, letterSpacing: 4, color: 'rgba(255,255,255,0.4)' }}>SUEDE / DNA / ABOUT</div>
        <div style={{ marginTop: 'auto', fontSize: 100, fontWeight: 800, letterSpacing: -2, lineHeight: 1 }}>
          THE METHOD.
        </div>
        <div style={{ marginTop: 32, fontSize: 22, color: 'rgba(255,255,255,0.62)' }}>
          How Suede DNA is sourced, structured, and attributed.
        </div>
      </div>
    ),
    size
  );
}
