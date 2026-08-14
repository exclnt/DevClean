import React from 'react';
import { Box, Text } from 'ink';
import { formatSize } from '../../utils/formatSize.js';

export interface StorageBarProps {
  usedBytes: number;
  freeBytes: number;
  totalBytes: number;
  width?: number;
}

export const StorageBar: React.FC<StorageBarProps> = ({
  usedBytes,
  freeBytes,
  totalBytes,
  width = 52,
}) => {
  const usedPercentage = totalBytes > 0 ? Math.min(100, Math.round((usedBytes / totalBytes) * 100)) : 0;
  const filledChars = Math.round((usedPercentage / 100) * width);
  const emptyChars = width - filledChars;

  const barFilled = '█'.repeat(filledChars);
  const barEmpty = '░'.repeat(emptyChars);

  return (
    <Box flexDirection="column" marginY={1} paddingX={1}>
      <Text color="yellow" bold>STORAGE OVERVIEW</Text>
      
      <Box marginY={1}>
        <Text color="cyan">{barFilled}</Text>
        <Text color="gray">{barEmpty}</Text>
        <Text color="white" bold>  {usedPercentage}%</Text>
      </Box>

      <Box justifyContent="space-between" width={74}>
        <Text color="gray">Used: <Text color="white" bold>{formatSize(usedBytes)}</Text></Text>
        <Text color="gray">│</Text>
        <Text color="gray">Free: <Text color="green" bold>{formatSize(freeBytes)}</Text></Text>
        <Text color="gray">│</Text>
        <Text color="gray">Total: <Text color="cyan" bold>{formatSize(totalBytes)}</Text></Text>
      </Box>
    </Box>
  );
};
