export type DependencyType = 'node_modules' | 'venv' | '.venv' | 'vendor' | 'target';

export type ProjectLanguage = 'javascript' | 'typescript' | 'python' | 'php' | 'rust';

export interface DependencyDirectory {
  id: string;
  path: string;
  name: string;
  type: DependencyType;
  sizeBytes: number;
  projectPath: string;
  lastModified: Date;
}

export interface Project {
  id: string;
  name: string;
  path: string;
  language: ProjectLanguage;
  dependencies: DependencyDirectory[];
  totalSizeBytes: number;
  lastActive: Date;
}

export interface StorageOverview {
  totalBytes: number;
  usedBytes: number;
  freeBytes: number;
  reclaimableBytes: number;
  reclaimableByEcosystem: Record<ProjectLanguage, { bytes: number; projectCount: number }>;
}

export interface AppConfig {
  scanPaths: string[];
  ignoredPaths: string[];
  detectors: {
    node: boolean;
    python: boolean;
    php: boolean;
  };
  useTrash: boolean;
}
