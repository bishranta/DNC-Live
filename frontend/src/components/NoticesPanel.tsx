import type { Notice } from "../types/api";

export function NoticesPanel({ notices }: { notices: Notice[] }) {
  if (notices.length === 0) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-400">
        <svg
          className="h-4 w-4 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
          />
        </svg>
        No notices at the moment.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="font-display text-sm font-semibold text-slate-900">Notices</h2>
      <ul className="mt-3 space-y-2">
        {notices.map((notice) => (
          <li
            key={notice.id}
            className={`rounded-lg p-3 ${
              notice.priority >= 8
                ? "bg-red-50 ring-1 ring-red-100"
                : "bg-slate-50 ring-1 ring-slate-100"
            }`}
          >
            <p className="text-sm font-medium text-slate-900">{notice.title}</p>
            <p className="mt-0.5 text-sm text-slate-500">{notice.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
