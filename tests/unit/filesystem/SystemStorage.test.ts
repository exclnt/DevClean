import { describe, it, expect } from 'vitest';
import { getRealSystemStorage } from '../../../src/infrastructure/filesystem/SystemStorage.js';

describe('SystemStorage integration test', () => {
  it('should fetch real storage disk space for current working directory', async () => {
    const storage = await getRealSystemStorage();
    expect(storage.totalBytes).toBeGreaterThan(0);
    expect(storage.freeBytes).toBeGreaterThan(0);
    expect(storage.usedBytes).toBeGreaterThan(0);
    expect(storage.totalBytes).toBeGreaterThanOrEqual(storage.freeBytes);
  });
});
