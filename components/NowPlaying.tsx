"use client";

import { useEffect, useState, useRef, SVGProps } from "react";

interface Track {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumArt?: string | null;
  songUrl?: string;
  progressMs?: number;
  durationMs?: number;
}

export default function NowPlaying() {
  const [track, setTrack] = useState<Track | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progressMs, setProgressMs] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  async function fetchNowPlaying() {
    try {
      const res = await fetch("/api/spotify/now-playing");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: Track = await res.json();
      setTrack(data);
      if (data.isPlaying && data.progressMs != null) {
        setProgressMs(data.progressMs);
      }
      setError(null);
    } catch (err) {
      console.error("NowPlaying fetch error:", err);
      setError(String(err));
      setTrack({ isPlaying: false });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (track?.isPlaying && track.durationMs) {
      tickRef.current = setInterval(() => {
        setProgressMs((p) => Math.min(p + 1000, track.durationMs!));
      }, 1000);
    }
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, [track?.isPlaying, track?.durationMs]);

  useEffect(() => {
    fetchNowPlaying();
    intervalRef.current = setInterval(fetchNowPlaying, 30_000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const progressPct =
    track?.durationMs && track.durationMs > 0
      ? (progressMs / track.durationMs) * 100
      : 0;

  if (isLoading) {
    return (
      <div className="flex items-center gap-3 w-full font-mono">
        <div className="w-9 h-9 rounded bg-surface animate-pulse shrink-0" />
        <div className="flex flex-col gap-1.5 flex-1">
          <div className="h-2 w-20 rounded-full bg-surface animate-pulse" />
          <div className="h-2 w-32 rounded-full bg-surface animate-pulse" />
        </div>
      </div>
    );
  }

  if (error || !track?.isPlaying) {
    return (
      <div className="flex items-center gap-2 w-full font-mono">
        <p className="text-sm text-muted-2 flex items-center space-x-2">
          <SpotifyIcon className="w-5 h-5 text-green-500" />
          <span>not listening to anything right now</span>
        </p>
      </div>
    );
  }

  return (
    <a
      href={track.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 w-full font-mono no-underline transition-opacity hover:opacity-70"
    >
      {track.albumArt ? (
        <img
          src={track.albumArt}
          alt={track.album}
          className="w-11 h-11 rounded object-cover shrink-0"
        />
      ) : (
        <div className="w-11 h-11 rounded bg-surface shrink-0" />
      )}

      <div className="flex flex-col min-w-0 flex-1 gap-0.5">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse shrink-0" />
          <span className="text-xs text-muted-2 tracking-widest">
            mark is listening to{" "}
            <span className="text-green-500 uppercase">spotify</span> right now.
          </span>
        </div>
        <p className="text-sm text-foreground truncate leading-tight">
          {track.title}
          <span className="text-muted"> — {track.artist}</span>
        </p>
        <div className="h-px w-full bg-rule overflow-hidden mt-1">
          <div
            className="h-full bg-foreground transition-all duration-1000 ease-linear"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>
    </a>
  );
}

export function SpotifyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      {...props}
    >
      <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.669 11.538a.5.5 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686m.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858m.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288" />
    </svg>
  );
}
