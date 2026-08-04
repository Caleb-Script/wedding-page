import type { ConsentState } from "@omnixys/analytics-sdk/browser";

export const WEDDING_ANONYMOUS_ID_KEY =
  "omnixys.wedding.analytics.anonymous-id";

export interface AnalyticsStorage {
  getItem(key: string): string | null;
  removeItem(key: string): void;
  setItem(key: string, value: string): void;
}

export function anonymousId(storage?: AnalyticsStorage): string {
  return storage?.getItem(WEDDING_ANONYMOUS_ID_KEY) ?? crypto.randomUUID();
}

export function persistAnonymousId(
  storage: AnalyticsStorage,
  id: string,
  consent: ConsentState,
): void {
  if (consent === "granted") storage.setItem(WEDDING_ANONYMOUS_ID_KEY, id);
  else storage.removeItem(WEDDING_ANONYMOUS_ID_KEY);
}
