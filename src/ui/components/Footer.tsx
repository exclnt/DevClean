import React from 'react';
import { Box, Text } from 'ink';

export interface ShortcutHint {
  key: string;
  label: string;
}

export interface FooterProps {
  hints?: ShortcutHint[];
}

export const Footer: React.FC<FooterProps> = ({ hints = [] }) => {
  return (
    <Box marginY={0} paddingX={1} flexDirection="row" flexWrap="wrap" width={76}>
      {hints.map((hint) => (
        <Box key={hint.key} marginRight={3}>
          <Text color="cyan" bold>[{hint.key}]</Text>
          <Text color="white"> {hint.label}</Text>
        </Box>
      ))}
    </Box>
  );
};
