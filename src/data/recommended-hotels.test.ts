import { describe, expect, it } from "vitest";
import {
  RECOMMENDED_HOTELS,
  resolveHotelContentLocale,
} from "./recommended-hotels";
import { WEDDING_LOCATIONS } from "./wedding-locations";

const LOCALES = ["ak", "de", "en", "it"] as const;

const reception = WEDDING_LOCATIONS.find(
  (location) => location.id === "reception",
);

describe("recommended hotels", () => {
  it("ships locally complete, well-formed entries", () => {
    const ids = new Set<string>();

    for (const hotel of RECOMMENDED_HOTELS) {
      expect(ids.has(hotel.id)).toBe(false);
      ids.add(hotel.id);

      expect(hotel.image).toMatch(/^\/hotels\//);
      expect(hotel.image).not.toBe(hotel.hoverImage);
      if (hotel.hoverImage) expect(hotel.hoverImage).toMatch(/^\/hotels\//);
      expect(hotel.latitude).toBeGreaterThan(-90);
      expect(hotel.latitude).toBeLessThan(90);
      expect(hotel.longitude).toBeGreaterThan(-180);
      expect(hotel.longitude).toBeLessThan(180);

      for (const locale of LOCALES) {
        expect(hotel.description[locale].trim().length).toBeGreaterThan(0);
      }

      if (hotel.website) expect(hotel.website).toMatch(/^https:\/\//);
      if (hotel.bookingUrl) expect(hotel.bookingUrl).toMatch(/^https:\/\//);
      if (hotel.mapUrl) expect(hotel.mapUrl).toMatch(/^https:\/\//);
    }
  });

  it("no longer references the previous venue region", () => {
    for (const hotel of RECOMMENDED_HOTELS) {
      expect(JSON.stringify(hotel)).not.toMatch(/Kirchheim/);
      expect(JSON.stringify(hotel)).not.toMatch(/Esslingen/);
    }
  });

  it("keeps distances consistent with the venue coordinates", () => {
    expect(reception).toBeDefined();

    for (const hotel of RECOMMENDED_HOTELS) {
      expect(hotel.distanceToCelebration).toBeDefined();
      expect(hotel.distanceToCeremony).toBeDefined();
      if (reception) {
        const distance = haversineKm(
          hotel.latitude,
          hotel.longitude,
          reception.latitude,
          reception.longitude,
        );
        expect(distance).toBeLessThan(80);
      }
    }
  });
});

describe("hotel content locale resolution", () => {
  it("falls back to German for unsupported locales", () => {
    expect(resolveHotelContentLocale("fr")).toBe("de");
    expect(resolveHotelContentLocale("ja-JP")).toBe("de");
  });

  it("keeps supported locales", () => {
    expect(resolveHotelContentLocale("ak")).toBe("ak");
    expect(resolveHotelContentLocale("de")).toBe("de");
    expect(resolveHotelContentLocale("en-US")).toBe("en");
    expect(resolveHotelContentLocale("it")).toBe("it");
  });
});

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRad = (degree: number) => (degree * Math.PI) / 180;
  const earthRadiusKm = 6371;
  const [la1, lo1, la2, lo2] = [lat1, lon1, lat2, lon2].map(toRad);
  const dLat = la2 - la1;
  const dLon = lo2 - lo1;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(la1) * Math.cos(la2) * Math.sin(dLon / 2) ** 2;
  return 2 * earthRadiusKm * Math.asin(Math.sqrt(a));
}
