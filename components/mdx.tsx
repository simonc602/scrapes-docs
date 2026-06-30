import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Callout } from 'fumadocs-ui/components/callout';
import { Card, Cards } from 'fumadocs-ui/components/card';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import Link, { type LinkProps } from 'fumadocs-core/link';
import type { MDXComponents } from 'mdx/types';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

function joinClassNames(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

function Table({ className, ...props }: ComponentPropsWithoutRef<'table'>) {
  return (
    <div
      aria-label="Scrollable table"
      className="docs-table-scroll"
      role="region"
      tabIndex={0}
    >
      <table
        className={['docs-table', className].filter(Boolean).join(' ')}
        {...props}
      />
    </div>
  );
}

function FeatureCards({
  className,
  ...props
}: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={joinClassNames(
        'not-prose grid grid-cols-1 gap-3 md:grid-cols-2',
        className,
      )}
      {...props}
    />
  );
}

type FeatureCardProps = Omit<LinkProps, 'children' | 'title'> & {
  cover: string;
  coverAlt?: string;
  description?: ReactNode;
  title: ReactNode;
};

function FeatureCard({
  className,
  cover,
  coverAlt = '',
  description,
  href = '#',
  title,
  ...props
}: FeatureCardProps) {
  return (
    <Link
      data-card="true"
      href={href}
      className={joinClassNames(
        'group block overflow-hidden rounded-lg border bg-fd-card text-fd-card-foreground transition-colors hover:bg-fd-accent/50',
        className,
      )}
      {...props}
    >
      <div className="aspect-[2/1] overflow-hidden border-b bg-fd-muted">
        <img
          src={cover}
          alt={coverAlt}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="mb-1 text-sm font-medium">{title}</h3>
        {description ? (
          <p className="m-0 text-sm text-fd-muted-foreground">{description}</p>
        ) : null}
      </div>
    </Link>
  );
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Callout,
    Card,
    Cards,
    FeatureCard,
    FeatureCards,
    Tab,
    Tabs,
    table: Table,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
