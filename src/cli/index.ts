#!/usr/bin/env node
import { Command } from 'commander';
import React from 'react';
import { render } from 'ink';
import { scanCommand } from './commands/scan.command.js';
import { cleanCommand } from './commands/clean.command.js';
import { App } from '../ui/App.js';
import { setupAltScreenMode } from '../utils/terminal.js';

const program = new Command();

program
  .name('devclean')
  .description('Developer Storage Manager CLI/TUI')
  .version('0.1.0');

program.addCommand(scanCommand);
program.addCommand(cleanCommand);

// Default action: Render Ink TUI App in Alternate Screen Buffer (Fullscreen TUI)
program.action(() => {
  const cleanup = setupAltScreenMode();
  const inkApp = render(React.createElement(App, { initialRootDir: process.cwd() }));
  inkApp.waitUntilExit().then(() => {
    cleanup();
  });
});

program.parse(process.argv);
