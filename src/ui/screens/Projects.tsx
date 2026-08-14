import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { ProjectList } from '../components/ProjectList.js';
import { Footer } from '../components/Footer.js';
import { Project } from '../../domain/types/index.js';

export interface ProjectsProps {
  projects: Project[];
  onBack: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({ projects, onBack }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useInput((_, key) => {
    if (key.upArrow) {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : projects.length - 1));
    }
    if (key.downArrow) {
      setSelectedIndex((prev) => (prev < projects.length - 1 ? prev + 1 : 0));
    }
    if (key.escape) {
      onBack();
    }
  });

  return (
    <Box flexDirection="column" paddingX={1}>

      {projects.length === 0 ? (
        <Box marginY={1}>
          <Text color="yellow">No projects detected yet. Run scan first.</Text>
        </Box>
      ) : (
        <ProjectList projects={projects} selectedIndex={selectedIndex} />
      )}

      <Footer
        hints={[
          { key: '↑/↓', label: 'Navigate' },
          { key: 'Esc', label: 'Back to Dashboard' },
        ]}
      />
    </Box>
  );
};
