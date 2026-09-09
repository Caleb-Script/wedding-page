import { describe, expect, it } from "vitest";
import { WEDDING_LOCATIONS } from "./wedding-locations";

describe("wedding locations", () => {
  it("keeps the ceremony at the church in Stuttgart", () => {
    const ceremony = WEDDING_LOCATIONS.find(
      (location) => location.id === "ceremony",
    );
    expect(ceremony).toBeDefined();
    expect(ceremony?.latitude).toBeCloseTo(48.71658, 4);
    expect(ceremony?.longitude).toBeCloseTo(9.1137, 4);
    expect(ceremony?.mapUrl).toContain("70565");
  });

  it("places the reception at the new venue in Steinheim an der Murr", () => {
    const reception = WEDDING_LOCATIONS.find(
      (location) => location.id === "reception",
    );
    expect(reception).toBeDefined();
    expect(reception?.latitude).toBeCloseTo(48.9664733, 4);
    expect(reception?.longitude).toBeCloseTo(9.2725965, 4);
    expect(reception?.mapUrl).toContain("71711");
    expect(reception?.mapUrl).toContain("Steinheim%20an%20der%20Murr");
  });

  it("does not reference the previous venue region", () => {
    const serialized = JSON.stringify(WEDDING_LOCATIONS);
    expect(serialized).not.toMatch(/Kirchheim/);
    expect(serialized).not.toMatch(/Marie-Curie|White%20Event/);
  });
});
