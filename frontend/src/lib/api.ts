import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === "true";

// Strapi's local upload provider returns media URLs relative to its origin
// (e.g. "/uploads/x.jpg"), not the "/api"-suffixed base URL used for requests.
const STRAPI_ORIGIN = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/api\/?$/, "");

export function resolveMediaUrl(url?: string | null): string | null {
  if (!url) return null;
  if (/^https?:\/\//.test(url)) return url;
  return `${STRAPI_ORIGIN}${url}`;
}
