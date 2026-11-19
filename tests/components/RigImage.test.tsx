/* eslint-disable @next/next/no-img-element */
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { RigImage } from '../../src/components/media/RigImage';
import type { Rig } from '../../src/lib/manifest';

vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    onLoad,
    onError,
    className,
    unoptimized,
    width,
    height,
  }: {
    src: string;
    alt: string;
    onLoad?: () => void;
    onError?: () => void;
    className?: string;
    unoptimized?: boolean;
    width?: number;
    height?: number;
  }) => <img src={src} alt={alt} width={width} height={height} onLoad={onLoad} onError={onError} className={className} data-unoptimized={String(unoptimized)} />,
}));

const rig: Rig = {
  id: 'rig-1',
  artistSlug: 'artist',
  artistName: 'Artist',
  year: 1997,
  src: 'https://archive.org/download/guitargeek-archives/eric_clapton_1989.jpg',
  format: 'jpg',
};

describe('RigImage', () => {
  it('keeps ordinary Archive.org rigs optimized for thumbnail sizes', () => {
    render(<RigImage rig={rig} alt="Artist rig" sizes="192px" width={192} height={144} />);

    expect(screen.getByRole('img', { name: 'Artist rig' })).toHaveAttribute('data-unoptimized', 'false');
  });

  it('emits explicit dimensions and pins the image to its sized slot', () => {
    render(<RigImage rig={rig} alt="Artist rig" sizes="192px" width={192} height={144} />);

    const img = screen.getByRole('img', { name: 'Artist rig' });
    expect(img).toHaveAttribute('width', '192');
    expect(img).toHaveAttribute('height', '144');
    expect(img).toHaveClass('absolute', 'inset-0', 'h-full', 'w-full');
  });

  it.each([
    'melvins_buzzo_2001.png',
    'mightylemondrops_dave_1990.png',
  ])('serves the confirmed optimizer failure %s directly', (filename) => {
    render(<RigImage rig={{ ...rig, src: `https://archive.org/download/guitargeek-archives/${filename}` }} alt="Artist rig" sizes="192px" width={192} height={144} />);

    expect(screen.getByRole('img', { name: 'Artist rig' })).toHaveAttribute('data-unoptimized', 'true');
  });

  it('keeps GIF rigs unoptimized', () => {
    render(<RigImage rig={{ ...rig, format: 'gif', src: 'https://archive.org/download/example/rig.gif' }} alt="Artist rig" sizes="192px" width={192} height={144} />);

    expect(screen.getByRole('img', { name: 'Artist rig' })).toHaveAttribute('data-unoptimized', 'true');
  });

  it('renders an archive fallback when the image fails', () => {
    render(
      <div className="relative h-48 w-48">
        <RigImage rig={rig} alt="Artist rig" sizes="192px" width={192} height={144} />
      </div>
    );

    fireEvent.error(screen.getByRole('img', { name: 'Artist rig' }));

    expect(screen.getByText('SOURCE OFFLINE')).toBeInTheDocument();
    expect(screen.getByText('1997')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /open on archive\.org/i })).toHaveAttribute('href', rig.src);
  });
});
