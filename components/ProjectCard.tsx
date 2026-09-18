"use client";

import { useRef } from "react";
import Image from "next/image";

type Props = {
  title: string;
  kind?: "venture" | "project";
  tagline?: string;
  year?: string;
  demo?: string;
  thumb?: string;
  children: React.ReactNode; // server-rendered project body
};

const kindPill = (kind: "venture" | "project") =>
  `pill font-sans ${kind === "venture" ? "pill-venture" : "pill-project"}`;

export default function ProjectCard({
  title,
  kind,
  tagline,
  year,
  demo,
  thumb,
  children,
}: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.showModal()}
        className="card group w-full overflow-hidden text-left font-sans border border-rule bg-surface/40 rounded-lg p-5 flex flex-col gap-3 hover:cursor-pointer"
      >
        {thumb && (
          <div className="relative -mx-5 -mt-5 mb-1 aspect-[16/9] w-[calc(100%+2.5rem)] overflow-hidden rounded-t-lg border-b border-rule bg-surface">
            <Image
              src={thumb}
              alt=""
              fill
              sizes="(min-width: 640px) 288px, 100vw"
              className="object-cover"
            />
          </div>
        )}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between gap-4">
            <span className="font-sans text-xl font-medium tracking-tight text-foreground">
              {title}
            </span>
            <span className="text-xs text-muted-2 whitespace-nowrap transition-transform group-hover:translate-x-1">
              →
            </span>
          </div>
          {kind && (
            <span className={`${kindPill(kind)} self-start`}>{kind}</span>
          )}
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
            {kind && (
              <span className={`${kindPill(kind)} mb-2`}>{kind}</span>
            )}
            <h2 className="font-sans text-3xl font-semibold leading-[1.1] tracking-tight">
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
