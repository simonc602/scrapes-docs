import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="inline-flex items-center gap-2 font-semibold">
          <img
            src="/assets/agentic-os-logo.png"
            alt=""
            className="size-6 shrink-0 transition-[filter] dark:invert"
          />
          <span>{appName}</span>
        </span>
      ),
      url: '/docs/get-started',
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
