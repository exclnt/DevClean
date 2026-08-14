import React from 'react';
import { Box, Text } from 'ink';

export interface DividerProps {
  width?: number;
}

export const Divider: React.FC<DividerProps> = ({ width = 78 }) => {
  const line = '─'.repeat(width);
  return (
    <Box marginY={0}>
      <Text color="gray">{line}</Text>
    </Box>
  );
};
