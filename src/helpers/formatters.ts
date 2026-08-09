/**
 * Pure helper functions for formatting and string manipulation.
 * Zero external dependencies, highly testable and reusable.
 */

/**
 * Format bytes into human-readable sizes (KB, MB, GB).
 */
export function formatBytes(bytes: number, decimals: number = 1): string {
  if (!bytes || bytes === 0) return '0 MB';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * Format seconds into cinematic timecode (MM:SS or HH:MM:SS:FF).
 */
export function formatTimecode(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(mins)}:${pad(secs)}`;
}

/**
 * Format camera metadata into a clean display line.
 */
export function formatExif(camera?: string, lens?: string, focal?: string, aperture?: string, shutter?: string, iso?: string): string {
  const parts = [
    camera,
    lens,
    focal,
    aperture ? `ƒ/${aperture.replace('f/', '').replace('ƒ/', '')}` : undefined,
    shutter,
    iso ? `ISO ${iso.replace('ISO', '').trim()}` : undefined,
  ].filter(Boolean);

  return parts.join('  •  ');
}

/**
 * Sanitize strings for URL slugs and safe DOM IDs.
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/**
 * Filter items by category immutably.
 */
export function filterByCategory<T extends { category: string }>(items: readonly T[], category: string): T[] {
  if (!category || category.toLowerCase() === 'all' || category.toLowerCase() === 'todos') {
    return [...items];
  }
  return items.filter((item) => item.category.toLowerCase() === category.toLowerCase());
}

/**
 * Alias for video items.
 */
export function filterVideosByCategory<T extends { category: string }>(items: readonly T[], category: string): T[] {
  return filterByCategory(items, category);
}

/**
 * Calculate dynamic 5-column masonry span classes for asymmetric editorial layout.
 * Uses grid-auto-flow:dense to fill gaps automatically.
 * Pattern designed to sum to 5 columns across rows with no orphan cells.
 */
export function getMasonrySpanClass(index: number, orientation?: 'portrait' | 'landscape' | 'square'): string {
  // Simplified 6-pattern cycle that works cleanly with dense grid flow
  const pattern = index % 6;
  switch (pattern) {
    case 0:
      // 3-col x 2-row feature hero
      return 'lg:col-span-3 lg:row-span-2';
    case 1:
      // 2-col x 2-row companion portrait
      return 'lg:col-span-2 lg:row-span-2';
    case 2:
      // 3-col x 1-row panoramic strip
      return 'lg:col-span-3 lg:row-span-1';
    case 3:
      // 2-col x 1-row strip
      return 'lg:col-span-2 lg:row-span-1';
    case 4:
      // 2-col x 2-row block
      return 'lg:col-span-2 lg:row-span-2';
    case 5:
      // 3-col x 2-row statement
      return 'lg:col-span-3 lg:row-span-2';
    default:
      return 'lg:col-span-2 lg:row-span-1';
  }
}
