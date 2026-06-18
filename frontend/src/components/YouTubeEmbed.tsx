import { getYouTubeId } from "../lib/youtube";

export function YouTubeEmbed({ url, title }: { url?: string | null; title: string }) {
  const videoId = getYouTubeId(url);
  if (!videoId) return null;

  return (
    <div className="aspect-video w-full overflow-hidden rounded-xl bg-slate-900 shadow-lg">
      <iframe
        className="h-full w-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
