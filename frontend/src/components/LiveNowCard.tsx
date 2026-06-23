import { Link } from "react-router-dom";
import type { Session } from "../types/api";
import { YouTubeEmbed } from "./YouTubeEmbed";
import { HiPlay, HiArrowRight } from "react-icons/hi2";

export function LiveNowCard({ session, onClick }: { session?: Session; onClick: () => void }) {
  if (!session) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white/70 p-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
          <HiPlay className="h-4 w-4 text-slate-300" />
        </span>
        <div>
          <p className="text-sm font-medium text-slate-400">No live session right now</p>
          <p className="text-xs text-slate-300">Sessions will appear here when they go live</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-red-200 bg-gradient-to-br from-red-50/80 via-white to-orange-50/30 p-5 shadow-sm">
      <button
        type="button"
        onClick={onClick}
        className="flex items-center justify-between gap-4 text-left"
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <span className="relative flex h-3 w-3 shrink-0" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-dnc-red opacity-75 motion-reduce:animate-none" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-dnc-red" />
          </span>
          <div className="overflow-hidden">
            <div className="flex items-center gap-2">
              <p className="text-xs font-bold uppercase tracking-widest text-dnc-red">Live now</p>
              <span className="rounded-full bg-dnc-red/10 px-2 py-0.5 text-[10px] font-semibold text-dnc-red ring-1 ring-dnc-red/20">
                On Air
              </span>
            </div>
            <p className="mt-0.5 truncate font-display text-sm font-semibold text-slate-900">
              {session.title}
            </p>
          </div>
        </div>
      </button>

      {session.liveYoutubeUrl ? (
        <div className="overflow-hidden rounded-lg shadow-md">
          <YouTubeEmbed url={session.liveYoutubeUrl} title={session.title} />
        </div>
      ) : (
        <div className="flex items-center gap-2 rounded-lg border border-red-100 bg-red-50/50 px-4 py-3">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-dnc-red opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-dnc-red" />
          </span>
          <p className="text-sm text-red-600">Livestream will appear here once it starts.</p>
        </div>
      )}

      <Link
        to={`/session/${session.documentId}`}
        className="group inline-flex items-center gap-1.5 self-start text-sm font-semibold text-dnc-blue transition-all hover:text-dnc-blue-dark"
      >
        Session details
        <HiArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
