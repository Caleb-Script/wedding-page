"use client";

import {
  type ConsentState,
  createAnalytics,
} from "@omnixys/analytics-sdk/browser";
import { usePathname } from "next/navigation";
import { useReportWebVitals } from "next/web-vitals";
import { useLocale } from "next-intl";
import type React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { env } from "@/config/env";
import {
  persistAnonymousId,
  anonymousId as resolveAnonymousId,
} from "@/lib/analytics/anonymous-id";

const EVENT_ID = env.EVENT_ID;
const ANALYTICS_ENDPOINT = env.ANALYTICS_GATEWAY_URL;

type AnalyticsClient = ReturnType<typeof createAnalytics>;
const AnalyticsContext = createContext<AnalyticsClient | null>(null);
const ConsentContext = createContext<{
  consent: ConsentState;
  updateConsent(state: ConsentState): Promise<void>;
} | null>(null);

export function WeddingAnalyticsProvider({
  children,
  initialConsent,
}: {
  children: React.ReactNode;
  initialConsent: ConsentState;
}) {
  const [consent, setConsent] = useState(initialConsent);
  const [anonymousId] = useState(readOrCreateAnonymousId);
  const [client] = useState(() =>
    createAnalytics({
      anonymousId,
      consent: initialConsent,
      endpoint: ANALYTICS_ENDPOINT,
      flushAt: 10,
      tokenProvider: async () => {
        const response = await fetch(
          `${ANALYTICS_ENDPOINT}/v1/analytics/token`,
          {
            method: "POST",
            credentials: "include",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              publicReference: { type: "event", id: EVENT_ID },
            }),
          },
        );
        if (!response.ok)
          throw new Error(
            `Analytics token request failed with HTTP ${response.status}`,
          );
        const payload = (await response.json()) as { token?: unknown };
        if (typeof payload.token !== "string" || !payload.token)
          throw new Error("Analytics token response did not contain a token");
        return payload.token;
      },
      context: analyticsContext,
    }),
  );

  const updateConsent = useCallback(
    async (state: ConsentState) => {
      if (state !== "granted") {
        client.setConsent(state);
        persistAnonymousId(localStorage, anonymousId, state);
        setConsent(state);
      }
      const response = await fetch("/api/analytics/consent", {
        method: "POST",
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ state }),
      });
      if (!response.ok)
        throw new Error("Analytics consent could not be updated");
      if (state === "granted") {
        persistAnonymousId(localStorage, anonymousId, state);
        client.setConsent(state);
        setConsent(state);
      }
    },
    [anonymousId, client],
  );

  useEffect(() => {
    persistAnonymousId(localStorage, anonymousId, consent);
  }, [anonymousId, consent]);

  return (
    <ConsentContext.Provider value={{ consent, updateConsent }}>
      <AnalyticsContext.Provider value={client}>
        <AnalyticsNavigation />
        <WeddingWebVitals />
        {children}
        <AnalyticsConsentBanner />
      </AnalyticsContext.Provider>
    </ConsentContext.Provider>
  );
}

function AnalyticsNavigation() {
  const analytics = useAnalytics();
  const pathname = usePathname();
  useEffect(() => {
    analytics.page("$pageview", { eventId: EVENT_ID, path: pathname });
  }, [analytics, pathname]);
  return null;
}

function WeddingWebVitals() {
  const analytics = useAnalytics();
  const report = useCallback(
    (metric: { name: string; value: number; rating?: string }) => {
      if (!["LCP", "INP", "CLS", "TTFB"].includes(metric.name)) return;
      analytics.track("WeddingWebVitalMeasured", {
        metric: metric.name,
        rating: metric.rating ?? "unknown",
        value: metric.value,
      });
    },
    [analytics],
  );
  useReportWebVitals(report);
  return null;
}

function AnalyticsConsentBanner() {
  const { consent, updateConsent } = useAnalyticsConsent();
  const locale = useLocale();
  if (consent !== "unknown") return null;
  const german = locale.startsWith("de");
  return (
    <aside
      aria-label="Analytics consent"
      style={{
        alignItems: "center",
        background: "#111",
        border: "1px solid rgba(216,184,121,.45)",
        borderRadius: 16,
        bottom: 16,
        color: "#f1ece2",
        display: "flex",
        flexWrap: "wrap",
        gap: 12,
        left: 16,
        maxWidth: 620,
        padding: 16,
        position: "fixed",
        right: 16,
        zIndex: 3000,
      }}
    >
      <span style={{ flex: "1 1 300px" }}>
        {german
          ? "Dürfen wir anonyme Nutzungsdaten verwenden, um diese Hochzeitsseite zu verbessern?"
          : "May we use anonymous usage data to improve this wedding website?"}
      </span>
      <button type="button" onClick={() => void updateConsent("denied")}>
        {german ? "Ablehnen" : "Decline"}
      </button>
      <button type="button" onClick={() => void updateConsent("granted")}>
        {german ? "Erlauben" : "Allow"}
      </button>
    </aside>
  );
}

export function useAnalytics(): AnalyticsClient {
  return useContext(AnalyticsContext) ?? NOOP_ANALYTICS;
}

export function useAnalyticsConsent() {
  const value = useContext(ConsentContext);
  if (!value)
    throw new Error(
      "useAnalyticsConsent must be used inside WeddingAnalyticsProvider",
    );
  return value;
}

function readOrCreateAnonymousId(): string {
  return resolveAnonymousId(
    typeof window === "undefined" ? undefined : localStorage,
  );
}

function analyticsContext(): Record<string, unknown> {
  const location = globalThis.location;
  const params = location ? new URLSearchParams(location.search) : undefined;
  return {
    application: "wedding",
    deviceClass: deviceClass(),
    eventId: EVENT_ID,
    locale: document.documentElement.lang || undefined,
    path: location?.pathname,
    referrerDomain: safeReferrerDomain(document.referrer),
    utmCampaign: params?.get("utm_campaign") ?? undefined,
    utmMedium: params?.get("utm_medium") ?? undefined,
    utmSource: params?.get("utm_source") ?? undefined,
  };
}

function deviceClass(): "mobile" | "tablet" | "desktop" {
  if (globalThis.innerWidth < 640) return "mobile";
  if (globalThis.innerWidth < 1024) return "tablet";
  return "desktop";
}

function safeReferrerDomain(referrer: string): string | undefined {
  if (!referrer) return undefined;
  try {
    return new URL(referrer).hostname;
  } catch {
    return undefined;
  }
}

const NOOP_ANALYTICS = {
  alias: () => "",
  flush: async () => {},
  group: () => "",
  identify: () => "",
  page: () => "",
  pending: () => 0,
  reloadFeatureFlags: () => {},
  reset: () => {},
  screen: () => "",
  setConsent: () => {},
  shutdown: async () => {},
  track: () => "",
  getFeatureFlag: async (_key: string, fallback: unknown) => fallback,
  getFeatureFlagEvaluation: async () => undefined,
} as unknown as AnalyticsClient;
