import { HomeHero } from '@/components/hero/HomeHero';
import { CompilationGrid } from '@/components/grid/CompilationGrid';
import { getAllArtists, getAllRigs } from '@/lib/manifest';

export default function HomePage() {
  const artists = getAllArtists();
  const rigs = getAllRigs();
  return (
    <main>
      <HomeHero />
      <CompilationGrid artists={artists} rigs={rigs} />
    </main>
  );
}
