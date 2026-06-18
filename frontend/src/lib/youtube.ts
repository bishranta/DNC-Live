export function getYouTubeId(url?: string | null): string | null {
  if (!url) return null;
  return url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)?.[1] ?? null;
}
