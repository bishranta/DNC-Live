import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { StarRating } from "../components/StarRating";
import { useSessions } from "../hooks/useSessions";
import { useRatedSessionIds, useSubmitFeedback } from "../hooks/useFeedback";
import { participantCodeStorage } from "../lib/storage";
import {
  HiTicket,
  HiCheckCircle,
  HiArrowRight,
  HiArrowLeft,
  HiCheck,
} from "react-icons/hi2";

type Step = "select" | "rate" | "success";

export function Feedback() {
  // ?session=<id> deep-links straight to the rating step (used from SessionDetail)
  const preselected = Number(useSearchParams()[0].get("session")) || null;
  const [step, setStep] = useState<Step>(preselected ? "rate" : "select");
  const code = participantCodeStorage.get();
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(preselected);
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5>(5);
  const [comment, setComment] = useState("");

  const submitFeedback = useSubmitFeedback();
  const { data: sessions = [] } = useSessions();
  const { data: ratedSessionIds = [] } = useRatedSessionIds(code);

  const feedbackEligible = sessions.filter((s) => s.sessionStatus !== "upcoming");
  const selectedSession = sessions.find((s) => s.id === selectedSessionId);

  const handleSubmitRating = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !selectedSessionId) return;
    submitFeedback.mutate(
      { session: selectedSessionId, invitationCode: code, rating, comment: comment.trim() || undefined },
      { onSuccess: () => setStep("success") },
    );
  };

  return (
    <Container className="max-w-lg py-8 md:py-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display text-xl font-bold text-slate-900">Session Feedback</h1>
        <p className="mt-1 text-sm text-slate-400">Anonymous — your name is never recorded.</p>
      </div>

      {/* Active code chip */}
      {code && (
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-dnc-blue/30 bg-dnc-blue/8 px-3 py-2.5">
          <HiTicket className="h-4 w-4 shrink-0 text-dnc-blue" />
          <span className="font-mono text-sm font-semibold text-dnc-blue">{code}</span>
        </div>
      )}

      {/* Step: select */}
      {step === "select" && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-700">Select a session to rate</p>
          {feedbackEligible.length === 0 ? (
            <p className="text-sm text-slate-400">No sessions are available for feedback yet.</p>
          ) : (
            <div className="space-y-2">
              {feedbackEligible.map((session) => (
                <button
                  key={session.id}
                  type="button"
                  onClick={() => {
                    setSelectedSessionId(session.id);
                    setStep("rate");
                  }}
                  className="group flex w-full items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 text-left text-sm font-medium text-slate-800 transition-all hover:border-dnc-blue hover:bg-dnc-blue/5 hover:shadow-sm"
                >
                  <span
                    aria-hidden
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                      ratedSessionIds.includes(session.id)
                        ? "border-green-600 bg-green-600 text-white"
                        : "border-slate-300"
                    }`}
                  >
                    {ratedSessionIds.includes(session.id) && <HiCheck className="h-3.5 w-3.5" />}
                  </span>
                  <span className="flex-1">
                    {session.title}
                    {ratedSessionIds.includes(session.id) && (
                      <span className="ml-2 text-xs font-normal text-green-700">
                        feedback given
                      </span>
                    )}
                  </span>
                  <HiArrowRight className="h-4 w-4 shrink-0 text-slate-300 transition-all group-hover:text-dnc-blue group-hover:translate-x-0.5" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Step: rate */}
      {step === "rate" && selectedSession && (
        <form onSubmit={handleSubmitRating} className="space-y-5">
          <div className="rounded-lg border border-slate-100 bg-slate-50 px-4 py-3">
            <p className="text-xs font-medium text-slate-400">Rating for</p>
            <p className="mt-0.5 font-display text-sm font-semibold text-slate-900">
              {selectedSession.title}
            </p>
          </div>

          <StarRating value={rating} onChange={setRating} />

          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-slate-700">
              Comment{" "}
              <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              placeholder="Share your thoughts about this session…"
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-300 shadow-xs transition-colors focus:border-dnc-blue focus:outline-none focus:ring-2 focus:ring-dnc-blue/20"
            />
          </div>

          <div className="flex gap-2.5">
            <Button type="button" variant="secondary" onClick={() => setStep("select")}>
              <span className="flex items-center gap-1.5">
                <HiArrowLeft className="h-4 w-4" />
                Back
              </span>
            </Button>
            <Button type="submit" disabled={submitFeedback.isPending} className="flex-1">
              {submitFeedback.isPending ? "Submitting…" : "Submit Feedback"}
            </Button>
          </div>
        </form>
      )}

      {/* Step: success */}
      {step === "success" && (
        <div className="rounded-xl border border-green-100 bg-gradient-to-b from-green-50 to-white p-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <HiCheckCircle className="h-7 w-7 text-green-600" />
          </div>
          <p className="font-display text-base font-semibold text-slate-900">
            Thank you for your feedback!
          </p>
          <p className="mt-1 text-sm text-slate-400">Your response has been recorded anonymously.</p>
          <Button
            variant="secondary"
            className="mt-5"
            onClick={() => {
              setStep("select");
              setSelectedSessionId(null);
              setComment("");
              setRating(5);
            }}
          >
            Rate another session
          </Button>
        </div>
      )}
    </Container>
  );
}
