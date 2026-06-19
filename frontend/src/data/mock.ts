import type {
  InvitationCode,
  Notice,
  Session,
  SessionDocument,
  SessionMedia,
  SessionParticipant,
} from "../types/api";

const now = new Date().toISOString();

const participants: Record<number, SessionParticipant[]> = {
  1: [
    {
      id: 1,
      documentId: "participant-1",
      name: "Dr. Anjali Sharma",
      photo: null,
      bio: "Secretary, Ministry of Communication and Information Technology.",
      designation: "Secretary",
      organization: "Ministry of CIT",
      role: "speaker",
      displayOrder: 1,
    },
    {
      id: 2,
      documentId: "participant-2",
      name: "Rajiv Thapa",
      photo: null,
      bio: "CEO at a leading fintech startup, panelist on digital payments.",
      designation: "CEO",
      organization: "PayNep",
      role: "panelist",
      displayOrder: 2,
    },
  ],
  3: [
    {
      id: 3,
      documentId: "participant-3",
      name: "Sunita Gurung",
      photo: null,
      bio: "Award-winning researcher in AI policy.",
      designation: "Research Lead",
      organization: "NepAI Labs",
      role: "speaker",
      displayOrder: 1,
    },
  ],
};

const documents: Record<number, SessionDocument[]> = {
  1: [
    { id: 1, documentId: "doc-1", title: "Keynote Slide Deck", url: "https://drive.google.com/file/d/example1", isPublished: true },
    { id: 2, documentId: "doc-2", title: "DNF 2.0 Policy Brief", url: "https://drive.google.com/file/d/example2", isPublished: true },
  ],
  3: [
    { id: 3, documentId: "doc-3", title: "Opening Ceremony Programme", url: "https://drive.google.com/file/d/example3", isPublished: true },
  ],
};

const media: Record<number, SessionMedia[]> = {
  3: [
    {
      id: 1,
      documentId: "media-1",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      youtubeVideoId: "dQw4w9WgXcQ",
      title: "Opening Ceremony Recording",
      thumbnailUrl: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
      displayOrder: 1,
    },
  ],
};

export const mockSessions: Session[] = [
  {
    id: 1,
    documentId: "session-1",
    title: "Digital Nepal Framework 2.0 — Launch Keynote",
    agenda: "Keynote address followed by panel discussion on implementation roadmap.",
    description:
      "A live keynote unveiling the next phase of the Digital Nepal Framework, with national leaders discussing rollout priorities.",
    startTime: now,
    endTime: null,
    sessionStatus: "ongoing",
    displayOrder: 1,
    isFeatured: true,
    liveYoutubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    participants: participants[1],
    media: [],
    documents: documents[1],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 2,
    documentId: "session-2",
    title: "AI & Public Service Delivery",
    agenda: "Case studies from e-governance pilots, followed by open Q&A.",
    description:
      "Exploring how artificial intelligence is being piloted across Nepal's public service delivery systems.",
    startTime: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
    sessionStatus: "upcoming",
    displayOrder: 2,
    isFeatured: false,
    liveYoutubeUrl: null,
    participants: [],
    media: [],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 3,
    documentId: "session-3",
    title: "Opening Ceremony",
    agenda: "Welcome remarks, lighting of the lamp, and inaugural address.",
    description:
      "The formal opening of the Digital Nepal Conclave 2026, including remarks from the Hon'ble Minister.",
    startTime: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    sessionStatus: "completed",
    displayOrder: 0,
    isFeatured: false,
    liveYoutubeUrl: null,
    participants: participants[3],
    media: media[3],
    documents: documents[3],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 4,
    documentId: "session-4",
    title: "Cybersecurity for Critical Infrastructure",
    agenda: "Threat landscape overview, then a roundtable with sector CISOs.",
    description:
      "A session dedicated to protecting national digital infrastructure, with insights from public and private sector security leads.",
    startTime: new Date(Date.now() + 26 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(Date.now() + 27 * 60 * 60 * 1000).toISOString(),
    sessionStatus: "upcoming",
    displayOrder: 3,
    isFeatured: false,
    liveYoutubeUrl: null,
    participants: [],
    media: [],
    createdAt: now,
    updatedAt: now,
  },
];

export const mockNotices: Notice[] = [
  {
    id: 1,
    documentId: "notice-1",
    title: "Venue change for Hall B sessions",
    description:
      "All Hall B sessions have been relocated to Hall C on the ground floor for the remainder of the day.",
    priority: 10,
    isPublished: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 2,
    documentId: "notice-2",
    title: "Lunch served from 1:00 PM",
    description: "Lunch will be served at the East Pavilion from 1:00 PM to 2:30 PM.",
    priority: 1,
    isPublished: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 3,
    documentId: "notice-3",
    title: "Wi-Fi credentials",
    description: "Network: DNC2026-Guest · Password: conclave2026",
    priority: 5,
    isPublished: true,
    createdAt: now,
    updatedAt: now,
  },
];

export const mockInvitationCodes: InvitationCode[] = [
  { id: 1, documentId: "code-1", code: "ICT2026-AX91K", isActive: true },
  { id: 2, documentId: "code-2", code: "ICT2026-ZZ000", isActive: false },
];
