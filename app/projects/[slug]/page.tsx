import { notFound } from "next/navigation";
import Link from "next/link";
import fs from "node:fs";
import path from "node:path";
import PhotoCarousel from "@/components/PhotoCarousel";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export async function generateStaticParams() {
  const files = fs.readdirSync(PROJECTS_DIR);
  return files
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => ({ slug: f.replace(/\.mdx$/, "") }));
}

type ProjectMeta = {
  title?: string;
  accent?: string;
  tagline?: string;
  year?: string;
  stack?: string;
  status?: string;
  source?: string;
  demo?: string;
  photos?: Array<{
    src?: string;
    caption?: string;
    ratio?: string;
    alt?: string;
  }>;
  video?: {
    src?: string;
    poster?: string;
    duration?: string;
    caption?: string;
  };
};

async function loadProject(slug: string) {
  try {
    const mod = await import(`@/content/projects/${slug}.mdx`);
    return {
      Content: mod.default as React.ComponentType,
      meta: (mod.meta ?? {}) as ProjectMeta,
    };
  } catch {
    return null;
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await loadProject(slug);
  if (!project) notFound();

  const { Content, meta } = project;
  const tags = [meta.year, meta.stack, meta.status].filter(Boolean);

  return (
    <main className="flex-1 flex justify-center px-6 py-16 sm:py-24">
      <article className="w-full max-w-xl">
        <Link
          href="/"
          className="font-mono text-[11px] text-muted-2 hover:text-foreground transition-colors"
        >
          ← back
        </Link>

        {meta.video && (
          <section className="mt-8 space-y-2">
            <div
              className="w-full overflow-hidden bg-surface border border-rule"
              style={{ aspectRatio: "16 / 9" }}
            >
              {meta.video.src ? (
                <video
                  src={meta.video.src}
                  poster={meta.video.poster}
                  controls
                  playsInline
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center font-mono text-[10px] text-muted-2">
                  ▶ {meta.video.duration ?? "demo"}
                </div>
              )}
            </div>
            {meta.video.caption && (
              <figcaption className="font-mono text-[10.5px] text-muted-2">
                {meta.video.caption}
                {meta.video.duration && meta.video.src && (
                  <span> · {meta.video.duration}</span>
                )}
              </figcaption>
            )}
          </section>
        )}

        <header className="mt-10 sm:mt-14">
          <h1 className="font-mono text-4xl sm:text-5xl leading-[1.05] tracking-tight text-foreground">
            {meta.title}
            {meta.accent && (
              <span className="italic text-muted">{meta.accent}</span>
            )}
          </h1>
          {meta.tagline && (
            <p className="mt-3 font-mono text-xs tracking-tight text-muted">
              {meta.tagline}
            </p>
          )}

          <div className="mt-5 h-px w-12 bg-rule" />

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] text-muted-2">
            {tags.length > 0 && <span>{tags.join(" · ")}</span>}
            {(meta.source || meta.demo) && tags.length > 0 && (
              <span aria-hidden className="text-rule">
                |
              </span>
            )}
            {meta.demo && (
              <a
                href={meta.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 text-md underline underline-offset-4 decoration-rule hover:text-foreground hover:decoration-foreground transition-colors"
              >
                {meta.demo}
              </a>
            )}
            {meta.source && (
              <a
                href={meta.source}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 decoration-rule hover:text-foreground hover:decoration-foreground transition-colors"
              >
                source ↗
              </a>
            )}
          </div>
        </header>

        <section className="mt-4">
          <Content />
        </section>

        {meta.photos && meta.photos.length > 0 && (
          <section className="mt-12">
            <PhotoCarousel photos={meta.photos} />
          </section>
        )}
      </article>
    </main>
  );
}
