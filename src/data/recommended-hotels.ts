export type HotelContentLocale = "ak" | "de" | "en" | "it";

export type RecommendedHotelTag =
  | "airport"
  | "betweenVenues"
  | "budget"
  | "central"
  | "familyFriendly"
  | "nearCelebration"
  | "nearChurch"
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
  hoverImage?: string;
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
    address: "Plieninger Straße 101-107, 70567 Stuttgart",
    bookingUrl: "https://www.maseven.de/serviced-apartments-stuttgart/",
    description: {
      ak: "Serviced suites a ɛbɛn SI-Centrum, ɛwɔ adan akɛse, abusua kwan ne U-Bahn a ɛbɛn.",
      de: "Geräumige Serviced Suites direkt beim SI-Centrum, praktisch für Familien, Musicalgäste und die Nähe zur Kirche.",
      en: "Spacious serviced suites by SI-Centrum, practical for families, musical guests and staying close to the church.",
      it: "Suite servite spaziose presso il SI-Centrum, pratiche per famiglie, ospiti dei musical e la vicinanza alla chiesa.",
    },
    distanceToCelebration: "28.2 km",
    distanceToCeremony: "3.6 km",
    id: "maseven-stuttgart-si-centrum",
    image: "/hotels/building/maseven-stuttgart-si-centrum.jpg",
    hoverImage: "/hotels/room/maseven-stuttgart-si-centrum.jpg",
    latitude: 48.7237379,
    longitude: 9.1616535,
    mapUrl:
      "https://www.openstreetmap.org/search?query=Plieninger%20Stra%C3%9Fe%20101-107%2C%2070567%20Stuttgart",
    name: "MASEVEN Stuttgart SI-Centrum",
    tags: ["nearChurch", "familyFriendly", "publicTransport"],
    travelTime: "5–30 min",
    website: "https://www.maseven.de/serviced-apartments-stuttgart/",
  },
  {
    address: "Kupferstraße 3, 70565 Stuttgart",
    bookingUrl:
      "https://www.ihg.com/holiday-inn-the-niu/hotels/de/de/stuttgart/strks/hoteldetail",
    description: {
      ak: "Design ahɔhodan a ɛbɛn Stuttgart-Vaihingen station ne asɔre no, na parking wɔ hɔ.",
      de: "Ein modernes Designhotel in Vaihingen, sehr nah an Kirche, Bahnhof und Stadtbahn, mit Tiefgarage.",
      en: "A modern design hotel in Vaihingen, very close to the church, station and light rail, with garage parking.",
      it: "Un moderno design hotel a Vaihingen, molto vicino alla chiesa, alla stazione e alla Stadtbahn, con garage.",
    },
    distanceToCelebration: "28.8 km",
    distanceToCeremony: "1.3 km",
    id: "holiday-inn-the-niu-kettle-stuttgart-vaihingen",
    image: "/hotels/building/holiday-inn-the-niu-kettle-stuttgart-vaihingen.jpg",
    hoverImage: "/hotels/room/holiday-inn-the-niu-kettle-stuttgart-vaihingen.webp",
    latitude: 48.7279024,
    longitude: 9.1187851,
    mapUrl:
      "https://www.openstreetmap.org/search?query=Kupferstra%C3%9Fe%203%2C%2070565%20Stuttgart",
    name: "Holiday Inn - the niu, Kettle Stuttgart Vaihingen",
    tags: ["nearChurch", "publicTransport", "parking"],
    travelTime: "3–30 min",
    website:
      "https://www.ihg.com/holiday-inn-the-niu/hotels/de/de/stuttgart/strks/hoteldetail",
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
    distanceToCelebration: "28.9 km",
    distanceToCeremony: "1.2 km",
    id: "ibis-styles-stuttgart-vaihingen",
    image: "/hotels/building/ibis-styles-stuttgart-vaihingen.jpg",
    hoverImage: "/hotels/room/ibis-styles-stuttgart-vaihingen.jpg",
    latitude: 48.7274996,
    longitude: 9.1168959,
    mapUrl:
      "https://www.openstreetmap.org/search?query=Ruppmannstra%C3%9Fe%2020%2C%2070565%20Stuttgart",
    name: "ibis Styles Stuttgart Vaihingen",
    tags: ["nearChurch", "publicTransport", "familyFriendly"],
    travelTime: "3–30 min",
    website: "https://all.accor.com/hotel/A6Q4/index.de.shtml",
  },
  {
    address: "Vollmoellerstraße 5, 70563 Stuttgart",
    bookingUrl: "https://all.accor.com/hotel/5425/index.de.shtml",
    description: {
      ak: "Premium ahɔhodan a ɛwɔ Vaihingen station nkyɛn, ɛbɛn asɔre no na ɛwɔ ahotɔ pii.",
      de: "Eine komfortable Premium-Option direkt am Bahnhof Vaihingen, sehr nah an der Kirche und mit Spa-Bereich.",
      en: "A comfortable premium option beside Vaihingen station, very close to the church and with spa facilities.",
      it: "Un'opzione premium confortevole accanto alla stazione di Vaihingen, molto vicina alla chiesa e con area spa.",
    },
    distanceToCelebration: "29.2 km",
    distanceToCeremony: "1.1 km",
    id: "pullman-stuttgart-fontana",
    image: "/hotels/building/pullman-stuttgart-fontana.jpg",
    hoverImage: "/hotels/room/pullman-stuttgart-fontana.jpg",
    latitude: 48.7263615,
    longitude: 9.1113411,
    mapUrl:
      "https://www.openstreetmap.org/search?query=Vollmoellerstra%C3%9Fe%205%2C%2070563%20Stuttgart",
    name: "Pullman Stuttgart Fontana",
    tags: ["nearChurch", "premium", "publicTransport"],
    travelTime: "3–31 min",
    website: "https://all.accor.com/hotel/5425/index.de.shtml",
  },
  {
    address: "Vor dem Lauch 16, 70567 Stuttgart",
    bookingUrl:
      "https://www.ihg.com/holiday-inn-the-niu/hotels/de/de/stuttgart/strms/hoteldetail",
    description: {
      ak: "Ahɔhodan a ne bo yɛ papa wɔ Fasanenhof, ɛbɛn airport ne Messe, na U-Bahn ne parking wɔ hɔ.",
      de: "Eine praktische Budget-Option in Fasanenhof nahe Flughafen und Messe, mit U-Bahn vor der Tür und Parkplätzen.",
      en: "A practical budget option in Fasanenhof near the airport and trade fair, with light rail nearby and parking.",
      it: "Un'opzione pratica e conveniente a Fasanenhof, vicino ad aeroporto e fiera, con Stadtbahn e parcheggio.",
    },
    distanceToCelebration: "29.7 km",
    distanceToCeremony: "4 km",
    id: "holiday-inn-the-niu-mesh-stuttgart-messe",
    image: "/hotels/building/holiday-inn-the-niu-mesh-stuttgart-messe.jpg",
    hoverImage: "/hotels/room/holiday-inn-the-niu-mesh-stuttgart-messe.webp",
    latitude: 48.7084989,
    longitude: 9.1671504,
    mapUrl:
      "https://www.openstreetmap.org/search?query=Vor%20dem%20Lauch%2016%2C%2070567%20Stuttgart",
    name: "Holiday Inn - the niu, Mesh Stuttgart Messe",
    tags: ["budget", "airport", "parking"],
    travelTime: "5–32 min",
    website:
      "https://www.ihg.com/holiday-inn-the-niu/hotels/de/de/stuttgart/strms/hoteldetail",
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
    distanceToCelebration: "18.6 km",
    distanceToCeremony: "11.5 km",
    id: "ibis-budget-stuttgart-city-nord",
    image: "/hotels/building/ibis-budget-stuttgart-city-nord.jpg",
    hoverImage: "/hotels/room/ibis-budget-stuttgart-city-nord.webp",
    latitude: 48.8111759,
    longitude: 9.1778618,
    mapUrl:
      "https://www.openstreetmap.org/search?query=Siemensstra%C3%9Fe%2028%2C%2070469%20Stuttgart",
    name: "ibis budget Stuttgart City Nord",
    tags: ["budget", "publicTransport", "parking"],
    travelTime: "15–22 min",
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
    distanceToCelebration: "29.5 km",
    distanceToCeremony: "4.2 km",
    id: "bb-hotel-stuttgart-airport-messe",
    image: "/hotels/building/bb-hotel-stuttgart-airport-messe.webp",
    hoverImage: "/hotels/room/bb-hotel-stuttgart-airport-messe.jpg",
    latitude: 48.7098628,
    longitude: 9.1702466,
    mapUrl:
      "https://www.openstreetmap.org/search?query=Zettachring%203%2C%2070567%20Stuttgart",
    name: "B&B HOTEL Stuttgart-Airport/Messe",
    tags: ["budget", "airport", "familyFriendly"],
    travelTime: "5–31 min",
    website: "https://www.hotel-bb.com/de/hotel/stuttgart-airport-messe",
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
    distanceToCelebration: "34.1 km",
    distanceToCeremony: "10.1 km",
    id: "nh-stuttgart-airport",
    image: "/hotels/building/nh-stuttgart-airport.jpg",
    hoverImage: "/hotels/room/nh-stuttgart-airport.jpg",
    latitude: 48.6615008,
    longitude: 9.2237509,
    mapUrl:
      "https://www.openstreetmap.org/search?query=Bonl%C3%A4nder%20Hauptstra%C3%9Fe%20145%2C%2070794%20Filderstadt",
    name: "NH Stuttgart Airport",
    tags: ["airport", "parking", "shuttlePossible", "premium"],
    travelTime: "12–36 min",
    website: "https://www.nh-hotels.com/en/hotel/nh-stuttgart-airport",
  },
] as const;
