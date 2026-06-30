import { docs } from 'collections/server';
import type { Folder, Node, Root } from 'fumadocs-core/page-tree';
import { loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { docsContentRoute, docsImageRoute, docsRoute } from './shared';

type SidebarGroup = {
  id: string;
  title: string;
  urls: string[];
};

const sidebarGroupsByFolder = new Map<string, SidebarGroup[]>([
  [
    'get-started',
    [
      {
        id: 'install-agentic-os',
        title: 'Install Agentic OS',
        urls: [
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
        urls: [
          '/docs/agentic-os/what-is-agentic-os',
          '/docs/agentic-os/core-concepts',
          '/docs/agentic-os/workspace-structure',
          '/docs/agentic-os/custom-edits',
          '/docs/agentic-os/multi-client-workspaces',
        ],
      },
    ],
  ],
]);

function createSidebarGroup(
  parent: Folder,
  group: SidebarGroup,
  children: Node[],
): Folder {
  return {
    $id: `${parent.$id ?? parent.$ref?.folder ?? 'folder'}:${group.id}`,
    type: 'folder',
    name: group.title,
    defaultOpen: true,
    collapsible: true,
    children,
  };
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
  const grouped: Folder[] = [];

  for (const group of groups) {
    const groupUrls = new Set(group.urls);
    const foundByUrl = new Map<string, Node>();

    remaining = remaining.filter((child) => {
      if (child.type === 'page' && groupUrls.has(child.url)) {
        foundByUrl.set(child.url, child);
        return false;
      }

      return true;
    });

    const groupChildren = group.urls
      .map((url) => foundByUrl.get(url))
      .filter((child): child is Node => Boolean(child));

    if (groupChildren.length > 0) {
      grouped.push(createSidebarGroup(node, group, groupChildren));
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
