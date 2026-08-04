import {
  getEnv,
  toHttpUrl,
  toNodeEnv,
  toOptionalHttpUrl,
  toUuid,
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
    transform: toUuid,
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
} as const;
