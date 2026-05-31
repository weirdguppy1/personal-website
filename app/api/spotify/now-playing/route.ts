// app/api/spotify/now-playing/route.ts

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_NOW_PLAYING_URL =
  "https://api.spotify.com/v1/me/player/currently-playing";

async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID!;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN!;

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    console.log(refreshToken)
    
  const res = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  return res.json();
}

export async function GET() {
  try {
    const { access_token } = await getAccessToken();

    const res = await fetch(SPOTIFY_NOW_PLAYING_URL, {
      headers: { Authorization: `Bearer ${access_token}` },
      // Don't cache — we want live data
      cache: "no-store",
    });

    // 204 = nothing playing
    if (res.status === 204 || res.status > 400) {
      return Response.json({ isPlaying: false });
    }

    const data = await res.json();

    // Could be a podcast episode, not a track
    if (data.currently_playing_type !== "track") {
      return Response.json({ isPlaying: false });
    }

    const track = {
      isPlaying: data.is_playing,
      title: data.item.name,
      artist: data.item.artists.map((a: { name: string }) => a.name).join(", "),
      album: data.item.album.name,
      albumArt: data.item.album.images[0]?.url ?? null,
      songUrl: data.item.external_urls.spotify,
      previewUrl: data.item.preview_url ?? null,
      progressMs: data.progress_ms,
      durationMs: data.item.duration_ms,
    };

    return Response.json(track);
  } catch {
    return Response.json({ isPlaying: false });
  }
}