import { Link } from "react-router-dom";
import type { Session } from "../types/api";
import { YouTubeEmbed } from "./YouTubeEmbed";

export function LiveNowCard({ session, onClick }: { session?: Session; onClick: () => void }) {
  if (!session) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-5">
        <span className="h-2 w-2 rounded-full bg-slate-300" aria-hidden="true" />
        <p className="text-sm text-slate-400">No live session right now</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-red-100 bg-white p-5">
      <button
        type="button"
        onClick={onClick}
        className="flex items-center justify-between gap-4 text-left"
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-dnc-red opacity-75 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-dnc-red" />
          </span>
          <div className="overflow-hidden">
            <p className="text-xs font-semibold uppercase tracking-widest text-dnc-red">Live now</p>
            <p className="truncate font-display text-sm font-semibold text-slate-900">
              {session.title}
            </p>
          </div>
        </div>
      </button>

      {session.liveYoutubeUrl ? (
        <YouTubeEmbed url={session.liveYoutubeUrl} title={session.title} />
      ) : (
        <p className="text-sm text-slate-400">Livestream will appear here once it starts.</p>
      )}

      <Link
        to={`/session/${session.documentId}`}
        className="self-start text-sm font-semibold text-dnc-blue transition-colors hover:text-dnc-blue-dark"
      >
        Session details →
      </Link>
    </div>
  );
}
