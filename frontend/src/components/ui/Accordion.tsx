import { forwardRef, type ReactNode } from "react";

interface AccordionSectionProps {
  title: string;
  count: number;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}

export const AccordionSection = forwardRef<HTMLDivElement, AccordionSectionProps>(
  ({ title, count, open, onToggle, children }, ref) => {
    return (
      <div ref={ref} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <button
          type="button"
          onClick={onToggle}
          className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors duration-150 hover:bg-slate-50"
          aria-expanded={open}
        >
          <span className="flex items-center gap-2.5">
            <span className="font-display text-sm font-semibold text-slate-900">{title}</span>
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-100 px-1.5 text-xs font-medium tabular-nums text-slate-500">
              {count}
            </span>
          </span>
          <svg
            className="h-4 w-4 shrink-0 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            {!open && <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14" />}
          </svg>
        </button>

        <div
          className={`grid transition-all duration-200 ease-out motion-reduce:transition-none ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <div className="border-t border-slate-100 p-4">{children}</div>
          </div>
        </div>
      </div>
    );
  },
);
AccordionSection.displayName = "AccordionSection";
