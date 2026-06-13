import { Client } from "minio";

function requiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const minioClient = new Client({
  endPoint: requiredEnv("MINIO_ENDPOINT"),
  port: Number(requiredEnv("MINIO_PORT")),
  useSSL: process.env.MINIO_USE_SSL === "true",

  accessKey: requiredEnv("MINIO_ACCESS_KEY"),
  secretKey: requiredEnv("MINIO_SECRET_KEY"),
});
