import { useRef, useState } from "react";
import { useSessions } from "../hooks/useSessions";
import { useNotices } from "../hooks/useNotices";
import { Container } from "../components/ui/Container";
import { AccordionSection } from "../components/ui/Accordion";
import { LiveNowCard } from "../components/LiveNowCard";
import { NoticesPanel } from "../components/NoticesPanel";
import { SessionAgendaCard } from "../components/SessionAgendaCard";
import type { SessionStatus } from "../types/api";

function SessionSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-24 animate-pulse rounded-xl bg-slate-100 motion-reduce:animate-none"
        />
      ))}
    </div>
  );
}

export function Home() {
  const { data: sessions = [], isLoading: sessionsLoading } = useSessions();
  const { data: notices = [], isLoading: noticesLoading } = useNotices();

  const [openSections, setOpenSections] = useState<Record<SessionStatus, boolean>>({
    completed: false,
    ongoing: true,
    upcoming: true,
  });
  const ongoingRef = useRef<HTMLDivElement>(null);

  const toggleSection = (status: SessionStatus) =>
    setOpenSections((prev) => ({ ...prev, [status]: !prev[status] }));

  const goToOngoing = () => {
    setOpenSections((prev) => ({ ...prev, ongoing: true }));
    ongoingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const liveSession = sessions.find((s) => s.sessionStatus === "ongoing");
  const ongoing = sessions.filter((s) => s.sessionStatus === "ongoing");
  const upcoming = [...sessions.filter((s) => s.sessionStatus === "upcoming")].sort(
    (a, b) => a.displayOrder - b.displayOrder,
  );
  const completed = [...sessions.filter((s) => s.sessionStatus === "completed")].sort(
    (a, b) => a.displayOrder - b.displayOrder,
  );

  return (
    <Container className="py-8 md:py-10">
      {/* Top grid: live session + notices */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[3fr_2fr]">
        <LiveNowCard session={liveSession} onClick={goToOngoing} />
        {noticesLoading ? (
          <div className="h-24 animate-pulse rounded-xl bg-slate-100 motion-reduce:animate-none" />
        ) : (
          <NoticesPanel notices={notices} />
        )}
      </div>

      {/* Session agenda */}
      <div className="mt-10">
        <h2 className="mb-4 font-display text-base font-semibold text-slate-900">Program</h2>
        {sessionsLoading ? (
          <SessionSkeleton />
        ) : (
          <div className="space-y-2">
            <AccordionSection
              ref={ongoingRef}
              title="Live & Ongoing"
              count={ongoing.length}
              open={openSections.ongoing}
              onToggle={() => toggleSection("ongoing")}
            >
              {ongoing.length === 0 ? (
                <p className="py-2 text-sm text-slate-400">No session is live right now.</p>
              ) : (
                <div className="space-y-2">
                  {ongoing.map((session, i) => (
                    <SessionAgendaCard key={session.id} session={session} delay={i * 40} />
                  ))}
                </div>
              )}
            </AccordionSection>

            <AccordionSection
              title="Upcoming"
              count={upcoming.length}
              open={openSections.upcoming}
              onToggle={() => toggleSection("upcoming")}
            >
              {upcoming.length === 0 ? (
                <p className="py-2 text-sm text-slate-400">No upcoming sessions scheduled.</p>
              ) : (
                <div className="space-y-2">
                  {upcoming.map((session, i) => (
                    <SessionAgendaCard key={session.id} session={session} delay={i * 40} />
                  ))}
                </div>
              )}
            </AccordionSection>

            <AccordionSection
              title="Completed"
              count={completed.length}
              open={openSections.completed}
              onToggle={() => toggleSection("completed")}
            >
              {completed.length === 0 ? (
                <p className="py-2 text-sm text-slate-400">No completed sessions yet.</p>
              ) : (
                <div className="space-y-2">
                  {completed.map((session, i) => (
                    <SessionAgendaCard key={session.id} session={session} delay={i * 40} />
                  ))}
                </div>
              )}
            </AccordionSection>
          </div>
        )}
      </div>
    </Container>
  );
}
