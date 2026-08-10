import { useState } from "react";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { useValidateInvitationCode } from "../hooks/useFeedback";
import { participantCodeStorage } from "../lib/storage";
import { HiArrowRight } from "react-icons/hi2";

export function Gate({ onUnlock }: { onUnlock: (code: string) => void }) {
  const [codeInput, setCodeInput] = useState("");
  const validateCode = useValidateInvitationCode();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateCode.mutate(codeInput.trim(), {
      onSuccess: (result) => {
        if (result) {
          participantCodeStorage.set(result.code);
          onUnlock(result.code);
        }
      },
    });
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gradient-to-b from-slate-50 to-white">
      <Container className="max-w-sm">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <img
            src="/dnc-logo.png"
            alt="Digital Nepal Conclave"
            className="mx-auto h-12 w-auto object-contain"
          />
          <h1 className="mt-5 text-center font-display text-lg font-bold text-slate-900">
            Digital Nepal Conclave 2026
          </h1>
          <p className="mt-1 text-center text-sm text-slate-400">
            Enter your invitation code to continue.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              type="text"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              placeholder="DNC26-XXXXX"
              aria-label="Invitation code"
              autoFocus
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-center font-mono text-sm text-slate-900 placeholder:text-slate-300 shadow-xs transition-colors focus:border-dnc-blue focus:outline-none focus:ring-2 focus:ring-dnc-blue/20"
              required
            />

            {validateCode.isSuccess && !validateCode.data && (
              <p className="text-center text-sm text-dnc-red">
                Invalid or inactive code. Please check and try again.
              </p>
            )}
            {validateCode.isError && (
              <p className="text-center text-sm text-dnc-red">
                Something went wrong. Please try again.
              </p>
            )}

            <Button type="submit" disabled={validateCode.isPending} className="w-full">
              <span className="flex items-center justify-center gap-2">
                {validateCode.isPending ? "Checking…" : (
                  <>Enter <HiArrowRight className="h-4 w-4" /></>
                )}
              </span>
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}
