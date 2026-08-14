import fs from 'node:fs/promises';
import path from 'node:path';
import { ProjectDetector } from './ProjectDetector.js';
import { Project, ProjectLanguage, DependencyDirectory } from '../../domain/types/index.js';
import { getDirectorySize } from '../filesystem/DirectorySize.js';

export class PythonDetector implements ProjectDetector {
  language: ProjectLanguage = 'python';

  async detect(dirPath: string): Promise<Project | null> {
    const pyprojectPath = path.join(dirPath, 'pyproject.toml');
    const reqTxtPath = path.join(dirPath, 'requirements.txt');
    const pipfilePath = path.join(dirPath, 'Pipfile');

    let isPythonProject = false;
    for (const marker of [pyprojectPath, reqTxtPath, pipfilePath]) {
      try {
        await fs.access(marker);
        isPythonProject = true;
        break;
      } catch {
        // continue
      }
    }

    if (!isPythonProject) return null;

    const venvPaths = [
      { name: '.venv', path: path.join(dirPath, '.venv'), type: '.venv' as const },
      { name: 'venv', path: path.join(dirPath, 'venv'), type: 'venv' as const },
    ];

    const dependencies: DependencyDirectory[] = [];
    let totalSizeBytes = 0;
    let lastActive = new Date();

    for (const item of venvPaths) {
      try {
        const stats = await fs.stat(item.path);
        if (stats.isDirectory()) {
          const { sizeBytes, lastModified } = await getDirectorySize(item.path);
          totalSizeBytes += sizeBytes;
          if (lastModified > lastActive) lastActive = lastModified;
          dependencies.push({
            id: `py-${item.path}`,
            path: item.path,
            name: item.name,
            type: item.type,
            sizeBytes,
            projectPath: dirPath,
            lastModified,
          });
        }
      } catch {
        // Not found
      }
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
