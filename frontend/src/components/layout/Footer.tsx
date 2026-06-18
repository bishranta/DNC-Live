import { Container } from "../ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-dnc-black">
      <Container className="flex flex-col items-center justify-between gap-1.5 py-6 text-xs text-slate-500 sm:flex-row">
        <p>&copy; {new Date().getFullYear()} Digital Nepal Conclave. All rights reserved.</p>
        <p className="font-medium text-slate-400">Organized by ICT Foundation Nepal</p>
      </Container>
    </footer>
  );
}
