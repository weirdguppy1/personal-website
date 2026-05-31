"use client";

import { useState } from "react";
import Image from "next/image";

type Photo = {
  src?: string;
  caption?: string;
  ratio?: string;
  alt?: string;
};

export default function PhotoCarousel({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState(0);
  const total = photos.length;
  if (total === 0) return null;

  const photo = photos[index];
  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <div className="space-y-2">
      <div
        className="w-full overflow-hidden bg-surface border border-rule relative"
        style={{ aspectRatio: photo.ratio ?? "4 / 3" }}
      >
        {photo.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <Image
            src={photo.src}
            alt={photo.alt ?? photo.caption ?? ""}
            className="h-full w-full object-cover"
            fill
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center font-mono text-[10px] text-muted-2">
            ◌
          </div>
        )}
      </div>

      <div className="flex items-center justify-between font-mono text-[10.5px] text-muted-2">
        <span className="truncate pr-3">{photo.caption}</span>
        {total > 1 && (
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={prev}
              aria-label="previous"
              className="hover:text-foreground transition-colors"
            >
              ←
            </button>
            <span className="tabular-nums">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <button
              onClick={next}
              aria-label="next"
              className="hover:text-foreground transition-colors"
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
