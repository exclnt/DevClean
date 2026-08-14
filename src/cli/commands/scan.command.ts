import { Command } from 'commander';
import chalk from 'chalk';
import path from 'node:path';
import { ScanService } from '../../application/services/ScanService.js';
import { formatSize } from '../../utils/formatSize.js';

export const scanCommand = new Command('scan')
  .description('Scan target directory for developer dependencies')
  .argument('[path]', 'Root directory to scan', process.cwd())
  .option('--json', 'Output results as JSON')
  .action(async (targetPath: string, options: { json?: boolean }) => {
    const resolvedPath = path.resolve(targetPath);
    console.log(chalk.cyan(`Scanning ${resolvedPath}...`));

    const scanService = new ScanService();
    const projects = await scanService.scanProjects(resolvedPath);
    const overview = await scanService.calculateOverview(projects, resolvedPath);

    if (options.json) {
      console.log(JSON.stringify({ overview, projects }, null, 2));
      return;
    }

    console.log(chalk.bold.green(`\nFound ${projects.length} project(s):`));
    for (const proj of projects) {
      console.log(`- ${chalk.yellow(proj.name)} (${proj.language}): ${chalk.cyan(formatSize(proj.totalSizeBytes))}`);
      for (const dep of proj.dependencies) {
        console.log(`  └─ ${dep.name}: ${dep.path}`);
      }
    }

    console.log(chalk.bold.cyan(`\nTotal Reclaimable: ${formatSize(overview.reclaimableBytes)}`));
  });
