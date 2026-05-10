import { API_DEFAULT_BASE_URL } from '../constants/config';

export const getApiBaseUrl = (): string =>
  import.meta.env.VITE_API_BASE_URL ?? API_DEFAULT_BASE_URL;

export const buildUrl = (path: string, query?: Record<string, string | number>): string => {
  const base = getApiBaseUrl().replace(/\/$/, '');
  const url = new URL(`${base}${path}`);
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.set(key, String(value));
    });
  }
  return url.toString();
};

export const readTotalCount = (headers: Headers): number => {
  const raw = headers.get('X-Total-Count');
  if (!raw) {
    return 0;
  }
  const parsed = Number.parseInt(raw, 10);
  return Number.isNaN(parsed) ? 0 : parsed;
};
