import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { DependencyList } from '../components/DependencyList.js';
import { ConfirmDialog } from '../components/ConfirmDialog.js';
import { Footer } from '../components/Footer.js';
import { DependencyDirectory, Project } from '../../domain/types/index.js';
import { CleanService } from '../../application/services/CleanService.js';
import { formatSize } from '../../utils/formatSize.js';

export interface CleanProps {
  projects: Project[];
  onBack: () => void;
}

export const Clean: React.FC<CleanProps> = ({ projects, onBack }) => {
  const allDependencies: DependencyDirectory[] = projects.flatMap((p) => p.dependencies);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    new Set(allDependencies.map((d) => d.id))
  );
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDryRun, setIsDryRun] = useState(false);
  const [cleanCompletedMessage, setCleanCompletedMessage] = useState<string | null>(null);

  useInput((input, key) => {
    if (cleanCompletedMessage) {
      if (key.return || key.escape) onBack();
      return;
    }

    if (showConfirm) {
      const char = input.toLowerCase();
      if (char === 'y') {
        const selectedDeps = allDependencies.filter((d) => selectedIds.has(d.id));
        const cleanService = new CleanService();
        cleanService.cleanDependencies(selectedDeps, isDryRun).then((result) => {
          setCleanCompletedMessage(
            `${isDryRun ? '[DRY RUN SIMULASI] Mensimulasikan penghapusan' : 'Berhasil menghapus'} ${
              result.successful.length
            } folder, menghemat ${formatSize(result.totalBytesReclaimed)}.`
          );
        });
      } else if (char === 'n' || key.escape) {
        setShowConfirm(false);
      }
      return;
    }

    if (key.upArrow) {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : allDependencies.length - 1));
    }
    if (key.downArrow) {
      setSelectedIndex((prev) => (prev < allDependencies.length - 1 ? prev + 1 : 0));
    }
    if (input === ' ') {
      const currentDep = allDependencies[selectedIndex];
      if (currentDep) {
        const next = new Set(selectedIds);
        if (next.has(currentDep.id)) {
          next.delete(currentDep.id);
        } else {
          next.add(currentDep.id);
        }
        setSelectedIds(next);
      }
    }
    const char = input.toLowerCase();
    if (char === 'a') {
      // Select All
      setSelectedIds(new Set(allDependencies.map((d) => d.id)));
    }
    if (char === 'n') {
      // Select None / Clear Selection
      setSelectedIds(new Set());
    }
    if (char === 'i') {
      // Invert Selection
      const inverted = new Set<string>();
      for (const dep of allDependencies) {
        if (!selectedIds.has(dep.id)) {
          inverted.add(dep.id);
        }
      }
      setSelectedIds(inverted);
    }
    if (key.return) {
      if (selectedIds.size > 0) {
        setIsDryRun(false);
        setShowConfirm(true);
      }
    }
    if (char === 'd') {
      if (selectedIds.size > 0) {
        setIsDryRun(true);
        setShowConfirm(true);
      }
    }
    if (key.escape) {
      onBack();
    }
  });

  const deleteDeps = allDependencies.filter((d) => selectedIds.has(d.id));
  const deleteBytes = deleteDeps.reduce((acc, d) => acc + d.sizeBytes, 0);

  const keepDeps = allDependencies.filter((d) => !selectedIds.has(d.id));
  const keepBytes = keepDeps.reduce((acc, d) => acc + d.sizeBytes, 0);

  if (cleanCompletedMessage) {
    return (
      <Box flexDirection="column" paddingX={1} marginY={1}>
        <Box borderStyle="round" borderColor="green" padding={1}>
          <Text color="green" bold>{cleanCompletedMessage}</Text>
        </Box>
        <Footer hints={[{ key: 'Enter/Esc', label: 'Kembali ke Dashboard' }]} />
      </Box>
    );
  }

  return (
    <Box flexDirection="column" paddingX={1}>
      {allDependencies.length === 0 ? (
        <Box marginY={1}>
          <Text color="yellow">Tidak ada dependensi yang ditemukan untuk dibersihkan.</Text>
        </Box>
      ) : (
        <>
          <DependencyList
            dependencies={allDependencies}
            selectedIndex={selectedIndex}
            selectedIds={selectedIds}
          />

          <Box paddingX={1} marginY={1} justifyContent="space-between" width={74}>
            <Text color="red" bold>
              ● Delete: {deleteDeps.length} folder(s) ({formatSize(deleteBytes)})
            </Text>
            <Text color="gray" bold>
              ○ Keep: {keepDeps.length} folder(s) ({formatSize(keepBytes)})
            </Text>
          </Box>

          {showConfirm && (
            <ConfirmDialog
              itemCount={deleteDeps.length}
              totalBytes={deleteBytes}
              isDryRun={isDryRun}
            />
          )}
        </>
      )}

      <Footer
        hints={[
          { key: 'Space', label: 'Toggle' },
          { key: 'A', label: 'All' },
          { key: 'N', label: 'None' },
          { key: 'Enter', label: 'Delete' },
          { key: 'Esc', label: 'Back' },
        ]}
      />
    </Box>
  );
};
