import React from 'react';
import { Box, Text } from 'ink';

export interface HeaderProps {
  title?: string;
  version?: string;
}

export const Header: React.FC<HeaderProps> = ({ title = 'DevClean', version = 'v0.1.0' }) => {
  return (
    <Box justifyContent="space-between" width={76} paddingX={1} marginY={0}>
      <Box>
        <Text color="cyan" bold>{title}</Text>
        <Text color="gray"> │ </Text>
        <Text color="white">Developer Storage Manager</Text>
      </Box>
      <Text color="yellow" bold>{version}</Text>
    </Box>
  );
};
