import React from 'react';
import { Box, Text } from 'ink';

export interface ProgressBarProps {
  percent: number;
  width?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ percent, width = 30 }) => {
  const clamped = Math.max(0, Math.min(100, percent));
  const filled = Math.round((clamped / 100) * width);
  const empty = width - filled;

  const bar = '█'.repeat(filled) + '░'.repeat(empty);

  return (
    <Box marginY={1}>
      <Text color="green">[{bar}] </Text>
      <Text color="white" bold>{clamped}%</Text>
    </Box>
  );
};
