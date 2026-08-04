import { createHmac, timingSafeEqual } from "node:crypto";
import type { ConsentState } from "@omnixys/analytics-sdk/browser";
import { env } from "@/config/env.server";

export const ANALYTICS_CONSENT_COOKIE = "omnixys.analytics.consent";
export const ANALYTICS_CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 180;

interface CookieReader {
  get(name: string): { value: string } | undefined;
}

export function readAnalyticsConsent(cookies: CookieReader): ConsentState {
  const encoded = cookies.get(ANALYTICS_CONSENT_COOKIE)?.value;
  if (!encoded) return "unknown";
  const [state, issuedAtValue, signature] = encoded.split(".");
  if (
    (state !== "granted" && state !== "denied") ||
    !issuedAtValue ||
    !signature
  ) {
    return "unknown";
  }
  const issuedAt = Number(issuedAtValue);
  const now = Math.floor(Date.now() / 1_000);
  if (
    !Number.isSafeInteger(issuedAt) ||
    issuedAt > now + 60 ||
    now - issuedAt > ANALYTICS_CONSENT_MAX_AGE_SECONDS
  ) {
    return "unknown";
  }
  return safeEqual(signature, sign(`${state}.${issuedAtValue}`))
    ? state
    : "unknown";
}

export function createAnalyticsConsentCookie(
  state: Exclude<ConsentState, "unknown">,
): string {
  const issuedAt = Math.floor(Date.now() / 1_000);
  const payload = `${state}.${issuedAt}`;
  return `${payload}.${sign(payload)}`;
}

function sign(value: string): string {
  return createHmac("sha256", env.ANALYTICS_CONSENT_SECRET)
    .update(value)
    .digest("base64url");
}

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}
