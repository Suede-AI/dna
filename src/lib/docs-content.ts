export type DocEntry = {
  slug: string;
  title: string;
  description: string;
};

export const DOCS: DocEntry[] = [
  {
    slug: 'what-is-suede-dna',
    title: 'What Suede DNA Is',
    description:
      'The premise behind the archive: why a guitarist’s rigs form a signal chain across time, and how the site is structured around that idea.',
  },
  {
    slug: 'sourcing-and-verification',
    title: 'Sourcing and Verification',
    description:
      'Where the rig photos come from, how the manifest is built and validated, and exactly what Suede DNA does and does not verify.',
  },
  {
    slug: 'search-and-filters',
    title: 'Search and Filters',
    description:
      'How the search box parses names, years, and decades, how ranking works, and how decade filters and sort order combine.',
  },
  {
    slug: 'faq',
    title: 'FAQ',
    description:
      'Common questions about coverage, corrections, image rights, and how to reach the archive if something is wrong.',
  },
];

export function getDoc(slug: string): DocEntry | undefined {
  return DOCS.find((doc) => doc.slug === slug);
}
