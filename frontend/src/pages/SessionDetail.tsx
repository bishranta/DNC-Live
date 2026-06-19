import { Link, useParams } from "react-router-dom";
import { useSession } from "../hooks/useSessions";
import { Container } from "../components/ui/Container";
import { StatusBadge } from "../components/ui/StatusBadge";
import { YouTubeEmbed } from "../components/YouTubeEmbed";
import { ParticipantCard } from "../components/ParticipantCard";
import { formatDateTime } from "../lib/date";
import type { ParticipantRole, SessionParticipant } from "../types/api";

const ROLE_GROUPS: { role: ParticipantRole; label: string }[] = [
  { role: "moderator", label: "Moderator" },
  { role: "speaker", label: "Speakers" },
  { role: "panelist", label: "Panelists" },
  { role: "session_chair", label: "Session Chairs" },
];

function groupByRole(participants: SessionParticipant[]) {
  return ROLE_GROUPS.map(({ role, label }) => ({
    role,
    label,
    members: participants
      .filter((p) => p.role === role)
      .sort((a, b) => a.displayOrder - b.displayOrder),
  })).filter((group) => group.members.length > 0);
}

function DetailSkeleton() {
  return (
    <div className="space-y-6 py-8">
      <div className="h-4 w-24 animate-pulse rounded bg-slate-100 motion-reduce:animate-none" />
      <div className="space-y-3">
        <div className="h-8 w-3/4 animate-pulse rounded bg-slate-100 motion-reduce:animate-none" />
        <div className="h-4 w-full animate-pulse rounded bg-slate-100 motion-reduce:animate-none" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100 motion-reduce:animate-none" />
      </div>
    </div>
  );
}

export function SessionDetail() {
  const { id: documentId } = useParams<{ id: string }>();
  const { data: session, isLoading } = useSession(documentId);

  if (isLoading) {
    return (
      <Container className="max-w-3xl">
        <DetailSkeleton />
      </Container>
    );
  }

  if (!session) {
    return (
      <Container className="max-w-3xl py-8">
        <p className="text-slate-600">Session not found.</p>
        <Link to="/" className="mt-2 inline-block text-sm font-medium text-dnc-blue hover:underline">
          ← Back to home
        </Link>
      </Container>
    );
  }

  return (
    <Container className="max-w-3xl py-8 md:py-10">
      {/* Back + meta */}
      <div className="mb-6">
        <Link
          to="/"
          className="text-sm font-medium text-slate-400 transition-colors hover:text-slate-600"
        >
          ← Home
        </Link>
        <div className="mt-4 flex flex-wrap items-center gap-2.5">
          <StatusBadge status={session.sessionStatus} />
          <span className="text-sm tabular-nums text-slate-400">
            {formatDateTime(session.startTime)}
          </span>
        </div>
        <h1 className="mt-3 font-display text-2xl font-bold leading-snug text-slate-900 sm:text-3xl">
          {session.title}
        </h1>
        {session.agenda && (
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">{session.agenda}</p>
        )}
        {session.description && (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
            {session.description}
          </p>
        )}
      </div>

      {/* Speakers & Panelists — shown first */}
      {session.participants && session.participants.length > 0 && (
        <section className="mb-8 space-y-6">
          <h2 className="font-display text-sm font-semibold text-slate-900">
            Speakers &amp; Panelists
          </h2>
          {groupByRole(session.participants).map(({ role, label, members }) => (
            <div key={role}>
              <p className="mb-3 text-xs font-medium text-slate-400">{label}</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {members.map((participant) => (
                  <ParticipantCard key={participant.id} participant={participant} />
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Live stream */}
      {session.sessionStatus === "ongoing" && (
        <section className="mb-8">
          <h2 className="mb-3 font-display text-sm font-semibold text-slate-900">Watch Live</h2>
          {session.liveYoutubeUrl ? (
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <YouTubeEmbed url={session.liveYoutubeUrl} title={session.title} />
              <p className="mt-2.5 px-1 text-sm font-medium text-slate-700">{session.title}</p>
            </div>
          ) : (
            <p className="text-sm text-slate-400">Livestream link will appear here once it starts.</p>
          )}
        </section>
      )}

      {/* Documents */}
      {session.documents && session.documents.filter((d) => d.isPublished).length > 0 && (
        <section className="mb-8 w-auto">
          <h2 className="mb-3 font-display text-sm font-semibold text-slate-900">Documents</h2>
          <div className="space-y-2">
            {session.documents.filter((d) => d.isPublished).map((doc) => (
              <a
                key={doc.id}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 transition-colors hover:border-dnc-blue hover:bg-dnc-blue/5 hover:text-dnc-blue"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                {doc.title}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Recordings */}
      {session.sessionStatus === "completed" && (
        <section className="mb-8">
          <h2 className="mb-3 font-display text-sm font-semibold text-slate-900">Recordings</h2>
          {session.media && session.media.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {session.media.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-slate-200 bg-white p-2"
                >
                  <YouTubeEmbed url={item.youtubeUrl} title={item.title} />
                  <p className="mt-1.5 px-0.5 text-xs font-medium text-slate-700 line-clamp-1">{item.title}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400">Recording not available yet.</p>
          )}
        </section>
      )}
    </Container>
  );
}
