import {
  getEnv,
  toHttpUrl,
  toNodeEnv,
  toOptionalHttpUrl,
  toSampleRate,
} from "./env.shared";

const NODE_ENV = getEnv("NODE_ENV", process.env.NODE_ENV, {
  fallback: "development",
  transform: toNodeEnv,
});

export const env = {
  NODE_ENV,
  IS_PRODUCTION: NODE_ENV === "production",
  EVENT_ID: getEnv("NEXT_PUBLIC_EVENT_ID", process.env.NEXT_PUBLIC_EVENT_ID, {
    required: true,
  }),
  ANALYTICS_GATEWAY_URL: getEnv(
    "NEXT_PUBLIC_ANALYTICS_GATEWAY_URL",
    process.env.NEXT_PUBLIC_ANALYTICS_GATEWAY_URL,
    { required: true, transform: toHttpUrl },
  ),
  API_URL: getEnv("NEXT_PUBLIC_API_URL", process.env.NEXT_PUBLIC_API_URL, {
    fallback: "",
    transform: toOptionalHttpUrl,
  }),
  OTEL_ENDPOINT: getEnv(
    "NEXT_PUBLIC_OTEL_ENDPOINT",
    process.env.NEXT_PUBLIC_OTEL_ENDPOINT,
    {
      fallback:
        NODE_ENV === "production"
          ? "https://api.omnixys.com/otel/v1/traces"
          : "/otel/v1/traces",
    },
  ),
  OTEL_SERVICE_NAME: getEnv(
    "NEXT_PUBLIC_OTEL_SERVICE_NAME",
    process.env.NEXT_PUBLIC_OTEL_SERVICE_NAME,
    { fallback: "wedding-web" },
  ),
  OTEL_SAMPLE_RATE: getEnv(
    "NEXT_PUBLIC_OTEL_SAMPLE_RATE",
    process.env.NEXT_PUBLIC_OTEL_SAMPLE_RATE,
    {
      fallback: NODE_ENV === "production" ? "0.1" : "1",
      transform: toSampleRate,
    },
  ),
} as const;
