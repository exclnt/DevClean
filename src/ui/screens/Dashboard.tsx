import React from 'react';
import { Box, Text, useInput } from 'ink';
import { StorageBar } from '../components/StorageBar.js';
import { Footer } from '../components/Footer.js';
import { StorageOverview } from '../../domain/types/index.js';
import { formatSize } from '../../utils/formatSize.js';

export interface DashboardProps {
  overview: StorageOverview;
  onNavigate: (screen: 'scan' | 'clean' | 'projects' | 'cache' | 'settings') => void;
  onQuit: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ overview, onNavigate, onQuit }) => {
  useInput((input) => {
    const key = input.toLowerCase();
    if (key === 's') onNavigate('scan');
    if (key === 'c') onNavigate('clean');
    if (key === 'p') onNavigate('projects');
    if (key === 'q') onQuit();
  });

  const hints = [
    { key: 'S', label: 'Start Scan' },
    { key: 'C', label: 'Clean Now' },
    { key: 'P', label: 'View Projects' },
    { key: 'Q', label: 'Quit' },
  ];

  return (
    <Box flexDirection="column" paddingX={1}>
      <StorageBar
        usedBytes={overview.usedBytes}
        freeBytes={overview.freeBytes}
        totalBytes={overview.totalBytes}
      />

      <Box flexDirection="column" marginY={1} paddingX={1} width={76}>
        <Text bold color="cyan">RECLAIMABLE STORAGE BY ECOSYSTEM</Text>

        <Box marginY={1} flexDirection="column">
          <Box justifyContent="space-between" width={74}>
            <Text color="white">  Node.js |<Text color="gray">(node_modules)</Text></Text>
            <Text color="gray"> <Text color="yellow" bold>█ {formatSize(overview.reclaimableByEcosystem.javascript.bytes)}</Text>  ({overview.reclaimableByEcosystem.javascript.projectCount} projects)</Text>
          </Box>
          <Box justifyContent="space-between" width={74}>
            <Text color="white">  Python  |<Text color="gray">(.venv / venv)</Text></Text>
            <Text color="gray"> <Text color="yellow" bold>█ {formatSize(overview.reclaimableByEcosystem.python.bytes)}</Text>  ({overview.reclaimableByEcosystem.python.projectCount} projects)</Text>
          </Box>
          <Box justifyContent="space-between" width={74}>
            <Text color="white">  PHP     |<Text color="gray">(vendor)</Text></Text>
            <Text color="gray"> <Text color="yellow" bold>█ {formatSize(overview.reclaimableByEcosystem.php.bytes)}</Text>  ({overview.reclaimableByEcosystem.php.projectCount} projects)</Text>
          </Box>
        </Box>

        <Box justifyContent="space-between" paddingX={1} marginY={1} width={74}>
          <Text bold color="white">TOTAL RECLAIMABLE</Text>
          <Text bold color="green">│ {formatSize(overview.reclaimableBytes)}</Text>
        </Box>
      </Box>

      <Footer hints={hints} />
    </Box>
  );
};
