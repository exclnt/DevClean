import fs from 'node:fs/promises';
import path from 'node:path';
import { ProjectDetector } from './ProjectDetector.js';
import { Project, ProjectLanguage, DependencyDirectory } from '../../domain/types/index.js';
import { getDirectorySize } from '../filesystem/DirectorySize.js';

export class PHPDetector implements ProjectDetector {
  language: ProjectLanguage = 'php';

  async detect(dirPath: string): Promise<Project | null> {
    const composerJsonPath = path.join(dirPath, 'composer.json');
    try {
      await fs.access(composerJsonPath);
    } catch {
      return null;
    }

    const vendorPath = path.join(dirPath, 'vendor');
    const dependencies: DependencyDirectory[] = [];
    let totalSizeBytes = 0;
    let lastActive = new Date();

    try {
      const stats = await fs.stat(vendorPath);
      if (stats.isDirectory()) {
        const { sizeBytes, lastModified } = await getDirectorySize(vendorPath);
        totalSizeBytes = sizeBytes;
        lastActive = lastModified;
        dependencies.push({
          id: `php-${vendorPath}`,
          path: vendorPath,
          name: 'vendor',
          type: 'vendor' as const,
          sizeBytes,
          projectPath: dirPath,
          lastModified,
        });
      }
    } catch {
      // Vendor directory does not exist
    }

    return {
      id: `proj-${dirPath}`,
      name: path.basename(dirPath),
      path: dirPath,
      language: this.language,
      dependencies,
      totalSizeBytes,
      lastActive,
    };
  }
}
