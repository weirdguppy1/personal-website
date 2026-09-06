"use client";

import { useRef } from "react";

type Props = {
  title: string;
  kind?: "venture" | "project";
  tagline?: string;
  year?: string;
  demo?: string;
  children: React.ReactNode; // server-rendered project body
};

const kindLabel = "text-xs tracking-widest text-muted-2";

export default function ProjectCard({
  title,
  kind,
  tagline,
  year,
  demo,
  children,
}: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.showModal()}
        className="card group w-full text-left font-sans border border-rule bg-surface/40 rounded-lg p-5 flex flex-col gap-3 hover:cursor-pointer"
      >
        <div className="flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between gap-4">
            <span className="font-windsor text-2xl text-foreground">
              {title}
            </span>
            <span className="text-xs text-muted-2 whitespace-nowrap transition-transform group-hover:translate-x-1">
              →
            </span>
          </div>
          {kind && <span className={kindLabel}>{kind}</span>}
        </div>
        {tagline && (
          <span className="text-sm leading-relaxed text-muted">{tagline}</span>
        )}
        {year && <span className="text-xs text-muted-2">{year}</span>}
      </button>

      <dialog
        ref={ref}
        // ponytail: native <dialog> handles focus trap, Esc, and backdrop
        onClick={(e) => e.target === ref.current && ref.current.close()}
        className="modal m-auto w-[calc(100%-2rem)] max-w-xl max-h-[85vh] overflow-y-auto bg-background text-foreground border border-rule rounded-xl p-6 sm:p-8 backdrop:bg-black/40 backdrop:backdrop-blur-sm"
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            {kind && <span className={`${kindLabel} block mb-2`}>{kind}</span>}
            <h2 className="font-windsor text-4xl leading-[1.05] tracking-tight">
              {title}
            </h2>
            {tagline && (
              <p className="mt-2 font-sans text-sm text-muted">{tagline}</p>
            )}
            <p className="mt-3 font-sans text-xs text-muted-2 flex flex-wrap gap-x-4">
              {year && <span>{year}</span>}
              {demo && (
                <a
                  href={demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 decoration-rule hover:text-foreground transition-colors"
                >
                  {demo.replace(/^https?:\/\//, "")} ↗
                </a>
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            aria-label="close"
            className="font-sans text-sm text-muted-2 hover:text-foreground transition-colors shrink-0"
          >
            esc
          </button>
        </div>
        <div className="mt-4 h-px w-12 bg-rule" />
        <div className="mt-2">{children}</div>
      </dialog>
    </>
  );
}
