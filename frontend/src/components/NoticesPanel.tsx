import type { Notice } from "../types/api";
import { HiBell, HiExclamationTriangle, HiInformationCircle } from "react-icons/hi2";

export function NoticesPanel({ notices }: { notices: Notice[] }) {
  if (notices.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/70 p-6 text-center">
        <HiBell className="h-6 w-6 text-slate-200" />
        <p className="text-sm text-slate-400">No notices at the moment.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white/80 p-5 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-dnc-blue/10">
          <HiBell className="h-3.5 w-3.5 text-dnc-blue" />
        </span>
        <h2 className="font-display text-sm font-semibold text-slate-900">Notices</h2>
        <span className="ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-dnc-blue/10 px-1.5 text-xs font-semibold text-dnc-blue">
          {notices.length}
        </span>
      </div>
      <ul className="space-y-2">
        {notices.map((notice) => {
          const isUrgent = notice.priority >= 8;
          return (
            <li
              key={notice.id}
              className={`flex gap-2.5 rounded-lg p-3 ${
                isUrgent
                  ? "bg-red-50 ring-1 ring-red-200 border-l-3 border-l-dnc-red"
                  : "bg-slate-50 ring-1 ring-slate-100"
              }`}
            >
              <span className="mt-0.5 shrink-0">
                {isUrgent ? (
                  <HiExclamationTriangle className="h-4 w-4 text-dnc-red" />
                ) : (
                  <HiInformationCircle className="h-4 w-4 text-slate-400" />
                )}
              </span>
              <div>
                <p className={`text-sm font-medium ${isUrgent ? "text-red-900" : "text-slate-900"}`}>
                  {notice.title}
                </p>
                <p className={`mt-0.5 text-xs leading-relaxed ${isUrgent ? "text-red-700" : "text-slate-500"}`}>
                  {notice.description}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
