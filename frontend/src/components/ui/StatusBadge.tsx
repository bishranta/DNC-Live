import type { SessionStatus } from "../../types/api";

const styles: Record<SessionStatus, string> = {
  ongoing: "bg-red-50 text-dnc-red ring-1 ring-red-200",
  upcoming: "bg-orange-50 text-dnc-orange ring-1 ring-orange-200",
  completed: "bg-slate-100 text-slate-500 ring-1 ring-slate-200",
};

const labels: Record<SessionStatus, string> = {
  ongoing: "Live",
  upcoming: "Upcoming",
  completed: "Completed",
};

export function StatusBadge({ status }: { status: SessionStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status === "ongoing" && (
        <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-dnc-red opacity-75 motion-reduce:animate-none" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-dnc-red" />
        </span>
      )}
      {labels[status]}
    </span>
  );
}
