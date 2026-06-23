import { NavLink } from "react-router-dom";
import { Container } from "../ui/Container";
import { HiHome, HiChatBubbleLeftRight } from "react-icons/hi2";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-1.5 text-sm font-medium transition-all duration-150 px-3 py-1.5 rounded-lg ${
    isActive
      ? "text-dnc-blue bg-dnc-blue/8 font-semibold"
      : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
  }`;

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/85 backdrop-blur-md">
      {/* Thin colored top accent bar */}
      <div className="h-0.5 bg-gradient-to-r from-dnc-blue via-dnc-blue-dark to-dnc-orange" />
      <Container className="flex h-16 items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2.5 group">
          <img
            src="/dnc-logo.png"
            alt="Digital Nepal Conclave"
            className="h-8 w-auto object-contain"
          />
          <div className="hidden sm:flex flex-col leading-none">
            <span className="font-display text-sm font-bold text-slate-900 tracking-tight">
              DNC 2026
            </span>
          </div>
        </NavLink>

        <nav className="flex items-center gap-1">
          <NavLink to="/" className={navLinkClass} end>
            <HiHome className="h-4 w-4" />
            Home
          </NavLink>
          <NavLink to="/feedback" className={navLinkClass}>
            <HiChatBubbleLeftRight className="h-4 w-4" />
            Feedback
          </NavLink>
        </nav>
      </Container>
    </header>
  );
}
