import NowPlaying from "@/components/NowPlaying";
import Link from "next/link";

const projects: any[] = [
  {
    name: "RocademySTL",
    description:
      "founded a profitable game development camp in the St. Louis area.",
    href: "/projects/rocademy",
  },
];

const links = [
  { label: "github", href: "https://github.com/weirdguppy1" },
  { label: "email", href: "mailto:yf57@rice.edu" },
  {
    label: "linkedin",
    href: "https://www.linkedin.com/in/mark-fang-60217a304/",
  },
];

export default function Home() {
  return (
    <main className="flex-1 flex justify-center px-6 py-20 sm:py-28">
      <div className="w-full max-w-xl flex flex-col items-center text-center">
        <h1 className="mt-6 font-mono text-5xl sm:text-6xl leading-[1.05] tracking-tight text-foreground">
          Mark Fang
        </h1>
        <p className="mt-3 font-mono text-xs tracking-tight text-muted">
          i {"<3"} building & philosophy.
        </p>

        <div className="mt-5 h-px w-12 bg-rule" />

        {/* paragraph */}
        <p className="mt-5 text-[12px] leading-relaxed text-foreground max-w-md font-mono">
          hello, name's mark. i attend{" "}
          <span className="underline decoration-[#00205B] underline-offset-4 rainbow-text">
            rice university
          </span>{" "}
          studying cs & business. into tech of all sorts, especially startups
          and roblox game development.
        </p>

        <section className="mt-20 w-full text-left">
          <header className="flex items-baseline justify-between">
            <h2 className="font-mono text-md text-foreground font-bold">projects</h2>
          </header>

          <ul className="mt-2 divide-y divide-rule">
            {projects.map((project) => (
              <li key={project.name}>
                <Link
                  href={project.href}
                  className="flex items-baseline justify-between gap-8 py-3.5 font-mono transition-opacity hover:opacity-5"
                >
                  <span className="text-[13px] text-foreground whitespace-nowrap">
                    {project.name}
                  </span>

                  <span className="flex-1 px-8 text-[12px] text-muted overflow-hidden text-ellipsis whitespace-nowrap">
                    {project.description}
                  </span>

                  <span className="text-[12px] text-muted-2 whitespace-nowrap">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20 w-full text-left">
          <h2 className="font-mono text-md text-foreground font-bold">elsewhere</h2>
          <ul className="mt-5 flex-col">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm font-mono underline text-muted-2 rainbow-text"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20 w-full text-left">
          <h2 className="font-mono text-md text-foreground mb-5">currently</h2>
          <NowPlaying />
        </section>

        <footer className="mt-24 font-mono text-[10.5px] text-muted-2">
          "we suffer more in imagination than in reality." - seneca
        </footer>
      </div>
    </main>
  );
}
