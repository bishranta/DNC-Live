import { useMutation } from "@tanstack/react-query";
import qs from "qs";
import { api, USE_MOCK_DATA } from "../lib/api";
import { mockInvitationCodes } from "../data/mock";
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

export function useSubmitFeedback() {
  return useMutation({
    mutationFn: async (feedback: SessionFeedback): Promise<void> => {
      if (USE_MOCK_DATA) {
        console.info("[mock] feedback submitted", feedback);
        return;
      }

      await api.post("/session-feedbacks", { data: feedback });
    },
  });
}
