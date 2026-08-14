/**
 * Terminal Screen Buffer Manager (Alternate Screen Buffer)
 * Enables full-screen TUI mode like vim/less/htop and restores terminal history on exit.
 */

export function enterAltScreen() {
  process.stdout.write('\x1b[?1049h\x1b[H');
}

export function exitAltScreen() {
  process.stdout.write('\x1b[?1049l');
}

export function setupAltScreenMode(): () => void {
  enterAltScreen();

  let hasExited = false;
  const cleanup = () => {
    if (hasExited) return;
    hasExited = true;
    exitAltScreen();
  };

  process.on('exit', cleanup);
  process.on('SIGINT', () => {
    cleanup();
    process.exit(0);
  });
  process.on('SIGTERM', () => {
    cleanup();
    process.exit(0);
  });

  return cleanup;
}
