import { useQuery } from "@tanstack/react-query";
import qs from "qs";
import { api, USE_MOCK_DATA } from "../lib/api";
import { mockNotices } from "../data/mock";
import type { Notice, StrapiCollectionResponse } from "../types/api";

export function useNotices() {
  return useQuery({
    queryKey: ["notices"],
    queryFn: async (): Promise<Notice[]> => {
      if (USE_MOCK_DATA) return mockNotices.filter((n) => n.isPublished);

      const query = qs.stringify(
        { filters: { isPublished: { $eq: true } }, sort: ["priority:desc"] },
        { encodeValuesOnly: true },
      );
      const res = await api.get<StrapiCollectionResponse<Notice>>(`/notices?${query}`);
      return res.data.data;
    },
  });
}
