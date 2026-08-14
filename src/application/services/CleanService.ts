import fs from 'node:fs/promises';
import { DependencyDirectory } from '../../domain/types/index.js';

export interface CleanResult {
  successful: DependencyDirectory[];
  failed: Array<{ dependency: DependencyDirectory; error: string }>;
  totalBytesReclaimed: number;
}

export class CleanService {
  async cleanDependencies(dependencies: DependencyDirectory[], dryRun: boolean = false): Promise<CleanResult> {
    const successful: DependencyDirectory[] = [];
    const failed: Array<{ dependency: DependencyDirectory; error: string }> = [];
    let totalBytesReclaimed = 0;

    for (const dep of dependencies) {
      if (dryRun) {
        successful.push(dep);
        totalBytesReclaimed += dep.sizeBytes;
        continue;
      }

      try {
        await fs.rm(dep.path, { recursive: true, force: true });
        successful.push(dep);
        totalBytesReclaimed += dep.sizeBytes;
      } catch (err: any) {
        failed.push({
          dependency: dep,
          error: err?.message || 'Failed to delete directory',
        });
      }
    }

    return {
      successful,
      failed,
      totalBytesReclaimed,
    };
  }
}
