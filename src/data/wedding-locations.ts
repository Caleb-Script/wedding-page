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
    latitude: 48.64294,
    longitude: 9.47028,
    mapUrl:
      "https://www.openstreetmap.org/search?query=Marie-Curie-Stra%C3%9Fe%203%2C%2073230%20Kirchheim%20unter%20Teck",
  },
] as const;
