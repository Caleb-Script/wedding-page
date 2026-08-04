import { describe, expect, it } from "vitest";
import {
  getEnv,
  minLength,
  toBoolean,
  toHttpUrl,
  toPort,
  toUuid,
} from "./env.shared";

describe("environment validation", () => {
  it("rejects missing required values", () => {
    expect(() => getEnv("REQUIRED", undefined, { required: true })).toThrow(
      "Missing required environment variable: REQUIRED",
    );
  });

  it("transforms valid values", () => {
    expect(getEnv("BOOL", "true", { transform: toBoolean })).toBe(true);
    expect(getEnv("PORT", "3001", { transform: toPort })).toBe(3001);
  });

  it("rejects malformed structured values", () => {
    expect(() =>
      getEnv("URL", "ftp://example.com", { transform: toHttpUrl }),
    ).toThrow();
    expect(() => getEnv("UUID", "not-a-uuid", { transform: toUuid })).toThrow();
    expect(() => getEnv("PORT", "70000", { transform: toPort })).toThrow();
    expect(() =>
      getEnv("SECRET", "short", { transform: minLength(32) }),
    ).toThrow();
  });
});
