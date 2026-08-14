import { Command } from 'commander';
import chalk from 'chalk';
import path from 'node:path';
import React from 'react';
import { render } from 'ink';
import { ScanService } from '../../application/services/ScanService.js';
import { CleanService } from '../../application/services/CleanService.js';
import { formatSize } from '../../utils/formatSize.js';
import { App } from '../../ui/App.js';

export const cleanCommand = new Command('clean')
  .description('Clean detected developer dependencies')
  .argument('[path]', 'Root directory to clean', process.cwd())
  .option('--dry-run', 'Simulate deletion without actually removing files')
  .option('-y, --yes', 'Skip confirmation prompt and delete immediately')
  .action(async (targetPath: string, options: { dryRun?: boolean; yes?: boolean }) => {
    const resolvedPath = path.resolve(targetPath);

    if (options.dryRun) {
      console.log(chalk.cyan(`Scanning ${resolvedPath}...`));
      const scanService = new ScanService();
      const projects = await scanService.scanProjects(resolvedPath);
      const allDeps = projects.flatMap((p) => p.dependencies);

      if (allDeps.length === 0) {
        console.log(chalk.yellow('No dependencies found to clean.'));
        return;
      }

      const totalBytes = allDeps.reduce((acc, d) => acc + d.sizeBytes, 0);
      console.log(chalk.bold.yellow('\n[DRY RUN SIMULATION] Would delete:'));
      for (const dep of allDeps) {
        console.log(`- ${dep.path} (${formatSize(dep.sizeBytes)})`);
      }
      console.log(chalk.bold.green(`\nTotal Reclaimable: ${formatSize(totalBytes)}`));
      return;
    }

    if (!options.yes) {
      // Launch interactive TUI so user can select item-by-item which ones to delete or keep
      const { setupAltScreenMode } = await import('../../utils/terminal.js');
      const cleanup = setupAltScreenMode();
      const inkApp = render(React.createElement(App, { initialRootDir: resolvedPath }));
      inkApp.waitUntilExit().then(() => {
        cleanup();
      });
      return;
    }

    console.log(chalk.cyan(`Scanning ${resolvedPath}...`));
    const scanService = new ScanService();
    const projects = await scanService.scanProjects(resolvedPath);
    const allDeps = projects.flatMap((p) => p.dependencies);

    if (allDeps.length === 0) {
      console.log(chalk.yellow('No dependencies found to clean.'));
      return;
    }

    const cleanService = new CleanService();
    console.log(chalk.red(`\nDeleting ${allDeps.length} dependency directory(s)...`));
    const result = await cleanService.cleanDependencies(allDeps, false);

    console.log(
      chalk.bold.green(
        `[SUCCESS] Successfully deleted ${result.successful.length} folder(s), reclaimed ${formatSize(result.totalBytesReclaimed)}!`
      )
    );
  });
