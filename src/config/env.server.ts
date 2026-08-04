import "server-only";

import { env as publicEnv } from "./env";
import { getEnv, minLength, toBoolean, toHttpUrl, toPort } from "./env.shared";

export const env = {
  ...publicEnv,
  ANALYTICS_CONSENT_SECRET: getEnv(
    "ANALYTICS_CONSENT_SECRET",
    process.env.ANALYTICS_CONSENT_SECRET,
    { required: true, transform: minLength(32) },
  ),
  MINIO_ENDPOINT: getEnv("MINIO_ENDPOINT", process.env.MINIO_ENDPOINT, {
    required: true,
  }),
  MINIO_PORT: getEnv("MINIO_PORT", process.env.MINIO_PORT, {
    required: true,
    transform: toPort,
  }),
  MINIO_USE_SSL: getEnv("MINIO_USE_SSL", process.env.MINIO_USE_SSL, {
    required: true,
    transform: toBoolean,
  }),
  MINIO_ACCESS_KEY: getEnv("MINIO_ACCESS_KEY", process.env.MINIO_ACCESS_KEY, {
    required: true,
  }),
  MINIO_SECRET_KEY: getEnv("MINIO_SECRET_KEY", process.env.MINIO_SECRET_KEY, {
    required: true,
  }),
  MINIO_PUBLIC_URL: getEnv("MINIO_PUBLIC_URL", process.env.MINIO_PUBLIC_URL, {
    required: true,
    transform: toHttpUrl,
  }),
} as const;
