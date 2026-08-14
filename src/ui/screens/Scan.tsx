import React, { useEffect, useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { ProgressBar } from '../components/ProgressBar.js';
import { Footer } from '../components/Footer.js';
import { ScanService } from '../../application/services/ScanService.js';
import { Project } from '../../domain/types/index.js';
import { formatSize } from '../../utils/formatSize.js';

export interface ScanProps {
  rootDir: string;
  onScanComplete: (projects: Project[]) => void;
  onCancel: () => void;
}

export const Scan: React.FC<ScanProps> = ({ rootDir, onScanComplete, onCancel }) => {
  const [scannedDirs, setScannedDirs] = useState(0);
  const [currentPath, setCurrentPath] = useState(rootDir);
  const [projectsFound, setProjectsFound] = useState(0);
  const [reclaimableBytes, setReclaimableBytes] = useState(0);

  useInput((_, key) => {
    if (key.escape) onCancel();
  });

  useEffect(() => {
    const scanService = new ScanService();
    let isMounted = true;

    scanService
      .scanProjects(rootDir, {
        onProgress: (count, path) => {
          if (isMounted) {
            setScannedDirs(count);
            setCurrentPath(path);
          }
        },
      })
      .then((results) => {
        if (isMounted) {
          const totalReclaimable = results.reduce((acc, p) => acc + p.totalSizeBytes, 0);
          setProjectsFound(results.length);
          setReclaimableBytes(totalReclaimable);
          onScanComplete(results);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [rootDir]);

  return (
    <Box flexDirection="column" paddingX={1}>
      <Text color="gray">Target: {rootDir}</Text>

      <ProgressBar percent={Math.min(100, Math.round((scannedDirs / 500) * 100))} />

      <Box flexDirection="column" marginY={1}>
        <Text>Directories Scanned : <Text color="yellow">{scannedDirs}</Text></Text>
        <Text>Projects Found      : <Text color="green">{projectsFound}</Text></Text>
        <Text>Reclaimable Storage : <Text color="cyan">{formatSize(reclaimableBytes)}</Text></Text>
      </Box>

      <Box borderStyle="single" borderColor="gray" marginY={1}>
        <Text color="gray">Current Path: </Text>
        <Text color="white">{currentPath.length > 50 ? '...' + currentPath.slice(-47) : currentPath}</Text>
      </Box>

      <Footer hints={[{ key: 'Esc', label: 'Cancel Scan' }]} />
    </Box>
  );
};
