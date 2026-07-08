import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Callout } from 'fumadocs-ui/components/callout';
import { Card, Cards } from 'fumadocs-ui/components/card';
import {
  ImageZoom,
  type ImageZoomProps,
} from 'fumadocs-ui/components/image-zoom';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import Link, { type LinkProps } from 'fumadocs-core/link';
import diagrams from '@/content/diagrams/diagrams.json';
import type { MDXComponents } from 'mdx/types';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

function joinClassNames(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

function getImageSrc(src: ComponentPropsWithoutRef<'img'>['src']) {
  if (typeof src === 'string') {
    return src;
  }

  if (!src || typeof src !== 'object') {
    return undefined;
  }

  const source = src as { default?: { src?: unknown }; src?: unknown };

  if (typeof source.default?.src === 'string') {
    return source.default.src;
  }

  if (typeof source.src === 'string') {
    return source.src;
  }

  return undefined;
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

function ZoomableImage({
  alt = '',
  className,
  src,
  ...props
}: ComponentPropsWithoutRef<'img'>) {
  const imageSrc = getImageSrc(src);

  if (!imageSrc) {
    return <img {...props} alt={alt} className={className} src={src} />;
  }

  return (
    <ImageZoom
      alt={alt}
      className={className}
      src={src as ImageZoomProps['src']}
      zoomInProps={{ alt }}
    >
      <img {...props} alt={alt} className={className} src={imageSrc} />
    </ImageZoom>
  );
}

function MarkdownImage({
  className,
  ...props
}: ComponentPropsWithoutRef<'img'>) {
  return (
    <ZoomableImage
      {...props}
      className={joinClassNames('rounded-lg', className)}
    />
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

type DiagramEntry = {
  alt: string;
  id: string;
  image: string;
  pages: string[];
  source: string;
  title: string;
};

const diagramEntries = diagrams as DiagramEntry[];

function DocsDiagram({
  className,
  id,
}: {
  className?: string;
  id: string;
}) {
  const diagram = diagramEntries.find((entry) => entry.id === id);

  if (!diagram) {
    throw new Error(`Unknown docs diagram: ${id}`);
  }

  return (
    <figure
      className={joinClassNames(
        'not-prose my-6 overflow-hidden rounded-lg border bg-fd-card',
        className,
      )}
    >
      <ZoomableImage
        src={diagram.image}
        alt={diagram.alt}
        className="block h-auto w-full bg-fd-muted"
        loading="lazy"
        decoding="async"
      />
      <figcaption className="border-t px-4 py-3 text-sm font-medium text-fd-muted-foreground">
        {diagram.title}
      </figcaption>
    </figure>
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
    DocsDiagram,
    Tab,
    Tabs,
    img: MarkdownImage,
    table: Table,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
