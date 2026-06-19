import { useQuery } from "@tanstack/react-query";
import qs from "qs";
import { api, USE_MOCK_DATA } from "../lib/api";
import { mockSessions } from "../data/mock";
import type { Session, StrapiCollectionResponse, StrapiSingleResponse } from "../types/api";

// Strapi v5 only returns photo/media files when the relation holding them is
// populated explicitly - populate=* does not recurse into nested relations.
const SESSION_POPULATE = {
  participants: { populate: ["photo"] },
  media: true,
  documents: true,
};

export function useSessions() {
  return useQuery({
    queryKey: ["sessions"],
    queryFn: async (): Promise<Session[]> => {
      if (USE_MOCK_DATA) return mockSessions;

      const query = qs.stringify(
        { populate: SESSION_POPULATE, sort: ["displayOrder:asc"] },
        { encodeValuesOnly: true },
      );
      const res = await api.get<StrapiCollectionResponse<Session>>(`/sessions?${query}`);
      return res.data.data;
    },
  });
}

// Strapi v5's single-entry endpoint is keyed by documentId, not the numeric id -
// /sessions/:id 404s even though that same id appears in the list response.
export function useSession(documentId: string | undefined) {
  return useQuery({
    queryKey: ["sessions", documentId],
    queryFn: async (): Promise<Session | undefined> => {
      if (USE_MOCK_DATA) return mockSessions.find((s) => s.documentId === documentId);

      const query = qs.stringify({ populate: SESSION_POPULATE }, { encodeValuesOnly: true });
      const res = await api.get<StrapiSingleResponse<Session>>(
        `/sessions/${documentId}?${query}`,
      );
      return res.data.data;
    },
    enabled: !!documentId,
  });
}
