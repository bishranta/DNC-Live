import type { SessionParticipant } from "../types/api";
import { resolveMediaUrl } from "../lib/api";

export function ParticipantCard({ participant }: { participant: SessionParticipant }) {
  const photoUrl = resolveMediaUrl(participant.photo?.url);

  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 transition-shadow hover:shadow-sm">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-dnc-blue/15 to-dnc-blue/5 font-display text-base font-bold text-dnc-blue ring-1 ring-dnc-blue/10">
        {photoUrl ? (
          <img src={photoUrl} alt={participant.name} className="h-full w-full object-cover" />
        ) : (
          participant.name
            .split(" ")
            .map((p) => p[0])
            .slice(0, 2)
            .join("")
        )}
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-slate-900">{participant.name}</p>
        {participant.designation && (
          <p className="truncate text-xs text-slate-500">{participant.designation}</p>
        )}
        {participant.organization && (
          <p className="truncate text-xs text-slate-400">{participant.organization}</p>
        )}
      </div>
    </div>
  );
}
