import type { NextConfig } from 'next';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ARTIST_MERGES } from './src/lib/canonical-artists';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'archive.org',
        pathname: '/download/guitargeek-archives/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  // Duplicate artist slugs from the upstream filename grammar are retired; each one
  // permanently redirects to the surviving page that now holds all of its rigs.
  async redirects() {
    return Object.entries(ARTIST_MERGES).map(([from, to]) => ({
      source: `/${from}`,
      destination: `/${to}`,
      // 301 rather than Next's default 308 for `permanent: true` — these are canonical
      // consolidations of GET-only archive pages, and 301 is what the crawlers expect.
      statusCode: 301,
    }));
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
