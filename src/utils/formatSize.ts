/**
 * Formats a byte size into human-readable string (e.g. 1024 -> "1.00 KB")
 */
export function formatSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const num = bytes / Math.pow(k, i);
  return `${num.toFixed(i === 0 ? 0 : 2)} ${sizes[i]}`;
}
