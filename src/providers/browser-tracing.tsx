"use client";

import type { ConsentState } from "@omnixys/analytics-sdk/browser";
import { initializeBrowserTracing } from "@omnixys/observability-ts/browser";
import { useEffect, useRef } from "react";
import { env } from "@/config/env";

type BrowserTracing = Awaited<ReturnType<typeof initializeBrowserTracing>>;
type BrowserTracingInitializer = () => Promise<BrowserTracing>;

const initializeWeddingBrowserTracing: BrowserTracingInitializer = () =>
  initializeBrowserTracing({
    serviceName: env.OTEL_SERVICE_NAME,
    environment: env.NODE_ENV,
    sampleRate: env.OTEL_SAMPLE_RATE,
    otlpEndpoint: env.OTEL_ENDPOINT,
    enabled: true,
  });

export function createWeddingBrowserTracingController(
  initialize: BrowserTracingInitializer = initializeWeddingBrowserTracing,
) {
  let enabled = false;
  let pending: Promise<void> | undefined;
  let shutdown: (() => Promise<void>) | undefined;

  return {
    async update(consent: ConsentState): Promise<void> {
      enabled = consent === "granted";

      if (enabled && !shutdown && !pending) {
        pending = initialize()
          .then((tracing) => {
            if (enabled) {
              shutdown = tracing.shutdown;
              return;
            }
            return tracing.shutdown();
          })
          .finally(() => {
            pending = undefined;
          });
      }

      if (!enabled && shutdown) {
        const activeShutdown = shutdown;
        shutdown = undefined;
        await activeShutdown();
      }

      await pending;
    },
    async dispose(): Promise<void> {
      enabled = false;
      if (shutdown) {
        const activeShutdown = shutdown;
        shutdown = undefined;
        await activeShutdown();
      }
      await pending;
    },
  };
}

export function WeddingBrowserTracing({ consent }: { consent: ConsentState }) {
  const controller = useRef<ReturnType<
    typeof createWeddingBrowserTracingController
  > | null>(null);
  if (!controller.current) {
    controller.current = createWeddingBrowserTracingController();
  }

  useEffect(() => {
    void controller.current?.update(consent);
  }, [consent]);

  useEffect(
    () => () => {
      void controller.current?.dispose();
    },
    [],
  );

  return null;
}
