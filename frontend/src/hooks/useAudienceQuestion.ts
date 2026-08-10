import { useMutation } from "@tanstack/react-query";
import { api, USE_MOCK_DATA } from "../lib/api";
import type { AudienceQuestion } from "../types/api";

export function useSubmitQuestion() {
  return useMutation({
    mutationFn: async (question: AudienceQuestion): Promise<void> => {
      if (USE_MOCK_DATA) {
        console.info("[mock] question submitted", question);
        return;
      }

      await api.post("/audience-questions", { data: question });
    },
  });
}
