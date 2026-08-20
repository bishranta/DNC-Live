import { useState } from "react";
import { Button } from "./ui/Button";
import { useSubmitQuestion } from "../hooks/useAudienceQuestion";
import { HiCheckCircle } from "react-icons/hi2";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-300 shadow-xs transition-colors focus:border-dnc-blue focus:outline-none focus:ring-2 focus:ring-dnc-blue/20";

export function AskQuestionForm({ sessionId }: { sessionId: number }) {
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [sent, setSent] = useState(false);
  const submitQuestion = useSubmitQuestion();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    submitQuestion.mutate(
      {
        session: sessionId,
        name: name.trim() || undefined,
        question: question.trim(),
      },
      {
        onSuccess: () => {
          setSent(true);
          setQuestion("");
        },
      },
    );
  };

  if (sent) {
    return (
      <div className="rounded-lg border border-green-100 bg-green-50 px-4 py-3 text-sm">
        <p className="flex items-center gap-2 font-medium text-slate-900">
          <HiCheckCircle className="h-5 w-5 text-green-600" />
          Your question has been submitted.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-2 text-xs font-semibold text-dnc-blue hover:underline"
        >
          Ask another question
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="q-name" className="block text-sm font-medium text-slate-700">
          Your name
        </label>
        <input
          id="q-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Skip for anonimity"
          className={inputClass}
        />
        <p className="mt-1 text-xs text-slate-400">Skip for anonimity</p>
      </div>

      <div>
        <label htmlFor="q-text" className="block text-sm font-medium text-slate-700">
          Question
        </label>
        <textarea
          id="q-text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={4}
          placeholder="What would you like to ask the panel?"
          className={inputClass}
          required
        />
      </div>

      {submitQuestion.isError && (
        <p className="text-sm text-dnc-red">Something went wrong. Please try again.</p>
      )}

      <Button type="submit" disabled={submitQuestion.isPending}>
        {submitQuestion.isPending ? "Submitting…" : "Submit Question"}
      </Button>
    </form>
  );
}
