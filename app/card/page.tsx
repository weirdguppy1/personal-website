import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "mark fang",
  description: "cs & philosophy @ rice university. save my contact.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0e0e" },
  ],
};

const LINKEDIN = "https://www.linkedin.com/in/mark-fang-60217a304/";
const EMAIL = "yf57@rice.edu";

export default function Card() {
  return (
    <main className="min-h-svh flex justify-center px-6 pt-[max(4rem,env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))]">
      <div className="w-full max-w-sm flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <Image
            src="/me.jpg"
            alt="mark fang"
            width={224}
            height={224}
            preload
            className="reveal size-28 rounded-full border border-rule bg-surface object-cover"
          />

          <h1 className="reveal mt-8 font-windsor text-5xl leading-[1.05] tracking-tight text-foreground">
            mark fang
          </h1>
          <p className="reveal mt-3 font-sans text-sm text-muted">
            cs & philosophy @ rice university
          </p>

          <div className="reveal mt-6 h-px w-12 bg-rule" />

          <p className="reveal mt-6 max-w-xs text-balance font-sans text-[15px] leading-relaxed text-foreground">
            welcome to my site! im interested in consumer apps, roblox dev, and philosophy.
          </p>
        </div>

        <div className="reveal mt-12 flex flex-col gap-3">
          <a
            href="/card/contact.vcf"
            className="flex h-14 items-center justify-center gap-2.5 rounded-2xl bg-foreground font-sans text-[15px] font-medium text-background transition-transform active:scale-[0.98]"
          >
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="size-[18px]"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="8" r="4" />
              <path d="M2 21a7 7 0 0 1 14 0M19 8v6M16 11h6" />
            </svg>
            save contact
          </a>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 items-center justify-center gap-2.5 rounded-2xl bg-[#0a66c2] font-sans text-[15px] font-medium text-white transition-transform active:scale-[0.98]"
          >
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="size-[18px]"
              fill="currentColor"
            >
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
            </svg>
            connect on linkedin
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="flex h-14 items-center justify-center gap-2.5 rounded-2xl border border-rule bg-surface font-sans text-[15px] font-medium text-foreground transition-transform active:scale-[0.98]"
          >
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="size-[18px]"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-10 6L2 7" />
            </svg>
            yf57@rice.edu
          </a>

          <Link
            href="/"
            className="mt-5 self-center font-sans text-xs text-muted-2 underline underline-offset-4 decoration-rule"
          >
            more about me
          </Link>
        </div>
      </div>
    </main>
  );
}
