/**
 * Pure functions to parse HTTP Range headers and calculate byte slices
 * for video streaming without memory bloat.
 */

export interface RangeResult {
  start: number;
  end: number;
  chunkSize: number;
  contentRange: string;
  isPartial: boolean;
}

/**
 * Parse an HTTP Range header string (e.g. "bytes=0-1048576") against total file size.
 */
export function parseRange(rangeHeader: string | null | undefined, totalSize: number, defaultChunkSize: number = 1024 * 1024 * 4): RangeResult {
  if (!rangeHeader || !rangeHeader.startsWith('bytes=')) {
    // Return full stream or first chunk
    const end = Math.min(defaultChunkSize - 1, totalSize - 1);
    const chunkSize = end + 1;
    return {
      start: 0,
      end,
      chunkSize,
      contentRange: `bytes 0-${end}/${totalSize}`,
      isPartial: false,
    };
  }

  const parts = rangeHeader.replace(/bytes=/, '').split('-');
  const start = parseInt(parts[0], 10);
  let end = parts[1] ? parseInt(parts[1], 10) : start + defaultChunkSize;

  if (isNaN(start)) {
    return {
      start: 0,
      end: Math.min(defaultChunkSize - 1, totalSize - 1),
      chunkSize: Math.min(defaultChunkSize, totalSize),
      contentRange: `bytes 0-${Math.min(defaultChunkSize - 1, totalSize - 1)}/${totalSize}`,
      isPartial: true,
    };
  }

  if (end >= totalSize) {
    end = totalSize - 1;
  }

  const chunkSize = end - start + 1;

  return {
    start,
    end,
    chunkSize,
    contentRange: `bytes ${start}-${end}/${totalSize}`,
    isPartial: true,
  };
}

/**
 * Determine MIME type safely from file extension.
 */
export function getMimeType(filePath: string): string {
  const ext = filePath.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'mp4':
      return 'video/mp4';
    case 'mov':
      return 'video/quicktime';
    case 'webm':
      return 'video/webm';
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'webp':
      return 'image/webp';
    default:
      return 'application/octet-stream';
  }
}
