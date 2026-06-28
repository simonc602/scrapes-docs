import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';

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
      nav={nav}
    >
      {children}
    </DocsLayout>
  );
}
