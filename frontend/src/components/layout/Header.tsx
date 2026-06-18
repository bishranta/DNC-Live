import { NavLink } from "react-router-dom";
import { Container } from "../ui/Container";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition-colors duration-150 ${
    isActive ? "text-dnc-blue" : "text-slate-500 hover:text-slate-900"
  }`;

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-sm">
      <Container className="flex h-14 items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-dnc-blue font-display text-xs font-bold tracking-tight text-white">
            DNC
          </span>
          <span className="hidden font-display text-sm font-semibold text-slate-900 sm:inline">
            Digital Nepal Conclave
          </span>
        </NavLink>

        <nav className="flex items-center gap-5">
          <NavLink to="/" className={navLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/feedback" className={navLinkClass}>
            Feedback
          </NavLink>
        </nav>
      </Container>
    </header>
  );
}
