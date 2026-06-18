const PARTICIPANT_CODE_KEY = "participantCode";

export const participantCodeStorage = {
  get: () => localStorage.getItem(PARTICIPANT_CODE_KEY),
  set: (code: string) => localStorage.setItem(PARTICIPANT_CODE_KEY, code),
  clear: () => localStorage.removeItem(PARTICIPANT_CODE_KEY),
};
