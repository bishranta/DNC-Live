// Field names assume Strapi's default camelCase attribute convention
// (confirm against the real schema once the backend is reachable).

export interface StrapiCollectionResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta: Record<string, never>;
}

export type SessionStatus = "upcoming" | "ongoing" | "completed";

export type ParticipantRole =
  | "speaker"
  | "panelist"
  | "moderator"
  | "session_chair";

export interface StrapiMedia {
  id: number;
  documentId: string;
  url: string;
  width?: number | null;
  height?: number | null;
}

export interface SessionParticipant {
  id: number;
  documentId: string;
  name: string;
  photo?: StrapiMedia | null;
  bio?: string | null;
  designation?: string | null;
  organization?: string | null;
  role: ParticipantRole;
  displayOrder: number;
}

export interface SessionMedia {
  id: number;
  documentId: string;
  youtubeUrl: string;
  youtubeVideoId: string;
  title: string;
  thumbnailUrl: string;
  displayOrder: number;
}

export interface Session {
  id: number;
  documentId: string;
  title: string;
  agenda: string;
  description: string;
  startTime: string | null;
  endTime: string | null;
  sessionStatus: SessionStatus;
  displayOrder: number;
  isFeatured: boolean;
  liveYoutubeUrl?: string | null;
  participants?: SessionParticipant[];
  media?: SessionMedia[];
  documents?: SessionDocument[];
  createdAt: string;
  updatedAt: string;
}

export interface Notice {
  id: number;
  documentId: string;
  title: string;
  description: string;
  priority: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface InvitationCode {
  id: number;
  documentId: string;
  code: string;
  isActive: boolean;
}

export interface SessionDocument {
  id: number;
  documentId: string;
  title: string;
  url: string;
  isPublished: boolean;
}

export interface SessionFeedback {
  id?: number;
  documentId?: string;
  session: number;
  invitationCode: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment?: string;
}
