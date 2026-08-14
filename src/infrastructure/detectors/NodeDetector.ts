import fs from 'node:fs/promises';
import path from 'node:path';
import { ProjectDetector } from './ProjectDetector.js';
import { Project, ProjectLanguage } from '../../domain/types/index.js';
import { getDirectorySize } from '../filesystem/DirectorySize.js';

export class NodeDetector implements ProjectDetector {
  language: ProjectLanguage = 'javascript';

  async detect(dirPath: string): Promise<Project | null> {
    const packageJsonPath = path.join(dirPath, 'package.json');
    try {
      await fs.access(packageJsonPath);
    } catch {
      return null;
    }

    const nodeModulesPath = path.join(dirPath, 'node_modules');
    let hasNodeModules = false;
    try {
      const stats = await fs.stat(nodeModulesPath);
      hasNodeModules = stats.isDirectory();
    } catch {
      hasNodeModules = false;
    }

    const projectName = path.basename(dirPath);
    const dependencies = [];
    let totalSizeBytes = 0;
    let lastActive = new Date();

    if (hasNodeModules) {
      const { sizeBytes, lastModified } = await getDirectorySize(nodeModulesPath);
      totalSizeBytes = sizeBytes;
      lastActive = lastModified;
      dependencies.push({
        id: `node-${dirPath}`,
        path: nodeModulesPath,
        name: 'node_modules',
        type: 'node_modules' as const,
        sizeBytes,
        projectPath: dirPath,
        lastModified,
      });
    }

    return {
      id: `proj-${dirPath}`,
      name: projectName,
      path: dirPath,
      language: this.language,
      dependencies,
      totalSizeBytes,
      lastActive,
    };
  }
}
