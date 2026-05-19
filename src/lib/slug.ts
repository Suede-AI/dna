export function slugify(archiveSlug: string): string {
  return archiveSlug.replace(/_/g, '-').toLowerCase();
}

export function displayNameFromSlug(archiveSlug: string): string {
  return archiveSlug
    .split('_')
    .map((part) => (/^\d+$/.test(part) ? part : part.charAt(0).toUpperCase() + part.slice(1)))
    .join(' ');
}
