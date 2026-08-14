import fs from 'node:fs/promises';
import path from 'node:path';

export async function getDirectorySize(dirPath: string): Promise<{ sizeBytes: number; lastModified: Date }> {
  let sizeBytes = 0;
  let maxModifiedMs = 0;

  async function walk(currentPath: string) {
    try {
      const entries = await fs.readdir(currentPath, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(currentPath, entry.name);
        try {
          const stats = await fs.stat(fullPath);
          if (stats.mtimeMs > maxModifiedMs) {
            maxModifiedMs = stats.mtimeMs;
          }
          if (stats.isDirectory()) {
            await walk(fullPath);
          } else if (stats.isFile()) {
            sizeBytes += stats.size;
          }
        } catch {
          // Ignore inaccessible files
        }
      }
    } catch {
      // Ignore inaccessible directories
    }
  }

  await walk(dirPath);
  return {
    sizeBytes,
    lastModified: maxModifiedMs > 0 ? new Date(maxModifiedMs) : new Date(),
  };
}
