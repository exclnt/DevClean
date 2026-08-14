import React from 'react';
import { Box, Text } from 'ink';
import { DependencyDirectory } from '../../domain/types/index.js';
import { formatSize } from '../../utils/formatSize.js';

export interface DependencyListProps {
  dependencies: DependencyDirectory[];
  selectedIndex: number;
  selectedIds: Set<string>;
}

function getCleanPath(fullPath: string, maxLength: number = 34): string {
  const cwd = process.cwd();
  let relative = fullPath;
  if (fullPath.startsWith(cwd)) {
    relative = '.' + fullPath.slice(cwd.length);
  }
  if (relative.length > maxLength) {
    return '...' + relative.slice(-(maxLength - 3));
  }
  return relative;
}

export const DependencyList: React.FC<DependencyListProps> = ({
  dependencies,
  selectedIndex,
  selectedIds,
}) => {
  return (
    <Box flexDirection="column" marginY={1} width={76}>
      {/* Table Header */}
      <Box justifyContent="space-between" width={74} paddingX={1}>
        <Box width={42}>
          <Text bold color="cyan">    TARGET DIRECTORY</Text>
        </Box>
        <Box width={16}>
          <Text bold color="cyan">TYPE</Text>
        </Box>
        <Box width={14} justifyContent="flex-end">
          <Text bold color="cyan">SIZE</Text>
        </Box>
      </Box>

      {/* Header Separator */}
      <Box paddingX={1} marginBottom={1}>
        <Text color="gray">──────────────────────────────────────────────────────────────────────────</Text>
      </Box>

      {/* Table Rows */}
      {dependencies.map((dep, idx) => {
        const isFocused = idx === selectedIndex;
        const isChecked = selectedIds.has(dep.id);

        const pointer = isFocused ? '❯' : ' ';
        const dot = isChecked ? '●' : '○';
        const dotColor = isChecked ? 'red' : 'gray';

        const cleanPath = getCleanPath(dep.path, 34);

        return (
          <Box key={dep.id} justifyContent="space-between" width={74} paddingX={1}>
            <Box width={42}>
              <Text color={isFocused ? 'cyan' : 'gray'}>{pointer} </Text>
              <Text color={dotColor}>{dot} </Text>
              <Text bold={isFocused} color={isFocused ? 'yellow' : isChecked ? 'white' : 'gray'}>
                {cleanPath}
              </Text>
            </Box>

            <Box width={16}>
              <Text color="magenta">[{dep.type}]</Text>
            </Box>

            <Box width={14} justifyContent="flex-end">
              <Text color={isChecked ? 'yellow' : 'gray'}>{formatSize(dep.sizeBytes)}</Text>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
