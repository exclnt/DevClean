import React from 'react';
import { Box, Text } from 'ink';
import { Project } from '../../domain/types/index.js';
import { formatSize } from '../../utils/formatSize.js';
import { formatDate } from '../../utils/formatDate.js';

export interface ProjectListProps {
  projects: Project[];
  selectedIndex: number;
}

export const ProjectList: React.FC<ProjectListProps> = ({ projects, selectedIndex }) => {
  return (
    <Box flexDirection="column" marginY={1} width={76}>
      {/* Header Row */}
      <Box justifyContent="space-between" width={74} paddingX={1}>
        <Box width={22}>
          <Text bold color="cyan">  PROJECT NAME</Text>
        </Box>
        <Box width={14}>
          <Text bold color="cyan">LANGUAGE</Text>
        </Box>
        <Box width={12}>
          <Text bold color="cyan">DEPS</Text>
        </Box>
        <Box width={12}>
          <Text bold color="cyan">STORAGE</Text>
        </Box>
        <Box width={14} justifyContent="flex-end">
          <Text bold color="cyan">LAST ACTIVE</Text>
        </Box>
      </Box>

      {/* Header Separator */}
      <Box paddingX={1} marginBottom={1}>
        <Text color="gray">──────────────────────────────────────────────────────────────────────────</Text>
      </Box>

      {/* Rows */}
      {projects.map((proj, idx) => {
        const isFocused = idx === selectedIndex;
        const pointer = isFocused ? '❯ ' : '  ';

        return (
          <Box key={proj.id} justifyContent="space-between" width={74} paddingX={1}>
            <Box width={22}>
              <Text color={isFocused ? 'cyan' : 'gray'}>{pointer}</Text>
              <Text bold={isFocused} color={isFocused ? 'yellow' : 'white'}>
                {proj.name.length > 18 ? proj.name.slice(0, 15) + '...' : proj.name}
              </Text>
            </Box>

            <Box width={14}>
              <Text color="magenta">[{proj.language}]</Text>
            </Box>

            <Box width={12}>
              <Text color="gray">{proj.dependencies.length} dir(s)</Text>
            </Box>

            <Box width={12}>
              <Text color="green">{formatSize(proj.totalSizeBytes)}</Text>
            </Box>

            <Box width={14} justifyContent="flex-end">
              <Text color="gray">{formatDate(proj.lastActive)}</Text>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
