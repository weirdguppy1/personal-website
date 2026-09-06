import fs from "node:fs";
import path from "node:path";
import NowPlaying from "@/components/NowPlaying";
import PhotoCarousel from "@/components/PhotoCarousel";
import ProjectCard from "@/components/ProjectCard";

type ProjectMeta = {
  title?: string;
  kind?: "venture" | "project";
  tagline?: string;
  year?: string;
  demo?: string;
  photos?: { src?: string; caption?: string; ratio?: string; alt?: string }[];
};

async function loadProjects() {
  const dir = path.join(process.cwd(), "content", "projects");
  const slugs = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
  return Promise.all(
    slugs.map(async (slug) => {
      const mod = await import(`@/content/projects/${slug}.mdx`);
      return {
        slug,
        Content: mod.default as React.ComponentType,
        meta: (mod.meta ?? {}) as ProjectMeta,
      };
    }),
  );
}

const links = [
  { label: "github", href: "https://github.com/weirdguppy1" },
  { label: "email", href: "mailto:yf57@rice.edu" },
  {
    label: "linkedin",
    href: "https://www.linkedin.com/in/mark-fang-60217a304/",
  },
];

export default async function Home() {
  const projects = await loadProjects();

  return (
    <main className="flex-1 flex justify-center px-6 py-20 sm:py-28">
      <div className="w-full max-w-xl flex flex-col items-center text-center">
        <h1 className="reveal mt-6 font-windsor text-6xl sm:text-7xl leading-[1.05] tracking-tight text-foreground">
          sup, i'm mark.
        </h1>
        <p className="reveal mt-3 font-sans text-sm text-muted">
          i {"<3"} building & philosophy.
        </p>

        <div className="reveal mt-5 h-px w-12 bg-rule" />

        <p className="reveal mt-5 text-[15px] leading-relaxed text-foreground max-w-md font-sans">
          i attend{" "}
          <span className="underline decoration-[#00205B] underline-offset-4 rainbow-text">
            rice university
          </span>{" "}
          studying cs & business. into tech of all sorts, especially startups
          and roblox game development.
        </p>

        <section className="reveal mt-20 w-full text-left">
          <h2 className="font-windsor text-xl text-foreground mb-5">
            currently
          </h2>
          <NowPlaying />
        </section>

        <section className="reveal mt-20 w-full text-left">
          <h2 className="font-windsor text-xl text-foreground">projects</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.map(({ slug, Content, meta }) => (
              <ProjectCard
                key={slug}
                title={meta.title ?? slug}
                kind={meta.kind}
                tagline={meta.tagline}
                year={meta.year}
                demo={meta.demo}
              >
                <Content />
                {meta.photos?.length ? (
                  <div className="mt-8">
                    <PhotoCarousel photos={meta.photos} />
                  </div>
                ) : null}
              </ProjectCard>
            ))}
          </div>
        </section>

        <section className="reveal mt-20 w-full text-left">
          <h2 className="font-windsor text-xl text-foreground">elsewhere</h2>
          <ul className="mt-4 flex flex-col gap-1.5">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-[15px] font-sans underline underline-offset-4 text-muted-2 rainbow-text hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="reveal mt-20 w-full text-left">
          <h2 className="font-windsor text-xl text-foreground mb-5">
            in the past
          </h2>
          <ul className="list-disc list-inside space-y-4">
            <li>made my first $5k in 9th grade building Roblox games.</li>
            <li>started an education company doing $10k+ in revenue.</li>
            <li>
              did social media for fun, grew youtube & tiktok to 15k+ follows
              and 5m+ views.
            </li>
            <li>
              interviewed randos (like sam altman) on a dumb podcast. made the
              news.
            </li>
            <li>
              earned a merit scholarship to rice university and admitted to uiuc
              cs.
            </li>
          </ul>
        </section>

        <footer className="reveal mt-24 font-sans text-xs text-muted-2">
          "we suffer more in imagination than in reality." - seneca
        </footer>
      </div>
    </main>
  );
}
