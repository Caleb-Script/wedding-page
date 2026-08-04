import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "server-only": fileURLToPath(
        new URL("./src/test/server-only.ts", import.meta.url),
      ),
    },
  },
  test: {
    environment: "node",
    env: {
      NEXT_PUBLIC_EVENT_ID: "6d650ee6-8ed0-4694-afd4-71871c37683a",
      NEXT_PUBLIC_ANALYTICS_GATEWAY_URL: "http://localhost:8000",
      ANALYTICS_CONSENT_SECRET: "wedding-test-consent-secret-not-production",
      MINIO_ENDPOINT: "localhost",
      MINIO_PORT: "9000",
      MINIO_USE_SSL: "false",
      MINIO_ACCESS_KEY: "test-access-key",
      MINIO_SECRET_KEY: "test-secret-key",
      MINIO_PUBLIC_URL: "http://localhost:9000",
    },
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
