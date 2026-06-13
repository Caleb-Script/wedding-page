export type HotelContentLocale = "ak" | "de" | "en" | "it";

export type RecommendedHotelTag =
  | "airport"
  | "betweenLocations"
  | "budget"
  | "central"
  | "familyFriendly"
  | "nearCeremony"
  | "parking"
  | "premium"
  | "publicTransport"
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
  },
  {
    address: "Ruppmannstraße 20, 70565 Stuttgart",
    bookingUrl: "https://all.accor.com/hotel/A6Q4/index.de.shtml",
    description: {
      ak: "Ahɔhodan a ɛsom bo na ɛfata abusua, ɛbɛn aware dwuma no ne Stuttgart-Vaihingen keteke gyinabea.",
      de: "Ein preiswertes, familienfreundliches Designhotel nahe der Trauung und nur wenige Gehminuten vom Bahnhof Stuttgart-Vaihingen.",
      en: "An affordable, family-friendly design hotel close to the ceremony and a short walk from Stuttgart-Vaihingen station.",
      it: "Un design hotel conveniente e adatto alle famiglie, vicino alla cerimonia e a pochi passi dalla stazione di Stuttgart-Vaihingen.",
    },
    distanceToCelebration: "32.5 km",
    distanceToCeremony: "2 km",
    id: "ibis-styles-stuttgart-vaihingen",
    image: "/hotels/ibis-styles-stuttgart-vaihingen.jpg",
    latitude: 48.7274996,
    longitude: 9.1168959,
    mapUrl:
      "https://www.openstreetmap.org/search?query=Ruppmannstra%C3%9Fe%2020%2C%2070565%20Stuttgart",
    name: "ibis Styles Stuttgart Vaihingen",
    tags: ["nearCeremony", "publicTransport", "familyFriendly"],
    travelTime: "4–27 min",
    website: "https://all.accor.com/hotel/A6Q4/index.de.shtml",
  },
  {
    address: "Siemensstraße 28, 70469 Stuttgart",
    bookingUrl: "https://all.accor.com/hotel/5441/index.de.shtml",
    description: {
      ak: "Ahɔhodan a ne bo nyɛ den wɔ Feuerbach, U-Bahn gyinabea wɔ anim na kar gyinabea wɔ hɔ.",
      de: "Eine besonders günstige Option in Feuerbach mit U-Bahn direkt vor der Tür und eigener Tiefgarage.",
      en: "A particularly affordable option in Feuerbach with the underground directly outside and its own parking garage.",
      it: "Un'opzione particolarmente conveniente a Feuerbach, con la metropolitana davanti all'hotel e un garage interno.",
    },
    distanceToCelebration: "39.6 km",
    distanceToCeremony: "15.4 km",
    id: "ibis-budget-stuttgart-city-nord",
    image: "/hotels/ibis-budget-stuttgart-city-nord.jpg",
    latitude: 48.8111759,
    longitude: 9.1778618,
    mapUrl:
      "https://www.openstreetmap.org/search?query=Siemensstra%C3%9Fe%2028%2C%2070469%20Stuttgart",
    name: "ibis budget Stuttgart City Nord",
    tags: ["budget", "publicTransport", "parking"],
    travelTime: "25–39 min",
    website: "https://all.accor.com/hotel/5441/index.de.shtml",
  },
  {
    address: "Zettachring 3, 70567 Stuttgart",
    bookingUrl: "https://www.hotel-bb.com/de/hotel/stuttgart-airport-messe",
    description: {
      ak: "Ahɔhodan a ne bo yɛ papa a ɛbɛn Stuttgart wiem hyɛn gyinabea ne aguadi beae, na abusua adan nso wɔ hɔ.",
      de: "Ein verlässliches Budget-Hotel nahe Flughafen und Messe mit praktischen Familienzimmern und unkompliziertem Check-in.",
      en: "A reliable budget hotel near the airport and trade fair with practical family rooms and straightforward check-in.",
      it: "Un affidabile hotel economico vicino all'aeroporto e alla fiera, con pratiche camere familiari e check-in semplice.",
    },
    distanceToCelebration: "28.5 km",
    distanceToCeremony: "7.2 km",
    id: "bb-hotel-stuttgart-airport-messe",
    image: "/hotels/bb-hotel-stuttgart-airport-messe.jpg",
    latitude: 48.7098628,
    longitude: 9.1702466,
    mapUrl:
      "https://www.openstreetmap.org/search?query=Zettachring%203%2C%2070567%20Stuttgart",
    name: "B&B HOTEL Stuttgart-Airport/Messe",
    tags: ["budget", "airport", "familyFriendly"],
    travelTime: "10–21 min",
    website: "https://www.hotel-bb.com/de/hotel/stuttgart-airport-messe",
  },
  {
    address: "Neckarstraße 60, 73728 Esslingen am Neckar",
    bookingUrl: "https://www.hotel-am-schillerpark.de/buchen",
    description: {
      ak: "Abusua ahɔhodan a ɛwɔ Esslingen mfinimfini, ɛda aware dwuma ne anigyede no ntam na ɛwɔ bo pa.",
      de: "Ein familiengeführtes Hotel in Esslingen mit fairen Direktpreisen, Familienzimmern und ausgewogener Lage zwischen beiden Locations.",
      en: "A family-run hotel in Esslingen with fair direct rates, family rooms and a balanced location between both venues.",
      it: "Un hotel a conduzione familiare a Esslingen, con tariffe dirette convenienti, camere familiari e una posizione equilibrata tra le due location.",
    },
    distanceToCelebration: "25.4 km",
    distanceToCeremony: "22.5 km",
    id: "hotel-am-schillerpark-esslingen",
    image: "/hotels/hotel-am-schillerpark-esslingen.jpg",
    latitude: 48.7365444,
    longitude: 9.313771,
    mapUrl:
      "https://www.openstreetmap.org/search?query=Neckarstra%C3%9Fe%2060%2C%2073728%20Esslingen%20am%20Neckar",
    name: "Hotel am Schillerpark",
    tags: ["betweenLocations", "familyFriendly", "central"],
    travelTime: "24 min",
    website: "https://www.hotel-am-schillerpark.de/",
  },
  {
    address: "Bonländer Hauptstraße 145, 70794 Filderstadt",
    bookingUrl: "https://www.nh-hotels.com/en/hotel/nh-stuttgart-airport",
    description: {
      ak: "Ahɔhodan a ɛwɔ Filderstadt a ɛfata abusua ne wɔn a wɔfa wiem hyɛn, kar gyinabea ne airport shuttle wɔ hɔ.",
      de: "Eine komfortable Filderstadt-Option für Familien und Flugreisende mit Parkplatz und Shuttle zum Stuttgart Airport.",
      en: "A comfortable Filderstadt option for families and air travellers, with parking and a shuttle to Stuttgart Airport.",
      it: "Una confortevole opzione a Filderstadt per famiglie e viaggiatori aerei, con parcheggio e navetta per l'aeroporto di Stoccarda.",
    },
    distanceToCelebration: "25 km",
    distanceToCeremony: "13.9 km",
    id: "nh-stuttgart-airport",
    image: "/hotels/nh-stuttgart-airport.jpg",
    latitude: 48.6615008,
    longitude: 9.2237509,
    mapUrl:
      "https://www.openstreetmap.org/search?query=Bonl%C3%A4nder%20Hauptstra%C3%9Fe%20145%2C%2070794%20Filderstadt",
    name: "NH Stuttgart Airport",
    tags: ["airport", "parking", "shuttlePossible", "premium"],
    travelTime: "15–25 min",
    website: "https://www.nh-hotels.com/en/hotel/nh-stuttgart-airport",
  },
] as const;
