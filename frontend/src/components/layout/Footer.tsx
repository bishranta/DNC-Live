import { Container } from "../ui/Container";
import { HiGlobeAlt } from "react-icons/hi2";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200/60 bg-dnc-black">
      {/* Nepal flag-inspired gradient accent */}
      <div className="h-0.5 bg-gradient-to-r from-dnc-red via-dnc-orange to-dnc-blue" />
      <Container className="py-6">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-dnc-blue/30 font-display text-[9px] font-bold text-white">
              DNC
            </span>
            <p className="text-xs font-medium text-slate-400">
              &copy; {new Date().getFullYear()} Digital Nepal Conclave
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <HiGlobeAlt className="h-3.5 w-3.5 text-slate-600" />
            <span className="font-medium text-slate-400">Organized by ICT Foundation Nepal</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
