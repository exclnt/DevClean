import fs from 'node:fs/promises';
import path from 'node:path';
import { ProjectDetector } from '../detectors/ProjectDetector.js';
import { NodeDetector } from '../detectors/NodeDetector.js';
import { PythonDetector } from '../detectors/PythonDetector.js';
import { PHPDetector } from '../detectors/PHPDetector.js';
import { Project } from '../../domain/types/index.js';

export interface ScanOptions {
  onProgress?: (scannedDirs: number, currentPath: string) => void;
  ignoredPaths?: string[];
  maxDepth?: number;
}

export class DirectoryScanner {
  private detectors: ProjectDetector[];

  constructor() {
    this.detectors = [
      new NodeDetector(),
      new PythonDetector(),
      new PHPDetector(),
    ];
  }

  async scan(rootDir: string, options: ScanOptions = {}): Promise<Project[]> {
    const projects: Project[] = [];
    let scannedDirsCount = 0;
    const ignoredPaths = new Set(options.ignoredPaths || ['node_modules', '.venv', 'venv', 'vendor', '.git', 'dist', 'build']);

    async function walk(dirPath: string, currentDepth: number, detectors: ProjectDetector[]) {
      if (options.maxDepth && currentDepth > options.maxDepth) return;

      scannedDirsCount++;
      if (options.onProgress) {
        options.onProgress(scannedDirsCount, dirPath);
      }

      // Check if current dir is a project
      for (const detector of detectors) {
        try {
          const project = await detector.detect(dirPath);
          if (project) {
            projects.push(project);
            break; // Matched project type
          }
        } catch {
          // Ignore error
        }
      }

      // Traverse subdirectories
      try {
        const entries = await fs.readdir(dirPath, { withFileTypes: true });
        for (const entry of entries) {
          if (entry.isDirectory()) {
            if (ignoredPaths.has(entry.name)) continue;
            const subDirPath = path.join(dirPath, entry.name);
            await walk(subDirPath, currentDepth + 1, detectors);
          }
        }
      } catch {
        // Inaccessible path
      }
    }

    await walk(rootDir, 0, this.detectors);
    return projects;
  }
}
