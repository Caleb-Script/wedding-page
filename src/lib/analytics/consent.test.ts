import { describe, expect, it } from "vitest";
import {
  anonymousId,
  persistAnonymousId,
  WEDDING_ANONYMOUS_ID_KEY,
} from "./anonymous-id";
import { createAnalyticsConsentCookie, readAnalyticsConsent } from "./consent";

describe("wedding analytics privacy state", () => {
  it("accepts a valid signed consent cookie and rejects tampering", () => {
    const value = createAnalyticsConsentCookie("granted");
    expect(readAnalyticsConsent({ get: () => ({ value }) })).toBe("granted");
    expect(
      readAnalyticsConsent({ get: () => ({ value: `${value}tampered` }) }),
    ).toBe("unknown");
  });

  it("persists an anonymous id only while consent is granted", () => {
    const values = new Map<string, string>();
    const storage = {
      getItem: (key: string) => values.get(key) ?? null,
      removeItem: (key: string) => {
        values.delete(key);
      },
      setItem: (key: string, value: string) => {
        values.set(key, value);
      },
    };
    const id = anonymousId(storage);
    persistAnonymousId(storage, id, "granted");
    expect(values.get(WEDDING_ANONYMOUS_ID_KEY)).toBe(id);
    persistAnonymousId(storage, id, "denied");
    expect(values.has(WEDDING_ANONYMOUS_ID_KEY)).toBe(false);
  });
});
