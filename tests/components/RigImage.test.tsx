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
  }: {
    src: string;
    alt: string;
    onLoad?: () => void;
    onError?: () => void;
    className?: string;
  }) => <img src={src} alt={alt} onLoad={onLoad} onError={onError} className={className} />,
}));

const rig: Rig = {
  id: 'rig-1',
  artistSlug: 'artist',
  artistName: 'Artist',
  year: 1997,
  src: 'https://archive.org/download/example/rig.jpg',
  format: 'jpg',
};

describe('RigImage', () => {
  it('renders an archive fallback when the image fails', () => {
    render(
      <div className="relative h-48 w-48">
        <RigImage rig={rig} alt="Artist rig" sizes="192px" />
      </div>
    );

    fireEvent.error(screen.getByRole('img', { name: 'Artist rig' }));

    expect(screen.getByText('SOURCE OFFLINE')).toBeInTheDocument();
    expect(screen.getByText('1997')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /open on archive\.org/i })).toHaveAttribute('href', rig.src);
  });
});
