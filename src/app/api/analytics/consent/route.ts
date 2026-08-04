import type { ConsentState } from "@omnixys/analytics-sdk/browser";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  ANALYTICS_CONSENT_COOKIE,
  ANALYTICS_CONSENT_MAX_AGE_SECONDS,
  createAnalyticsConsentCookie,
} from "@/lib/analytics/consent";

export async function POST(request: Request): Promise<NextResponse> {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ code: "INVALID_ORIGIN" }, { status: 403 });
  }
  const body = (await request.json().catch(() => null)) as {
    state?: ConsentState;
  } | null;
  const state = body?.state;
  if (state !== "granted" && state !== "denied" && state !== "unknown") {
    return NextResponse.json({ code: "INVALID_CONSENT" }, { status: 400 });
  }
  const cookieStore = await cookies();
  if (state === "unknown") {
    cookieStore.delete(ANALYTICS_CONSENT_COOKIE);
  } else {
    cookieStore.set(
      ANALYTICS_CONSENT_COOKIE,
      createAnalyticsConsentCookie(state),
      {
        httpOnly: true,
        maxAge: ANALYTICS_CONSENT_MAX_AGE_SECONDS,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      },
    );
  }
  return NextResponse.json({ state });
}

function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const protocol =
    request.headers.get("x-forwarded-proto") ??
    (process.env.NODE_ENV === "production" ? "https" : "http");
  if (!origin || !host) return false;
  try {
    return new URL(origin).origin === `${protocol}://${host}`;
  } catch {
    return false;
  }
}
