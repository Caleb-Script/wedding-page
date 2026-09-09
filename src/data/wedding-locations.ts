export type WeddingLocationId = "ceremony" | "reception";

export interface WeddingLocationCoordinates {
  id: WeddingLocationId;
  latitude: number;
  longitude: number;
  mapUrl: string;
}

export const WEDDING_LOCATIONS: readonly WeddingLocationCoordinates[] = [
  {
    id: "ceremony",
    latitude: 48.71658,
    longitude: 9.1137,
    mapUrl:
      "https://www.openstreetmap.org/search?query=D%C3%BCrllewangstra%C3%9Fe%2036%2C%2070565%20Stuttgart",
  },
  {
    id: "reception",
    latitude: 48.9664733,
    longitude: 9.2725965,
    mapUrl:
      "https://www.openstreetmap.org/search?query=Bahnhofstra%C3%9Fe%2013%2C%2071711%20Steinheim%20an%20der%20Murr",
  },
] as const;
