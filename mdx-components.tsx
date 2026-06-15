import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="font-mono text-3xl tracking-tight text-foreground mt-10 mb-3">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-foreground mt-10 mb-3">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted mt-6 mb-2">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="font-mono text-[12px] leading-relaxed text-muted my-3">
      {children}
    </p>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline underline-offset-4 decoration-rule hover:text-foreground transition-colors"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="font-mono text-[12px] leading-relaxed text-muted my-3 list-none pl-0 space-y-1.5">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="font-mono text-[12px] leading-relaxed text-muted my-3 list-decimal pl-5 space-y-1.5">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="before:content-['—'] before:mr-2 before:text-muted-2">
      {children}
    </li>
  ),
  code: ({ children }) => (
    <code className="font-mono text-[11px] bg-surface text-foreground px-1.5 py-0.5 rounded-sm">
      {children}
    </code>
  ),
  blockquote: ({ children }) => (
    <blockquote className="font-serif italic text-foreground text-base border-l border-rule pl-4 my-6">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-10 border-0 h-px bg-rule" />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
