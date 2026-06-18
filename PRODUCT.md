# Product

## Register

product

## Users

Mixed audience of in-room attendees and remote viewers attending the Digital Nepal Conclave. In-room users check the dashboard on mobile or shared screens to see which session is live, what's coming up, and where to go. Remote viewers watch the embedded YouTube livestream, follow session context, and submit feedback from home or office. Both groups need fast, reliable orientation — they're in the middle of an event, not browsing.

## Product Purpose

DNC Live is the real-time event dashboard for the Digital Nepal Conclave. It surfaces session status (ongoing / upcoming / completed), hosts the live YouTube embed for the active session, shows notices from organizers, and collects anonymous per-session feedback via invitation codes. Success looks like: attendees always know what's happening right now and where to go next, without friction.

## Brand Personality

Confident, institutional, clear. The Conclave is a serious national technology summit — the interface should feel like it belongs there: authoritative but not bureaucratic, composed but not cold. Three words: **Composed. Credible. Present.**

## Anti-references

- **Generic SaaS dashboards** — no purple-gradient metric tiles, identical card grids, or admin-panel chrome.
- **Flashy event apps** — no neon gradients, festival-poster motion, or overwrought animation. This is a summit, not a music festival.
- **Government portals** — no dense gray tables, no visual hierarchy collapse, no inaccessible small type.
- **Startup landing pages** — no hero metrics, blob gradients, testimonial carousels, or marketing-speak energy. The content is the event, not the interface itself.

## Design Principles

1. **Status is the product** — the live/upcoming/completed state of sessions must be the single most readable thing on every screen. Never bury it in decoration.
2. **Invisible infrastructure** — the UI's job is to recede. The session content, speaker information, and live stream are the hero. Restraint is a design decision, not a shortcut.
3. **Dual-context reliability** — every surface must work equally for a glance on a crowded phone and a focused laptop session. Layout, contrast, and touch targets must hold at both ends.
4. **Institutional confidence** — visual weight and typography should feel like a major summit. Use the DNC color system deliberately, not decoratively; brand identity is carried by structure and hierarchy, not gradient effects.
5. **Real-time trust** — realtime updates (socket events, live indicators) must signal clearly and never alarm. Pulse animations are legitimate; flashing or startling motion is not.

## Accessibility & Inclusion

WCAG 2.1 AA compliance. Body text ≥ 4.5:1 contrast against background. Large text ≥ 3:1. Full keyboard navigation and visible focus indicators. `prefers-reduced-motion` respected for all animations — the pulsing live indicator in particular needs a static fallback. Color is never the sole signal for status.
