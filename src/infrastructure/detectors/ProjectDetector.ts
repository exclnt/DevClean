import { Project, ProjectLanguage } from '../../domain/types/index.js';

export interface ProjectDetector {
  language: ProjectLanguage;
  detect(dirPath: string): Promise<Project | null>;
}
