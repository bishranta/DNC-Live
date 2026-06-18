import type { SessionParticipant } from "../types/api";
import { resolveMediaUrl } from "../lib/api";

const roleLabels: Record<SessionParticipant["role"], string> = {
  speaker: "Speaker",
  panelist: "Panelist",
  moderator: "Moderator",
  session_chair: "Session Chair",
};

export function ParticipantCard({ participant }: { participant: SessionParticipant }) {
  const photoUrl = resolveMediaUrl(participant.photo?.url);

  return (
    <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-2.5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-dnc-blue/8 font-display text-xs font-semibold text-dnc-blue">
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
        <p className="truncate text-xs font-semibold text-slate-900">{participant.name}</p>
        <p className="text-xs font-medium text-dnc-blue">{roleLabels[participant.role]}</p>
        {(participant.designation || participant.organization) && (
          <p className="line-clamp-1 text-xs text-slate-400">
            {[participant.designation, participant.organization].filter(Boolean).join(", ")}
          </p>
        )}
      </div>
    </div>
  );
}
