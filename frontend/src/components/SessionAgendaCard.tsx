import { Link } from "react-router-dom";
import type { Session, SessionStatus } from "../types/api";
import { formatDateTime } from "../lib/date";
import { useRevealAnimation } from "../hooks/useRevealAnimation";

const cardStyle: Record<SessionStatus, string> = {
  ongoing: "border-red-200 bg-red-50/40 hover:border-red-300",
  upcoming: "border-slate-200 bg-white hover:border-slate-300",
  completed: "border-slate-200 bg-slate-50/60 hover:border-slate-300",
};

const badgeBg: Record<SessionStatus, string> = {
  ongoing: "bg-dnc-red text-white",
  upcoming: "bg-dnc-orange text-white",
  completed: "bg-slate-200 text-slate-600",
};

const badgeLabel: Record<SessionStatus, string> = {
  ongoing: "Live",
  upcoming: "Upcoming",
  completed: "Completed",
};

function ClockIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 text-slate-400"
      aria-hidden="true"
    >
      <path d="M12 6v6l4 2" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

export function SessionAgendaCard({ session, delay = 0 }: { session: Session; delay?: number }) {
  const ref = useRevealAnimation(delay);
  return (
    <div ref={ref}>
    <Link
      to={`/session/${session.documentId}`}
      className={`group block rounded-xl border transition-all duration-150 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dnc-blue focus-visible:ring-offset-2 ${cardStyle[session.sessionStatus]}`}
    >
      <div className="flex flex-col gap-4 p-5 md:flex-row md:gap-8 md:p-6">
        <div className="flex shrink-0 flex-col gap-3 md:w-40">
          <div className="flex items-center gap-1.5">
            <ClockIcon />
            <span className="font-display text-sm font-semibold tabular-nums text-slate-700">
              {formatDateTime(session.startTime)}
            </span>
          </div>
          <div
            className={`inline-flex w-fit items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold ${badgeBg[session.sessionStatus]}`}
          >
            {session.sessionStatus === "ongoing" && (
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
              </span>
            )}
            {badgeLabel[session.sessionStatus]}
          </div>
        </div>

        <div className="flex flex-col gap-1.5 md:flex-1">
          <h3 className="font-display text-base font-semibold leading-snug text-slate-900 sm:text-lg">
            {session.title}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-slate-500">
            {session.description}
          </p>
          <span className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-dnc-blue transition-all duration-150 group-hover:gap-2">
            View details
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </Link>
    </div>
  );
}
