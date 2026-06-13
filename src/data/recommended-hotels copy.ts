export type HotelContentLocale = "ak" | "de" | "en" | "it";

export type RecommendedHotelTag =
  | "budget"
  | "central"
  | "familyFriendly"
  | "premium"
  | "recommended"
  | "shuttlePossible";

export interface RecommendedHotel {
  address: string;
  bookingUrl?: string;
  description: Record<HotelContentLocale, string>;
  distanceToCelebration?: string;
  distanceToCeremony?: string;
  featured?: boolean;
  id: string;
  image: string;
  latitude: number;
  longitude: number;
  mapUrl?: string;
  name: string;
  tags?: RecommendedHotelTag[];
  travelTime?: string;
  website?: string;
}

export function resolveHotelContentLocale(locale: string): HotelContentLocale {
  const language = locale.split("-")[0];

  return language === "ak" ||
    language === "de" ||
    language === "en" ||
    language === "it"
    ? language
    : "de";
}

export const RECOMMENDED_HOTELS: readonly RecommendedHotel[] = [
  {
    address: "Schlierbacher Straße 28, 73230 Kirchheim unter Teck",
    bookingUrl: "https://www.hotel-fuchsen.de/",
    description: {
      ak: "Ahɔhodan fɛfɛ a ɛwɔ Kirchheim mfinimfini, a adidibea ne ahotɔ wɔ hɔ.",
      de: "Eine stilvolle, zentrale Unterkunft in Kirchheim mit Restaurant und elegantem Ambiente.",
      en: "A stylish central stay in Kirchheim with a restaurant and an elegant atmosphere.",
      it: "Un soggiorno elegante e centrale a Kirchheim, con ristorante e un'atmosfera raffinata.",
    },
    distanceToCelebration: "3 km",
    distanceToCeremony: "30 km",
    featured: true,
    id: "hotel-fuchsen",
    image: "/hotels/hotel-fuchsen.jpg",
    latitude: 48.64872,
    longitude: 9.45912,
    mapUrl:
      "https://www.openstreetmap.org/search?query=Schlierbacher%20Stra%C3%9Fe%2028%2C%2073230%20Kirchheim%20unter%20Teck",
    name: "Hotel Fuchsen",
    tags: ["recommended", "premium", "central"],
    travelTime: "7 min",
    website: "https://www.hotel-fuchsen.de/",
  },
  {
    address: "Eichendorffstraße 99, 73230 Kirchheim unter Teck",
    bookingUrl: "https://www.ateckhotel.de/zimmer/",
    description: {
      ak: "Ahɔhodan foforo ne ahotɔ a ɛwɔ baabi a ɛyɛ komm na ɛbɛn anigyede beae no.",
      de: "Ein komfortables, modernes Hotel mit hellen Zimmern und ruhiger Atmosphäre nahe der Feier.",
      en: "A comfortable modern hotel with bright rooms and a calm setting near the celebration.",
      it: "Un hotel moderno e confortevole, con camere luminose e un ambiente tranquillo vicino al ricevimento.",
    },
    distanceToCelebration: "4 km",
    distanceToCeremony: "31 km",
    id: "ateckhotel",
    image: "/hotels/ateckhotel.jpg",
    latitude: 48.64026,
    longitude: 9.44265,
    mapUrl:
      "https://www.openstreetmap.org/search?query=Eichendorffstra%C3%9Fe%2099%2C%2073230%20Kirchheim%20unter%20Teck",
    name: "Ateckhotel",
    tags: ["familyFriendly", "budget", "shuttlePossible"],
    travelTime: "8 min",
    website: "https://www.ateckhotel.de/",
  },
  {
    address: "Paradiesstraße 54, 73230 Kirchheim unter Teck",
    bookingUrl: "https://www.hotel.de/de/hotel/400738",
    description: {
      ak: "Ahɔhodan a ɛma akwaaba a ɛbɛn Kirchheim kuropɔn mfinimfini, a park ne adidibea wɔ hɔ.",
      de: "Ein gastfreundliches Hotel nahe der Kirchheimer Innenstadt mit Parkplätzen und Restaurant.",
      en: "A welcoming hotel close to central Kirchheim, with parking and a restaurant.",
      it: "Un hotel accogliente vicino al centro di Kirchheim, con parcheggio e ristorante.",
    },
    distanceToCelebration: "2 km",
    distanceToCeremony: "30 km",
    id: "wuerttembergischer-hof",
    image: "/hotels/wuerttembergischer-hof.jpg",
    latitude: 48.65003,
    longitude: 9.44912,
    mapUrl:
      "https://www.openstreetmap.org/search?query=Paradiesstra%C3%9Fe%2054%2C%2073230%20Kirchheim%20unter%20Teck",
    name: "Württembergischer Hof",
    tags: ["recommended", "central"],
    travelTime: "5 min",
    website: "https://www.hotel.de/de/hotel/400738",
  }
] as const;
