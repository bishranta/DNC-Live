import { Link } from "react-router-dom";
import type { Session, SessionStatus } from "../types/api";
import { formatDateTime } from "../lib/date";
import { useRevealAnimation } from "../hooks/useRevealAnimation";
import { HiClock, HiArrowRight } from "react-icons/hi2";

const cardStyle: Record<SessionStatus, string> = {
  ongoing: "border-red-200 bg-white hover:border-red-300 hover:shadow-sm border-l-4 border-l-dnc-red",
  upcoming: "border-slate-200 bg-white hover:border-dnc-blue/40 hover:shadow-sm border-l-4 border-l-dnc-blue",
  completed: "border-slate-200 bg-slate-50/60 hover:border-slate-300 border-l-4 border-l-slate-300",
};

const badgeBg: Record<SessionStatus, string> = {
  ongoing: "bg-dnc-red text-white shadow-sm",
  upcoming: "bg-gradient-to-r from-dnc-blue to-dnc-blue-dark text-white shadow-sm",
  completed: "bg-slate-100 text-slate-500 ring-1 ring-slate-200",
};

const badgeLabel: Record<SessionStatus, string> = {
  ongoing: "Live",
  upcoming: "Upcoming",
  completed: "Completed",
};

export function SessionAgendaCard({ session, delay = 0 }: { session: Session; delay?: number }) {
  const ref = useRevealAnimation(delay);
  return (
    <div ref={ref}>
      <Link
        to={`/session/${session.documentId}`}
        className={`group block rounded-xl border transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dnc-blue focus-visible:ring-offset-2 ${cardStyle[session.sessionStatus]}`}
      >
        <div className="flex flex-col gap-4 p-5 md:flex-row md:gap-8 md:p-5">
          <div className="flex shrink-0 flex-col gap-2.5 md:w-40">
            <div className="flex items-center gap-1.5 text-slate-500">
              <HiClock className="h-3.5 w-3.5 shrink-0" />
              <span className="font-display text-sm font-medium tabular-nums">
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
            <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-dnc-blue transition-all duration-150 group-hover:gap-2">
              View details
              <HiArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
