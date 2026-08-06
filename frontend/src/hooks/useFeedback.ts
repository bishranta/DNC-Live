import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import qs from "qs";
import { api, USE_MOCK_DATA } from "../lib/api";
import { mockInvitationCodes } from "../data/mock";
import { ratedSessionsStorage } from "../lib/storage";
import type {
  InvitationCode,
  SessionFeedback,
  StrapiCollectionResponse,
} from "../types/api";

export function useValidateInvitationCode() {
  return useMutation({
    mutationFn: async (code: string): Promise<InvitationCode | null> => {
      if (USE_MOCK_DATA) {
        const match = mockInvitationCodes.find(
          (c) => c.code.toLowerCase() === code.toLowerCase() && c.isActive,
        );
        return match ?? null;
      }

      const query = qs.stringify(
        { filters: { code: { $eq: code }, isActive: { $eq: true } } },
        { encodeValuesOnly: true },
      );
      const res = await api.get<StrapiCollectionResponse<InvitationCode>>(
        `/invitation-codes?${query}`,
      );
      return res.data.data[0] ?? null;
    },
  });
}

/** Session ids this invitation code has already rated. */
export function useRatedSessionIds(code: string | null) {
  return useQuery({
    queryKey: ["session-feedbacks", code],
    enabled: !!code,
    // cached ids render instantly and survive a refresh even before the API answers
    initialData: () => ratedSessionsStorage.get(code),
    queryFn: async (): Promise<number[]> => {
      if (USE_MOCK_DATA) return ratedSessionsStorage.get(code);

      // invitationCode is a relation — filter through its `code` field, not on the relation itself
      const query = qs.stringify(
        {
          filters: { invitationCode: { code: { $eq: code } } },
          fields: ["id"],
          populate: { session: { fields: ["id"] } },
          pagination: { pageSize: 100 },
        },
        { encodeValuesOnly: true },
      );
      const res = await api.get<StrapiCollectionResponse<{ session?: { id: number } }>>(
        `/session-feedbacks?${query}`,
      );
      const ids = res.data.data.map((f) => f.session?.id).filter((id): id is number => !!id);
      // keep the local cache in sync with the server, but never lose ids it hasn't returned
      return ratedSessionsStorage.add(code!, ...ids);
    },
  });
}

export function useSubmitFeedback() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (feedback: SessionFeedback): Promise<void> => {
      if (USE_MOCK_DATA) {
        console.info("[mock] feedback submitted", feedback);
      } else {
        await api.post("/session-feedbacks", { data: feedback });
      }
      ratedSessionsStorage.add(feedback.invitationCode, feedback.session);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["session-feedbacks"] }),
  });
}
