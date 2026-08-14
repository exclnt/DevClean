import { DirectoryScanner, ScanOptions } from '../../infrastructure/filesystem/DirectoryScanner.js';
import { getRealSystemStorage, SystemStorageInfo } from '../../infrastructure/filesystem/SystemStorage.js';
import { Project, StorageOverview } from '../../domain/types/index.js';

export class ScanService {
  private scanner: DirectoryScanner;

  constructor() {
    this.scanner = new DirectoryScanner();
  }

  async scanProjects(rootDir: string, options?: ScanOptions): Promise<Project[]> {
    return this.scanner.scan(rootDir, options);
  }

  async calculateOverview(
    projects: Project[],
    targetPath: string = process.cwd(),
    systemStorage?: SystemStorageInfo
  ): Promise<StorageOverview> {
    let reclaimableBytes = 0;
    const reclaimableByEcosystem = {
      javascript: { bytes: 0, projectCount: 0 },
      typescript: { bytes: 0, projectCount: 0 },
      python: { bytes: 0, projectCount: 0 },
      php: { bytes: 0, projectCount: 0 },
      rust: { bytes: 0, projectCount: 0 },
    };

    for (const project of projects) {
      if (project.dependencies.length > 0) {
        reclaimableBytes += project.totalSizeBytes;
        if (reclaimableByEcosystem[project.language]) {
          reclaimableByEcosystem[project.language].bytes += project.totalSizeBytes;
          reclaimableByEcosystem[project.language].projectCount++;
        }
      }
    }

    const realStorage = systemStorage || (await getRealSystemStorage(targetPath));

    return {
      totalBytes: realStorage.totalBytes,
      usedBytes: realStorage.usedBytes,
      freeBytes: realStorage.freeBytes,
      reclaimableBytes,
      reclaimableByEcosystem,
    };
  }
}
