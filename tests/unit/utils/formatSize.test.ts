import { describe, it, expect } from 'vitest';
import { formatSize } from '../../../src/utils/formatSize.js';

describe('formatSize utility', () => {
  it('should format 0 bytes correctly', () => {
    expect(formatSize(0)).toBe('0 B');
  });

  it('should format bytes correctly', () => {
    expect(formatSize(500)).toBe('500 B');
  });

  it('should format KB correctly', () => {
    expect(formatSize(1024)).toBe('1.00 KB');
    expect(formatSize(1536)).toBe('1.50 KB');
  });

  it('should format MB correctly', () => {
    expect(formatSize(1048576)).toBe('1.00 MB');
    expect(formatSize(1048576 * 2.5)).toBe('2.50 MB');
  });

  it('should format GB correctly', () => {
    expect(formatSize(1073741824)).toBe('1.00 GB');
  });
});
