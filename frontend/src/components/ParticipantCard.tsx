import type { SessionParticipant } from "../types/api";
import { resolveMediaUrl } from "../lib/api";

const roleLabels: Record<SessionParticipant["role"], string> = {
  speaker: "Speaker",
  panelist: "Panelist",
  moderator: "Moderator",
  session_chair: "Session Chair",
};

const roleColors: Record<SessionParticipant["role"], string> = {
  speaker: "text-dnc-blue",
  panelist: "text-dnc-orange",
  moderator: "text-dnc-red",
  session_chair: "text-slate-500",
};

export function ParticipantCard({ participant }: { participant: SessionParticipant }) {
  const photoUrl = resolveMediaUrl(participant.photo?.url);

  return (
    <div className="flex items-start gap-2.5 rounded-lg border border-slate-200 bg-white p-2.5 transition-shadow hover:shadow-sm">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-dnc-blue/15 to-dnc-blue/5 font-display text-xs font-bold text-dnc-blue ring-1 ring-dnc-blue/10">
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
        <p className={`text-xs font-semibold ${roleColors[participant.role]}`}>
          {roleLabels[participant.role]}
        </p>
        {(participant.designation || participant.organization) && (
          <p className="line-clamp-1 text-xs text-slate-400">
            {[participant.designation, participant.organization].filter(Boolean).join(", ")}
          </p>
        )}
      </div>
    </div>
  );
}
