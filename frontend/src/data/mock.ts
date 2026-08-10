import type {
  InvitationCode,
  Notice,
  Session,
  SessionDocument,
  SessionMedia,
  SessionParticipant,
} from "../types/api";

const now = new Date().toISOString();

// Helper to get a time relative to now
const t = (offsetHours: number) =>
  new Date(Date.now() + offsetHours * 60 * 60 * 1000).toISOString();

// ─── Participants ────────────────────────────────────────────────────────────

const participants: Record<number, SessionParticipant[]> = {
  // Session 1 — Opening Ceremony (completed)
  1: [
    {
      id: 1,
      documentId: "participant-1",
      name: "Hon. Rekha Sharma",
      photo: null,
      bio: "Minister for Communication and Information Technology, Government of Nepal. Has championed the Digital Nepal Framework since 2019.",
      designation: "Minister",
      organization: "Ministry of Communication and IT",
      role: "session_chair",
      displayOrder: 1,
    },
    {
      id: 2,
      documentId: "participant-2",
      name: "Dr. Bimal Prasad Koirala",
      photo: null,
      bio: "Secretary at MoCIT with 20+ years in public administration and digital policy.",
      designation: "Secretary",
      organization: "Ministry of Communication and IT",
      role: "moderator",
      displayOrder: 2,
    },
    {
      id: 3,
      documentId: "participant-3",
      name: "Sushila Thapa",
      photo: null,
      bio: "Founder and Executive Director of the ICT Foundation Nepal, driving digital inclusion across rural communities.",
      designation: "Executive Director",
      organization: "ICT Foundation Nepal",
      role: "speaker",
      displayOrder: 3,
    },
  ],

  // Session 2 — DNF 2.0 Keynote (ongoing / live)
  2: [
    {
      id: 4,
      documentId: "participant-4",
      name: "Dr. Anjali Sharma",
      photo: null,
      bio: "Architect of Nepal's broadband connectivity policy and lead author of the Digital Nepal Framework 2.0.",
      designation: "Secretary",
      organization: "Ministry of Communication and IT",
      role: "speaker",
      displayOrder: 1,
    },
    {
      id: 5,
      documentId: "participant-5",
      name: "Roshan Adhikari",
      photo: null,
      bio: "Senior advisor at the World Bank's Digital Development Global Practice, specialising in South Asia.",
      designation: "Senior Advisor",
      organization: "World Bank",
      role: "speaker",
      displayOrder: 2,
    },
    {
      id: 6,
      documentId: "participant-6",
      name: "Priya Raut",
      photo: null,
      bio: "Chief Digital Officer at Nepal Telecom, overseeing nationwide 5G rollout.",
      designation: "Chief Digital Officer",
      organization: "Nepal Telecom",
      role: "panelist",
      displayOrder: 3,
    },
    {
      id: 7,
      documentId: "participant-7",
      name: "Kamal Shrestha",
      photo: null,
      bio: "Technology entrepreneur; co-founder of three fintech startups, board member at CAN Federation.",
      designation: "Co-Founder",
      organization: "NepPay Technologies",
      role: "panelist",
      displayOrder: 4,
    },
    {
      id: 8,
      documentId: "participant-8",
      name: "Laxmi Poudel",
      photo: null,
      bio: "Journalist and policy analyst covering Nepal's technology sector for over a decade.",
      designation: "Technology Editor",
      organization: "The Kathmandu Post",
      role: "moderator",
      displayOrder: 5,
    },
  ],

  // Session 3 — AI & Public Service Delivery (upcoming)
  3: [
    {
      id: 9,
      documentId: "participant-9",
      name: "Sunita Gurung",
      photo: null,
      bio: "Award-winning researcher in AI ethics and policy; lead of the NepAI Labs initiative.",
      designation: "Research Lead",
      organization: "NepAI Labs",
      role: "speaker",
      displayOrder: 1,
    },
    {
      id: 10,
      documentId: "participant-10",
      name: "Bikash Maharjan",
      photo: null,
      bio: "Director General, Department of IT; spearheaded the digital civil registration system.",
      designation: "Director General",
      organization: "Department of IT",
      role: "speaker",
      displayOrder: 2,
    },
    {
      id: 11,
      documentId: "participant-11",
      name: "Anita Karmacharya",
      photo: null,
      bio: "Program Officer at UNDP Nepal, working on digital public infrastructure for development.",
      designation: "Program Officer",
      organization: "UNDP Nepal",
      role: "panelist",
      displayOrder: 3,
    },
    {
      id: 12,
      documentId: "participant-12",
      name: "Dipesh Manandhar",
      photo: null,
      bio: "CTO at Naxa, building open-source geospatial platforms for government use.",
      designation: "CTO",
      organization: "Naxa Pvt. Ltd.",
      role: "panelist",
      displayOrder: 4,
    },
    {
      id: 13,
      documentId: "participant-13",
      name: "Dr. Mina Adhikari",
      photo: null,
      bio: "Professor of Computer Science at Tribhuvan University; AI curriculum reform advocate.",
      designation: "Professor",
      organization: "Tribhuvan University",
      role: "session_chair",
      displayOrder: 5,
    },
  ],

  // Session 4 — Fintech & Digital Payments (upcoming)
  4: [
    {
      id: 14,
      documentId: "participant-14",
      name: "Rajiv Thapa",
      photo: null,
      bio: "CEO at PayNep; pioneered QR-based interoperability across Nepal's banking networks.",
      designation: "CEO",
      organization: "PayNep Technologies",
      role: "speaker",
      displayOrder: 1,
    },
    {
      id: 15,
      documentId: "participant-15",
      name: "Subash Ghimire",
      photo: null,
      bio: "Deputy Governor, Nepal Rastra Bank, overseeing digital payment regulation and CBDC research.",
      designation: "Deputy Governor",
      organization: "Nepal Rastra Bank",
      role: "speaker",
      displayOrder: 2,
    },
    {
      id: 16,
      documentId: "participant-16",
      name: "Nisha Rana",
      photo: null,
      bio: "Founder of SheFintech Nepal, promoting financial inclusion for women through mobile money.",
      designation: "Founder",
      organization: "SheFintech Nepal",
      role: "panelist",
      displayOrder: 3,
    },
    {
      id: 17,
      documentId: "participant-17",
      name: "Arun Bajracharya",
      photo: null,
      bio: "Head of Digital Banking at Nabil Bank; led the launch of Nepal's first fully digital savings account.",
      designation: "Head of Digital Banking",
      organization: "Nabil Bank",
      role: "panelist",
      displayOrder: 4,
    },
    {
      id: 18,
      documentId: "participant-18",
      name: "Swikriti Pradhan",
      photo: null,
      bio: "Senior journalist, host of 'Tech Guff', Nepal's leading technology podcast.",
      designation: "Host & Journalist",
      organization: "TechGuff Media",
      role: "moderator",
      displayOrder: 5,
    },
  ],

  // Session 5 — Cybersecurity (upcoming)
  5: [
    {
      id: 19,
      documentId: "participant-19",
      name: "Col. Ramesh Basnet (Retd.)",
      photo: null,
      bio: "Former Head of Cyber Operations, Nepal Army; now leads the national CERT advisory board.",
      designation: "Cybersecurity Advisor",
      organization: "National CERT Nepal",
      role: "speaker",
      displayOrder: 1,
    },
    {
      id: 20,
      documentId: "participant-20",
      name: "Puja Oli",
      photo: null,
      bio: "Chief Information Security Officer at Ncell; recognized in Asia's top 50 women in cybersecurity.",
      designation: "CISO",
      organization: "Ncell",
      role: "panelist",
      displayOrder: 2,
    },
    {
      id: 21,
      documentId: "participant-21",
      name: "Prakash Dhakal",
      photo: null,
      bio: "Ethical hacker and security researcher; founder of Bug Bounty Nepal.",
      designation: "Security Researcher",
      organization: "Bug Bounty Nepal",
      role: "panelist",
      displayOrder: 3,
    },
    {
      id: 22,
      documentId: "participant-22",
      name: "Hari Bhakta Sharma",
      photo: null,
      bio: "Director, Cybersecurity Division, Nepal Telecommunications Authority.",
      designation: "Director",
      organization: "Nepal Telecom Authority",
      role: "session_chair",
      displayOrder: 4,
    },
  ],

  // Session 6 — Digital Skills & Youth (upcoming)
  6: [
    {
      id: 23,
      documentId: "participant-23",
      name: "Roshani Thapa",
      photo: null,
      bio: "CEO of YoungTech Nepal; trained 10,000+ youth in coding through community bootcamps.",
      designation: "CEO",
      organization: "YoungTech Nepal",
      role: "speaker",
      displayOrder: 1,
    },
    {
      id: 24,
      documentId: "participant-24",
      name: "Binod Bhattarai",
      photo: null,
      bio: "Country Director, Google Nepal; drives Google for Education programmes across the country.",
      designation: "Country Director",
      organization: "Google Nepal",
      role: "speaker",
      displayOrder: 2,
    },
    {
      id: 25,
      documentId: "participant-25",
      name: "Manu Tamang",
      photo: null,
      bio: "Student entrepreneur; winner of Nepal's National Innovation Challenge 2025.",
      designation: "Student Entrepreneur",
      organization: "Kathmandu University",
      role: "panelist",
      displayOrder: 3,
    },
    {
      id: 26,
      documentId: "participant-26",
      name: "Sanjaya Koirala",
      photo: null,
      bio: "Deputy Director, Technical Education and Vocational Training Authority (CTEVT).",
      designation: "Deputy Director",
      organization: "CTEVT",
      role: "panelist",
      displayOrder: 4,
    },
    {
      id: 27,
      documentId: "participant-27",
      name: "Kripa Shrestha",
      photo: null,
      bio: "Education technology researcher and former Microsoft Education Fellow.",
      designation: "EdTech Researcher",
      organization: "Open Learning Exchange Nepal",
      role: "moderator",
      displayOrder: 5,
    },
  ],
};

// ─── Documents ───────────────────────────────────────────────────────────────

const documents: Record<number, SessionDocument[]> = {
  1: [
    { id: 1, documentId: "doc-1", title: "Opening Ceremony Programme", url: "https://drive.google.com/file/d/example-oc-programme", isPublished: true },
    { id: 2, documentId: "doc-2", title: "Welcome Address — Minister's Speech", url: "https://drive.google.com/file/d/example-minister-speech", isPublished: true },
  ],
  2: [
    { id: 3, documentId: "doc-3", title: "Digital Nepal Framework 2.0 — Full Document", url: "https://drive.google.com/file/d/example-dnf2", isPublished: true },
    { id: 4, documentId: "doc-4", title: "DNF 2.0 Executive Summary", url: "https://drive.google.com/file/d/example-dnf2-summary", isPublished: true },
    { id: 5, documentId: "doc-5", title: "Keynote Slide Deck", url: "https://drive.google.com/file/d/example-keynote-slides", isPublished: true },
    { id: 6, documentId: "doc-6", title: "Panel Discussion — Moderator Questions", url: "https://drive.google.com/file/d/example-panel-qs", isPublished: false },
  ],
  3: [
    { id: 7, documentId: "doc-7", title: "AI in Public Services — Research Paper", url: "https://drive.google.com/file/d/example-ai-paper", isPublished: true },
    { id: 8, documentId: "doc-8", title: "e-Governance Pilot Case Studies", url: "https://drive.google.com/file/d/example-egov-cases", isPublished: true },
  ],
  4: [
    { id: 9, documentId: "doc-9", title: "Digital Payment Landscape — NRB Report 2025", url: "https://drive.google.com/file/d/example-nrb-report", isPublished: true },
    { id: 10, documentId: "doc-10", title: "Fintech Regulatory Sandbox Guidelines", url: "https://drive.google.com/file/d/example-sandbox-guide", isPublished: true },
  ],
  5: [
    { id: 11, documentId: "doc-11", title: "National Cybersecurity Policy 2024", url: "https://drive.google.com/file/d/example-cyber-policy", isPublished: true },
    { id: 12, documentId: "doc-12", title: "Critical Infrastructure Risk Assessment Framework", url: "https://drive.google.com/file/d/example-risk-framework", isPublished: true },
  ],
  6: [
    { id: 13, documentId: "doc-13", title: "Nepal Digital Skills Gap Report 2025", url: "https://drive.google.com/file/d/example-skills-report", isPublished: true },
  ],
};

// ─── Media (recordings) ──────────────────────────────────────────────────────

const media: Record<number, SessionMedia[]> = {
  1: [
    {
      id: 1,
      documentId: "media-1",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      youtubeVideoId: "dQw4w9WgXcQ",
      title: "Opening Ceremony — Full Recording",
      thumbnailUrl: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
      displayOrder: 1,
    },
    {
      id: 2,
      documentId: "media-2",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      youtubeVideoId: "dQw4w9WgXcQ",
      title: "Minister's Inaugural Address",
      thumbnailUrl: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
      displayOrder: 2,
    },
  ],
};

// ─── Sessions ────────────────────────────────────────────────────────────────

export const mockSessions: Session[] = [
  {
    id: 1,
    documentId: "session-1",
    title: "Opening Ceremony & Inaugural Address",
    agenda:
      "Welcome remarks by the Executive Director, lighting of the lamp, inaugural address by the Hon'ble Minister, and a cultural performance.",
    description:
      "The formal opening of Digital Nepal Conclave 2026, bringing together government leaders, industry pioneers, and development partners to set the stage for two days of dialogue on Nepal's digital future.",
    startTime: t(-5),
    endTime: t(-4),
    sessionStatus: "completed",
    displayOrder: 1,
    isFeatured: false,
    liveYoutubeUrl: null,
    participants: participants[1],
    media: media[1],
    documents: documents[1],
    createdAt: t(-48),
    updatedAt: t(-4),
  },
  {
    id: 2,
    documentId: "session-2",
    title: "Digital Nepal Framework 2.0 — Launch Keynote",
    agenda:
      "Keynote address unveiling DNF 2.0 pillars, followed by a moderated panel on implementation priorities and funding roadmap.",
    description:
      "The centrepiece session of DNC 2026. National and international leaders present the next evolution of the Digital Nepal Framework, outlining connectivity, digital identity, open data, and AI integration goals for 2026–2030.",
    startTime: t(-1),
    endTime: t(0.5),
    sessionStatus: "ongoing",
    displayOrder: 2,
    isFeatured: true,
    liveYoutubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    participants: participants[2],
    media: [],
    documents: documents[2],
    createdAt: t(-48),
    updatedAt: now,
  },
  {
    id: 3,
    documentId: "session-3",
    title: "AI & Public Service Delivery",
    agenda:
      "Presentations on three e-governance AI pilots, panel discussion on ethics and accountability, and open Q&A with the audience.",
    description:
      "How is artificial intelligence reshaping the way Nepal's government delivers services? This session examines real-world deployments — from AI-assisted land record digitisation to smart health triage systems — and debates the policy guardrails needed.",
    startTime: t(2),
    endTime: t(3.5),
    sessionStatus: "upcoming",
    displayOrder: 3,
    isFeatured: false,
    liveYoutubeUrl: null,
    participants: participants[3],
    media: [],
    documents: documents[3],
    createdAt: t(-48),
    updatedAt: t(-24),
  },
  {
    id: 4,
    documentId: "session-4",
    title: "Fintech & the Future of Digital Payments",
    agenda:
      "State of Nepal's payment ecosystem, CBDC update from NRB, startup lightning pitches, and a panel on cross-border remittance innovation.",
    description:
      "From mobile wallets and QR payments to the prospect of a digital rupee, Nepal's fintech landscape is evolving fast. Regulators, bankers, and entrepreneurs share the stage to map out where digital money is headed.",
    startTime: t(4),
    endTime: t(5.5),
    sessionStatus: "upcoming",
    displayOrder: 4,
    isFeatured: false,
    liveYoutubeUrl: null,
    participants: participants[4],
    media: [],
    documents: documents[4],
    createdAt: t(-48),
    updatedAt: t(-24),
  },
  {
    id: 5,
    documentId: "session-5",
    title: "Cybersecurity for Critical National Infrastructure",
    agenda:
      "Threat landscape briefing, sector CISO roundtable (banking, energy, telecom), and a live demonstration of incident response protocols.",
    description:
      "As Nepal's digital infrastructure grows, so does the attack surface. This session brings together security professionals from government and the private sector to discuss threat intelligence sharing, the national CERT roadmap, and building a culture of security.",
    startTime: t(26),
    endTime: t(27.5),
    sessionStatus: "upcoming",
    displayOrder: 5,
    isFeatured: false,
    liveYoutubeUrl: null,
    participants: participants[5],
    media: [],
    documents: documents[5],
    createdAt: t(-48),
    updatedAt: t(-24),
  },
  {
    id: 6,
    documentId: "session-6",
    title: "Digital Skills & Youth Innovation",
    agenda:
      "Youth innovation showcase, panel on closing the digital skills gap, announcement of the DNC 2026 Scholarship Programme.",
    description:
      "Nepal's young population is its greatest digital asset. This session celebrates student innovators, hears from educators and industry on bridging skills gaps, and launches new national initiatives to bring coding, AI literacy, and entrepreneurship to every district.",
    startTime: t(28),
    endTime: t(29.5),
    sessionStatus: "upcoming",
    displayOrder: 6,
    isFeatured: false,
    liveYoutubeUrl: null,
    participants: participants[6],
    media: [],
    documents: documents[6],
    createdAt: t(-48),
    updatedAt: t(-24),
  },
];

// ─── Notices ─────────────────────────────────────────────────────────────────

export const mockNotices: Notice[] = [
  {
    id: 1,
    documentId: "notice-1",
    title: "Venue change — Hall B sessions moved to Hall C",
    description:
      "Due to AV setup requirements, all sessions originally scheduled in Hall B have been relocated to Hall C on the ground floor. Directional signage is in place.",
    priority: 10,
    isPublished: true,
    createdAt: t(-2),
    updatedAt: t(-2),
  },
  {
    id: 2,
    documentId: "notice-2",
    title: "Live stream link updated for Keynote session",
    description:
      "The YouTube live link for the DNF 2.0 Keynote has been updated. Please refresh the session page to load the correct stream.",
    priority: 9,
    isPublished: true,
    createdAt: t(-1),
    updatedAt: t(-1),
  },
  {
    id: 3,
    documentId: "notice-3",
    title: "Wi-Fi credentials",
    description: "Network: DNC2026-Guest · Password: conclave2026#",
    priority: 5,
    isPublished: true,
    createdAt: t(-24),
    updatedAt: t(-24),
  },
  {
    id: 4,
    documentId: "notice-4",
    title: "Lunch served from 1:00 PM – 2:30 PM",
    description:
      "Lunch will be served at the East Pavilion. Vegetarian and non-vegetarian counters are available. Please carry your delegate badge for entry.",
    priority: 3,
    isPublished: true,
    createdAt: t(-24),
    updatedAt: t(-24),
  },
  {
    id: 5,
    documentId: "notice-5",
    title: "Group photo — all delegates at 5:00 PM",
    description:
      "All registered delegates are invited to the group photo session at 5:00 PM on the main stage steps. Please be seated by 4:50 PM.",
    priority: 4,
    isPublished: true,
    createdAt: t(-12),
    updatedAt: t(-12),
  },
];

// ─── Invitation codes ────────────────────────────────────────────────────────

export const mockInvitationCodes: InvitationCode[] = [
  { id: 1, documentId: "code-1", code: "DNC26-AAAAA", isActive: true },
  { id: 2, documentId: "code-2", code: "DNC26-BBBBB", isActive: true },
  { id: 3, documentId: "code-3", code: "DNC26-CCCCC", isActive: true },
  { id: 4, documentId: "code-4", code: "DNC26-DDDDD", isActive: true },
  { id: 5, documentId: "code-5", code: "DNC26-EEEEE", isActive: false },
];
