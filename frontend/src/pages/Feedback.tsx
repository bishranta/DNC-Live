import { useEffect, useState } from "react";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { StarRating } from "../components/StarRating";
import { useSessions } from "../hooks/useSessions";
import { useSubmitFeedback, useValidateInvitationCode } from "../hooks/useFeedback";
import { participantCodeStorage } from "../lib/storage";

type Step = "code" | "select" | "rate" | "success";

export function Feedback() {
  const [step, setStep] = useState<Step>("code");
  const [codeInput, setCodeInput] = useState("");
  const [code, setCode] = useState<string | null>(null);
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null);
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5>(5);
  const [comment, setComment] = useState("");

  const validateCode = useValidateInvitationCode();
  const submitFeedback = useSubmitFeedback();
  const { data: sessions = [] } = useSessions();

  const feedbackEligible = sessions.filter((s) => s.sessionStatus !== "upcoming");
  const selectedSession = sessions.find((s) => s.id === selectedSessionId);

  useEffect(() => {
    const stored = participantCodeStorage.get();
    if (stored) {
      setCode(stored);
      setStep("select");
    }
  }, []);

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateCode.mutate(codeInput.trim(), {
      onSuccess: (result) => {
        if (result) {
          participantCodeStorage.set(result.code);
          setCode(result.code);
          setStep("select");
        }
      },
    });
  };

  const handleSubmitRating = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !selectedSessionId) return;
    submitFeedback.mutate(
      { session: selectedSessionId, invitationCode: code, rating, comment: comment.trim() || undefined },
      { onSuccess: () => setStep("success") },
    );
  };

  const handleSwitchCode = () => {
    participantCodeStorage.clear();
    setCode(null);
    setCodeInput("");
    setSelectedSessionId(null);
    setRating(5);
    setComment("");
    setStep("code");
  };

  return (
    <Container className="max-w-lg py-8 md:py-10">
      <h1 className="mb-1.5 font-display text-xl font-bold text-slate-900">Session Feedback</h1>
      {step !== "code" && code && (
        <div className="mb-1 flex items-center gap-2">
          <span className="font-mono text-xs font-medium text-slate-500">{code}</span>
          <button
            type="button"
            onClick={handleSwitchCode}
            className="inline-flex items-center gap-1 rounded-md bg-dnc-blue/10 px-2.5 py-1 text-xs font-semibold text-dnc-blue transition-colors hover:bg-dnc-blue/15"
          >
            Switch code
          </button>
        </div>
      )}
      <p className="text-sm text-slate-400">Anonymous — your name is never recorded.</p>

      {step === "code" && (
        <form onSubmit={handleCodeSubmit} className="mt-7 space-y-4">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-slate-700">
              Invitation code
            </label>
            <input
              id="code"
              type="text"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              placeholder="ICT2026-AX91K"
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-300 transition-colors focus:border-dnc-blue focus:outline-none focus:ring-2 focus:ring-dnc-blue/20"
              required
            />
          </div>

          {validateCode.isSuccess && !validateCode.data && (
            <p className="text-sm text-dnc-red">Invalid or inactive code. Please check and try again.</p>
          )}
          {validateCode.isError && (
            <p className="text-sm text-dnc-red">Something went wrong. Please try again.</p>
          )}

          <Button type="submit" disabled={validateCode.isPending} className="w-full">
            {validateCode.isPending ? "Checking…" : "Continue"}
          </Button>
        </form>
      )}

      {step === "select" && (
        <div className="mt-7 space-y-3">
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
                  className="block w-full rounded-lg border border-slate-200 bg-white p-4 text-left text-sm font-medium text-slate-800 transition-colors hover:border-dnc-blue hover:bg-dnc-blue/5"
                >
                  {session.title}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {step === "rate" && selectedSession && (
        <form onSubmit={handleSubmitRating} className="mt-7 space-y-5">
          <div>
            <p className="text-xs text-slate-400">Rating for</p>
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
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-300 transition-colors focus:border-dnc-blue focus:outline-none focus:ring-2 focus:ring-dnc-blue/20"
            />
          </div>

          <div className="flex gap-2.5">
            <Button type="button" variant="secondary" onClick={() => setStep("select")}>
              Back
            </Button>
            <Button type="submit" disabled={submitFeedback.isPending} className="flex-1">
              {submitFeedback.isPending ? "Submitting…" : "Submit Feedback"}
            </Button>
          </div>
        </form>
      )}

      {step === "success" && (
        <div className="mt-7 rounded-xl border border-slate-200 bg-white p-6 text-center">
          <p className="font-display text-base font-semibold text-slate-900">
            Thank you for your feedback
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
