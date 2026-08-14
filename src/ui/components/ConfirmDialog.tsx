import React from 'react';
import { Box, Text } from 'ink';
import { formatSize } from '../../utils/formatSize.js';

export interface ConfirmDialogProps {
  itemCount: number;
  totalBytes: number;
  isDryRun?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  itemCount,
  totalBytes,
  isDryRun = false,
}) => {
  return (
    <Box flexDirection="column" borderStyle="double" borderColor={isDryRun ? 'yellow' : 'red'} padding={1} marginY={1}>
      <Text bold color={isDryRun ? 'yellow' : 'red'}>
        {isDryRun ? '[DRY RUN SIMULATION]' : '[CONFIRM DELETION]'}
      </Text>
      <Box marginY={1}>
        <Text>
          Are you sure you want to {isDryRun ? 'simulate deleting' : 'delete'} <Text bold color="cyan">{itemCount}</Text> dependency folder(s) reclaiming{' '}
          <Text bold color="green">{formatSize(totalBytes)}</Text>?
        </Text>
      </Box>
      <Box justifyContent="space-around">
        <Text color="green" bold>[Y] Confirm</Text>
        <Text color="red" bold>[N] Cancel</Text>
      </Box>
    </Box>
  );
};
