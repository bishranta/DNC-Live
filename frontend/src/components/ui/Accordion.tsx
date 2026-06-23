import { forwardRef, type ReactNode } from "react";
import { HiChevronDown } from "react-icons/hi2";

interface AccordionSectionProps {
  title: string;
  count: number;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
  accent?: "red" | "blue" | "slate";
  icon?: ReactNode;
}

const accentCountBg: Record<string, string> = {
  red: "bg-red-100 text-dnc-red",
  blue: "bg-dnc-blue/10 text-dnc-blue",
  slate: "bg-slate-100 text-slate-500",
};

export const AccordionSection = forwardRef<HTMLDivElement, AccordionSectionProps>(
  ({ title, count, open, onToggle, children, accent = "slate", icon }, ref) => {
    return (
      <div ref={ref} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
        <button
          type="button"
          onClick={onToggle}
          className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors duration-150 hover:bg-slate-50/80"
          aria-expanded={open}
        >
          <span className="flex items-center gap-2.5">
            {icon && <span className="shrink-0">{icon}</span>}
            <span className="font-display text-sm font-semibold text-slate-900">{title}</span>
            <span
              className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold tabular-nums ${accentCountBg[accent]}`}
            >
              {count}
            </span>
          </span>
          <HiChevronDown
            className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
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
