const PARTICIPANT_CODE_KEY = "participantCode";

export const participantCodeStorage = {
  get: () => localStorage.getItem(PARTICIPANT_CODE_KEY),
  set: (code: string) => localStorage.setItem(PARTICIPANT_CODE_KEY, code),
  clear: () => localStorage.removeItem(PARTICIPANT_CODE_KEY),
};

// Sessions this code has already rated. Keyed by code so it survives sign-out,
// and never cleared — a submitted rating is permanent.
const ratedKey = (code: string) => `ratedSessions:${code}`;

export const ratedSessionsStorage = {
  get: (code: string | null): number[] => {
    if (!code) return [];
    try {
      return JSON.parse(localStorage.getItem(ratedKey(code)) ?? "[]");
    } catch {
      return [];
    }
  },
  add: (code: string, ...sessionIds: number[]): number[] => {
    const merged = [...new Set([...ratedSessionsStorage.get(code), ...sessionIds])];
    localStorage.setItem(ratedKey(code), JSON.stringify(merged));
    return merged;
  },
};
