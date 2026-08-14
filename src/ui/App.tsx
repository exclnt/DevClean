import React, { useState, useEffect } from 'react';
import { Box, useApp } from 'ink';
import { Header } from './components/Header.js';
import { Divider } from './components/Divider.js';
import { Dashboard } from './screens/Dashboard.js';
import { Scan } from './screens/Scan.js';
import { Clean } from './screens/Clean.js';
import { Projects } from './screens/Projects.js';
import { Project, StorageOverview } from '../domain/types/index.js';
import { ScanService } from '../application/services/ScanService.js';
import { getRealSystemStorage } from '../infrastructure/filesystem/SystemStorage.js';

export interface AppProps {
  initialRootDir?: string;
}

export const App: React.FC<AppProps> = ({ initialRootDir = process.cwd() }) => {
  const { exit } = useApp();
  const [currentScreen, setCurrentScreen] = useState<'dashboard' | 'scan' | 'clean' | 'projects'>('dashboard');
  const [projects, setProjects] = useState<Project[]>([]);
  const [overview, setOverview] = useState<StorageOverview>({
    totalBytes: 0,
    usedBytes: 0,
    freeBytes: 0,
    reclaimableBytes: 0,
    reclaimableByEcosystem: {
      javascript: { bytes: 0, projectCount: 0 },
      typescript: { bytes: 0, projectCount: 0 },
      python: { bytes: 0, projectCount: 0 },
      php: { bytes: 0, projectCount: 0 },
      rust: { bytes: 0, projectCount: 0 },
    },
  });

  const scanService = new ScanService();

  useEffect(() => {
    getRealSystemStorage(initialRootDir).then((realStorage) => {
      scanService.calculateOverview(projects, initialRootDir, realStorage).then((newOverview) => {
        setOverview(newOverview);
      });
    });
  }, [initialRootDir]);

  const handleScanComplete = (results: Project[]) => {
    setProjects(results);
    scanService.calculateOverview(results, initialRootDir).then((newOverview) => {
      setOverview(newOverview);
      setCurrentScreen('dashboard');
    });
  };

  const getScreenTitle = () => {
    switch (currentScreen) {
      case 'scan':
        return '🔍 Scanning Directories';
      case 'clean':
        return '🧹 Clean Dependencies';
      case 'projects':
        return '📁 Discovered Projects';
      default:
        return '🧹 DevClean';
    }
  };

  return (
    <Box flexDirection="column" borderStyle="single" borderColor="cyan" width={80}>
      <Header title={getScreenTitle()} version="v0.1.0" />
      <Divider width={78} />

      {currentScreen === 'dashboard' && (
        <Dashboard
          overview={overview}
          onNavigate={(screen) => {
            if (screen === 'scan' || screen === 'clean' || screen === 'projects') {
              setCurrentScreen(screen);
            }
          }}
          onQuit={() => exit()}
        />
      )}

      {currentScreen === 'scan' && (
        <Scan
          rootDir={initialRootDir}
          onScanComplete={handleScanComplete}
          onCancel={() => setCurrentScreen('dashboard')}
        />
      )}

      {currentScreen === 'clean' && (
        <Clean projects={projects} onBack={() => setCurrentScreen('dashboard')} />
      )}

      {currentScreen === 'projects' && (
        <Projects projects={projects} onBack={() => setCurrentScreen('dashboard')} />
      )}
    </Box>
  );
};
