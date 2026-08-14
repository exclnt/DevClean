import { describe, it, expect, beforeEach } from 'vitest';
import path from 'node:path';
import fs from 'node:fs/promises';
import { ScanService } from '../../src/application/services/ScanService.js';

async function ensureFixtures() {
  const nodeMod = path.resolve('tests/fixtures/node-project/node_modules');
  const pyVenv = path.resolve('tests/fixtures/python-project/.venv');
  const phpVendor = path.resolve('tests/fixtures/php-project/vendor');

  await fs.mkdir(nodeMod, { recursive: true });
  await fs.writeFile(path.join(nodeMod, 'dummy.txt'), 'node_modules fixture');

  await fs.mkdir(pyVenv, { recursive: true });
  await fs.writeFile(path.join(pyVenv, 'dummy.txt'), '.venv fixture');

  await fs.mkdir(phpVendor, { recursive: true });
  await fs.writeFile(path.join(phpVendor, 'dummy.txt'), 'vendor fixture');
}

describe('ScanService integration tests', () => {
  beforeEach(async () => {
    await ensureFixtures();
  });

  it('should scan fixtures directory and detect node, python, and php projects', async () => {
    const scanService = new ScanService();
    const fixturesDir = path.resolve('tests/fixtures');
    const projects = await scanService.scanProjects(fixturesDir);

    expect(projects.length).toBe(3);

    const nodeProj = projects.find((p) => p.language === 'javascript');
    expect(nodeProj).toBeDefined();
    expect(nodeProj?.dependencies[0].type).toBe('node_modules');

    const pythonProj = projects.find((p) => p.language === 'python');
    expect(pythonProj).toBeDefined();
    expect(pythonProj?.dependencies[0].type).toBe('.venv');

    const phpProj = projects.find((p) => p.language === 'php');
    expect(phpProj).toBeDefined();
    expect(phpProj?.dependencies[0].type).toBe('vendor');
  });

  it('should calculate storage overview correctly', async () => {
    const scanService = new ScanService();
    const fixturesDir = path.resolve('tests/fixtures');
    const projects = await scanService.scanProjects(fixturesDir);
    const overview = await scanService.calculateOverview(projects);

    expect(overview.reclaimableBytes).toBeGreaterThan(0);
    expect(overview.reclaimableByEcosystem.javascript.projectCount).toBe(1);
    expect(overview.reclaimableByEcosystem.python.projectCount).toBe(1);
    expect(overview.reclaimableByEcosystem.php.projectCount).toBe(1);
  });
});
