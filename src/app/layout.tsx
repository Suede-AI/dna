import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Suede DNA',
  description: 'Signal chains, archived.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
