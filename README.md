# DevClean

> **Developer Storage Manager** — A fast, modern CLI & Terminal User Interface (TUI) tool to reclaim gigabytes of lost disk space from developer dependencies (`node_modules`, `.venv`, `vendor`).

---

## Overview

As developers, our disk space quietly vanishes over time. Hundreds of abandoned projects hoard tens of gigabytes in heavy dependency folders that are slow and risky to delete manually.

**DevClean** detects, analyzes, and safely cleans developer storage without touching your primary source code. Built with **TypeScript**, **React & Ink**, and **Commander.js**, it brings a clean, fullscreen TUI experience right into your terminal.

---

## Features

- **Multi-Ecosystem Detection**:
  - **Node.js / JS / TS**: `package.json` $\rightarrow$ `node_modules/`
  - **Python**: `requirements.txt` / `pyproject.toml` $\rightarrow$ `.venv/`, `venv/`
  - **PHP**: `composer.json` $\rightarrow$ `vendor/`
- **Real System Disk Meter**: Reads real physical drive space using native OS system calls (`fs.statfs`).
- **Interactive Item Selection**: Select folder-by-folder which ones to delete (`●`) and keep (`○`).
- **Multi-Layer Safety**:
  - Non-destructive scans by default.
  - Interactive deletion confirmation prompts.
  - `--dry-run` simulation mode to preview saved space without touching files.
  - `--yes` flag for CI/CD automation scripts.
- **Fullscreen Alternate Screen Buffer**: Terminal screen stays clean during execution, and your previous terminal command history is fully restored upon exit (just like `lazygit` or `htop`).

---


## Installation & Usage

### Global Installation (Recommended)

```bash
npm install -g @ekoramdani/devclean
```

### Launch Interactive TUI

Run `devclean` in any directory to open the interactive dashboard:

```bash
devclean
```

### Direct CLI Commands

#### 1. Scan Directory
```bash
# Scan current directory
devclean scan

# Scan specific path
devclean scan ~/Projects

# Output scan summary as JSON
devclean scan ~/Projects --json
```

#### 2. Clean Dependencies
```bash
# Dry Run Simulation (Preview space saved without deleting files)
devclean clean ~/Projects --dry-run

# Non-Interactive Force Clean (For CI/CD scripts)
devclean clean ~/Projects --yes
```

---

## Keyboard Controls

| Key | Action |
| :--- | :--- |
| **`S`** | Start directory scanning |
| **`C`** | Open dependency cleaning screen |
| **`P`** | View discovered projects list |
| **`Space`** | Toggle folder selection (`●` Delete / `○` Keep) |
| **`A`** | Select all folders for deletion |
| **`N`** | Deselect all (Keep all folders safe) |
| **`I`** | Invert folder selection |
| **`Enter`** | Confirm & delete selected folders |
| **`D`** | Run Dry Run simulation on selected items |
| **`Q` / `Esc`** | Back to Dashboard / Quit application |

---

## Technology Stack

- **Runtime**: Node.js (v18+)
- **Language**: TypeScript
- **TUI Engine**: [Ink](https://github.com/vadimdemedes/ink) (React for CLI)
- **CLI Framework**: Commander.js & Chalk
- **File Scanner**: `fast-glob` & `node:fs`
- **Testing**: Vitest
- **CI/CD**: GitHub Actions

---

## Testing & Verification

Run the automated test suite locally:

```bash
# Run Vitest test suite
npm test

# Typecheck & Build
npm run build
```

---

## License

Distributed under the MIT License. See `LICENSE` for details.
