import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import type { LayoutTab } from 'fumadocs-ui/layouts/shared';

function renderNavbarTab(option: LayoutTab): LayoutTab {
  const icon = option.icon;

  if (!icon) {
    return option;
  }

  return {
    ...option,
    title: (
      <span className="docs-navbar-tab-title inline-flex items-center gap-2">
        <span
          aria-hidden="true"
          className="docs-navbar-tab-icon size-4 shrink-0 text-current [&_svg]:size-4"
        >
          {icon}
        </span>
        <span>{option.title}</span>
      </span>
    ),
  };
}

export default function Layout({ children }: LayoutProps<'/docs'>) {
  const options = baseOptions();
  const nav = options.nav
    ? { ...options.nav, mode: 'top' as const }
    : { mode: 'top' as const };

  return (
    <DocsLayout
      {...options}
      tree={source.getPageTree()}
      tabMode="navbar"
      tabs={{ transform: renderNavbarTab }}
      nav={nav}
    >
      {children}
    </DocsLayout>
  );
}
