import { spawnSync } from 'node:child_process';
import { mkdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(root, '..');
const registryPath = path.join(workspaceRoot, 'content/diagrams/diagrams.json');
const rendererProject = path.join(workspaceRoot, 'scripts/excalidraw-render');
const rendererScript = path.join(rendererProject, 'render_excalidraw.py');

if (process.env.SKIP_DIAGRAM_RENDER === '1') {
  console.log('Skipping diagram render because SKIP_DIAGRAM_RENDER=1.');
  process.exit(0);
}

const registry = JSON.parse(readFileSync(registryPath, 'utf8'));

for (const diagram of registry) {
  const sourcePath = path.join(workspaceRoot, diagram.source);
  const imagePath = path.join(
    workspaceRoot,
    diagram.image.replace(/^\/+/, 'public/'),
  );

  mkdirSync(path.dirname(imagePath), { recursive: true });

  const result = spawnSync(
    'uv',
    [
      '--project',
      rendererProject,
      'run',
      'python',
      rendererScript,
      sourcePath,
      '--output',
      imagePath,
      '--scale',
      '2',
      '--width',
      '1920',
    ],
    {
      cwd: workspaceRoot,
      stdio: 'inherit',
    },
  );

  if (result.error) {
    console.error(
      'Could not run uv. Run `pnpm diagrams:setup` before rendering diagrams.',
    );
    throw result.error;
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
