import { useSearchParams } from "react-router-dom";
import { Container } from "../components/ui/Container";
import { AskQuestionForm } from "../components/AskQuestionForm";
import { useSessions } from "../hooks/useSessions";

export function Questions() {
  // ?session=<id> comes from the session page; otherwise fall back to whatever is live now
  const preselected = Number(useSearchParams()[0].get("session")) || null;
  const { data: sessions = [] } = useSessions();

  const session =
    sessions.find((s) => s.id === preselected) ??
    sessions.find((s) => s.sessionStatus === "ongoing");

  return (
    <Container className="max-w-lg py-8 md:py-10">
      <div className="mb-6">
        <h1 className="font-display text-xl font-bold text-slate-900">Ask a Question</h1>
        <p className="mt-1 text-sm text-slate-400">
          Your question goes to the moderator of the live session.
        </p>
      </div>

      {session ? (
        <>
          <div className="mb-5 rounded-lg border border-slate-100 bg-slate-50 px-4 py-3">
            <p className="text-xs font-medium text-slate-400">Question for</p>
            <p className="mt-0.5 font-display text-sm font-semibold text-slate-900">
              {session.title}
            </p>
          </div>
          <AskQuestionForm sessionId={session.id} />
        </>
      ) : (
        <p className="text-sm text-slate-400">No session is live right now.</p>
      )}
    </Container>
  );
}
