const projects: any[] = [
  {
    name: "Halftone",
    year: "2024",
    description:
      "An image-to-ASCII renderer with a focus on typographic detail and tasteful dithering.",
    stack: ["Rust", "WASM"],
    href: "#",
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
        <h1 className="mt-6 font-serif text-5xl sm:text-6xl leading-[1.05] tracking-tight text-foreground">
          Mark <span className="italic text-muted">Fang</span>
        </h1>

        <p className="mt-3 font-mono text-xs tracking-tight text-foreground">
          i {"<3"} building & philosophy.
        </p>

        <div className="mt-5 h-px w-12 bg-rule" />

        <p className="mt-5 text-[12px] leading-relaxed text-muted max-w-md font-mono">
          hello, name's mark. i attend{" "}
          <span className="underline decoration-[#00205B] underline-offset-4">
            rice university
          </span>{" "}
          studying cs & business. into tech of all sorts, especially startups
          and roblox game development.
        </p>

        <section className="mt-20 w-full text-left">
          <header className="flex items-baseline justify-between">
            <h2 className="font-mono text-md text-foreground">projects</h2>
          </header>

          <ul className="mt-2 divide-y divide-rule">
            {projects.map((project, index) => (
              <li
                key={project.name}
                className={""}
              >
                <a
                  href={project.href}
                  className="flex items-baseline justify-between gap-8 py-3.5 font-mono transition-opacity hover:opacity-50"
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
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20 w-full text-left">
          <h2 className="font-mono text-md text-foreground">elsewhere</h2>
          <ul className="mt-5 flex-col">
            {links.map((link) => (
              <li key={link.label}>
                <a
                
                  href={link.href}
                  className="text-sm font-mono underline text-muted-2 rainbow-text"
                  target="_blank" rel="noopener noreferrer"
                >
                  <span>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-24 font-mono text-[10.5px] text-muted-2">
          "we suffer more in imagination than in reality." - seneca
        </footer>
      </div>
    </main>
  );
}
