import { docs } from 'collections/server';
import type { Folder, Node, Root } from 'fumadocs-core/page-tree';
import { loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { docsContentRoute, docsImageRoute, docsRoute } from './shared';

type SidebarEntry = string | SidebarGroup;

type SidebarGroup = {
  id: string;
  title: string;
  children: SidebarEntry[];
};

const sidebarGroupsByFolder = new Map<string, SidebarEntry[]>([
  [
    'get-started',
    [
      {
        id: 'install-agentic-os',
        title: 'Install Agentic OS',
        children: [
          '/docs/get-started/prerequisites',
          '/docs/get-started/local-install',
          '/docs/get-started/first-run',
          '/docs/get-started/updating',
        ],
      },
    ],
  ],
  [
    'agentic-os',
    [
      {
        id: 'understand-agentic-os',
        title: 'Understand Agentic OS',
        children: [
          '/docs/agentic-os/what-is-agentic-os',
          '/docs/agentic-os/core-concepts',
        ],
      },
      {
        id: 'work-with-workspaces',
        title: 'Work with workspaces',
        children: [
          '/docs/agentic-os/workspace-structure',
          '/docs/agentic-os/custom-edits',
          '/docs/agentic-os/multi-client-workspaces',
        ],
      },
    ],
  ],
  [
    'command-centre',
    [
      {
        id: 'work-in-command-centre',
        title: 'Work in Command Centre',
        children: [
          '/docs/command-centre/feed',
          '/docs/command-centre/task-permission-modes',
        ],
      },
    ],
  ],
  [
    'deploy',
    [
      {
        id: 'host-team-os',
        title: 'Host Team OS',
        children: [
          '/docs/deploy/team-os-hosted-server',
          {
            id: 'configuration',
            title: 'Configuration',
            children: [
              '/docs/deploy/environment-variables',
              '/docs/deploy/secrets-and-workspace-backup',
            ],
          },
          {
            id: 'deploy-options',
            title: 'Deploy options',
            children: [
              '/docs/deploy/docker-compose',
              '/docs/deploy/coolify',
              '/docs/deploy/railway',
              '/docs/deploy/vps',
            ],
          },
          {
            id: 'operations',
            title: 'Operations',
            children: [
              '/docs/deploy/startup-and-first-owner',
              '/docs/deploy/backups-and-restore',
              '/docs/deploy/first-verification',
            ],
          },
        ],
      },
    ],
  ],
  [
    'team-os',
    [
      {
        id: 'understand-team-os',
        title: 'Understand Team OS',
        children: [
          '/docs/team-os/concepts',
          '/docs/team-os/multi-team',
          '/docs/team-os/roles-and-permissions',
        ],
      },
      {
        id: 'connect',
        title: 'Connect',
        children: [
          '/docs/team-os/client-connection',
          {
            id: 'login',
            title: 'Login',
            children: [
              '/docs/team-os/terminal-login',
              '/docs/team-os/saved-config',
              '/docs/team-os/command-centre-login',
            ],
          },
          {
            id: 'access',
            title: 'Access',
            children: [
              '/docs/team-os/invites',
              '/docs/team-os/dev-token-login',
            ],
          },
          '/docs/team-os/client-common-failures',
        ],
      },
      {
        id: 'memory',
        title: 'Memory',
        children: [
          '/docs/team-os/memory-and-sync',
          {
            id: 'shared-memory',
            title: 'Shared memory',
            children: [
              '/docs/team-os/memory-layers',
              '/docs/team-os/import-shared-memory',
              '/docs/team-os/published-memory',
            ],
          },
          '/docs/team-os/hosted-memory-search',
        ],
      },
      {
        id: 'file-sync',
        title: 'File sync',
        children: [
          {
            id: 'basics',
            title: 'Basics',
            children: [
              '/docs/team-os/file-sync-model',
              '/docs/team-os/command-centre-sync',
            ],
          },
          {
            id: 'terminal-sync',
            title: 'Terminal sync',
            children: [
              '/docs/team-os/sync-manifest',
              '/docs/team-os/sync-pull',
              '/docs/team-os/sync-push',
            ],
          },
          {
            id: 'safety',
            title: 'Safety',
            children: [
              '/docs/team-os/sync-conflicts',
              '/docs/team-os/sync-exclusions',
              '/docs/team-os/sync-revoke',
            ],
          },
        ],
      },
      {
        id: 'test-access',
        title: 'Test access',
        children: ['/docs/team-os/restricted-runner'],
      },
    ],
  ],
  [
    'memory',
    [
      {
        id: 'understand-memory',
        title: 'Understand memory',
        children: [
          '/docs/memory/schema',
          '/docs/memory/layered-recall',
          '/docs/memory/hosted-api',
        ],
      },
      {
        id: 'capture-and-review',
        title: 'Capture and review',
        children: [
          '/docs/memory/session-capture',
          '/docs/memory/capture-flow',
          {
            id: 'consolidation-and-review',
            title: 'Consolidation and review',
            children: [
              '/docs/memory/capture-consolidation',
              '/docs/memory/review-pending-memory',
            ],
          },
          '/docs/memory/published-memories',
          {
            id: 'variables-and-troubleshooting',
            title: 'Variables and troubleshooting',
            children: [
              '/docs/memory/capture-variables',
              '/docs/memory/capture-troubleshooting',
            ],
          },
        ],
      },
      '/docs/memory/backup-restore',
    ],
  ],
  [
    'admin',
    [
      {
        id: 'company-and-team-access',
        title: 'Company and Team access',
        children: [
          '/docs/admin/company-access',
          {
            id: 'teams',
            title: 'Teams',
            children: [
              '/docs/admin/manage-teams',
              '/docs/admin/first-team-owner',
            ],
          },
          '/docs/admin/members',
          {
            id: 'client-and-skill-grants',
            title: 'Client and skill grants',
            children: [
              '/docs/admin/clients',
              '/docs/admin/skill-grants',
            ],
          },
        ],
      },
      {
        id: 'admin-operations',
        title: 'Admin operations',
        children: [
          '/docs/admin/team-os-admin',
          '/docs/admin/admin-guided-path',
          '/docs/admin/admin-surfaces',
          '/docs/admin/owner-password-reset',
          {
            id: 'monitoring',
            title: 'Monitoring',
            children: [
              '/docs/admin/health-checks',
              '/docs/admin/memory-status',
              '/docs/admin/sync-status',
              '/docs/admin/command-centre-checks',
            ],
          },
        ],
      },
      {
        id: 'verification',
        title: 'Verification',
        children: [
          '/docs/admin/team-os-verification',
          {
            id: 'prepare',
            title: 'Prepare',
            children: [
              '/docs/admin/verification-test-store',
              '/docs/admin/verification-start-api',
              '/docs/admin/verification-owner-login',
            ],
          },
          {
            id: 'test-behavior',
            title: 'Test behavior',
            children: [
              '/docs/admin/verification-memory',
              '/docs/admin/verification-member-restrictions',
              '/docs/admin/verification-revoke',
              '/docs/admin/verification-file-sync',
            ],
          },
          {
            id: 'finish-checks',
            title: 'Finish checks',
            children: [
              '/docs/admin/verification-command-centre',
              '/docs/admin/verification-automated-checks',
            ],
          },
        ],
      },
      {
        id: 'troubleshooting',
        title: 'Troubleshooting',
        children: [
          '/docs/admin/team-os-troubleshooting',
          '/docs/admin/troubleshooting-login-grants',
          '/docs/admin/troubleshooting-memory-search',
          '/docs/admin/troubleshooting-sync',
          '/docs/admin/troubleshooting-api-database',
          '/docs/admin/troubleshooting-workspace-backup',
          '/docs/admin/troubleshooting-pglite',
        ],
      },
    ],
  ],
  [
    'contribute',
    [
      {
        id: 'write-docs',
        title: 'Write docs',
        children: [
          '/docs/contribute/style-guide',
          '/docs/contribute/visual-style',
          '/docs/contribute/authoring-kit',
        ],
      },
      {
        id: 'review-docs',
        title: 'Review docs',
        children: [
          '/docs/contribute/source-docs-reuse-matrix',
          '/docs/contribute/quality-checks',
        ],
      },
    ],
  ],
]);

function createSidebarGroup(
  parentId: string,
  group: SidebarGroup,
  children: Node[],
): Folder {
  return {
    $id: `${parentId}:${group.id}`,
    type: 'folder',
    name: group.title,
    defaultOpen: false,
    collapsible: true,
    children,
  };
}

function getSidebarEntryUrls(entry: SidebarEntry): string[] {
  if (typeof entry === 'string') {
    return [entry];
  }

  return entry.children.flatMap(getSidebarEntryUrls);
}

function createSidebarEntryNode(
  parentId: string,
  entry: SidebarEntry,
  foundByUrl: Map<string, Node>,
): Node | undefined {
  if (typeof entry === 'string') {
    return foundByUrl.get(entry);
  }

  return createSidebarGroupNode(parentId, entry, foundByUrl);
}

function createSidebarGroupNode(
  parentId: string,
  group: SidebarGroup,
  foundByUrl: Map<string, Node>,
): Folder | undefined {
  const groupId = `${parentId}:${group.id}`;
  const children = group.children
    .map((child) => createSidebarEntryNode(groupId, child, foundByUrl))
    .filter((child): child is Node => Boolean(child));

  if (children.length === 0) {
    return undefined;
  }

  return createSidebarGroup(parentId, group, children);
}

function groupSidebarNode(node: Node): Node {
  if (node.type !== 'folder') {
    return node;
  }

  const children = node.children.map(groupSidebarNode);
  const folderPath = node.$ref?.folder;
  const groups = folderPath ? sidebarGroupsByFolder.get(folderPath) : undefined;

  if (!groups?.length) {
    return { ...node, children };
  }

  let remaining = children;
  const grouped: Node[] = [];
  const parentId = node.$id ?? node.$ref?.folder ?? 'folder';

  for (const group of groups) {
    const groupUrls = new Set(getSidebarEntryUrls(group));
    const foundByUrl = new Map<string, Node>();

    remaining = remaining.filter((child) => {
      if (child.type === 'page' && groupUrls.has(child.url)) {
        foundByUrl.set(child.url, child);
        return false;
      }

      return true;
    });

    const groupNode = createSidebarEntryNode(parentId, group, foundByUrl);

    if (groupNode) {
      grouped.push(groupNode);
    }
  }

  return {
    ...node,
    children: [...remaining, ...grouped],
  };
}

function groupSidebarTree(root: Root): Root {
  return {
    ...root,
    children: root.children.map(groupSidebarNode),
    fallback: root.fallback ? groupSidebarTree(root.fallback) : root.fallback,
  };
}

const baseSource = loader({
  baseUrl: docsRoute,
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

const getBasePageTree = baseSource.getPageTree.bind(baseSource);

baseSource.getPageTree = (locale?: string) => {
  return groupSidebarTree(getBasePageTree(locale));
};

export const source = baseSource;

export function getPageImage(page: (typeof source)['$inferPage']) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: `${docsImageRoute}/${segments.join('/')}`,
  };
}

export function getPageMarkdownUrl(page: (typeof source)['$inferPage']) {
  const segments = [...page.slugs, 'content.md'];

  return {
    segments,
    url: `${docsContentRoute}/${segments.join('/')}`,
  };
}

export async function getLLMText(page: (typeof source)['$inferPage']) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title} (${page.url})

${processed}`;
}
