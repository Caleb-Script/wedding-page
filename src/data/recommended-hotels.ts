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
    address: "Max-Eyth-Straße 24, 73230 Kirchheim unter Teck",
    bookingUrl: "https://stadthotel-waldhorn.de/",
    description: {
      ak: "Ahɔhodan ne apartments wɔ Kirchheim abakɔsɛm kuropɔn mfinimfini, ɛbɛn anigyede beae no paa.",
      de: "Ein zentraler Kirchheimer Stadtaufenthalt mit Hotelzimmern und Apartments, nur wenige Minuten von der Feier entfernt.",
      en: "A central Kirchheim stay with hotel rooms and apartments, only a few minutes from the celebration.",
      it: "Un soggiorno centrale a Kirchheim con camere d'hotel e appartamenti, a pochi minuti dal ricevimento.",
    },
    distanceToCelebration: "2.1 km",
    distanceToCeremony: "32.3 km",
    featured: true,
    id: "stadthotel-waldhorn",
    image: "/hotels/stadthotel-waldhorn.jpg",
    latitude: 48.6485666,
    longitude: 9.4508559,
    mapUrl:
      "https://www.openstreetmap.org/search?query=Max-Eyth-Stra%C3%9Fe%2024%2C%2073230%20Kirchheim%20unter%20Teck",
    name: "Stadthotel Waldhorn",
    tags: ["recommended", "nearCelebration", "central"],
    travelTime: "5–28 min",
    website: "https://stadthotel-waldhorn.de/",
  },
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
    tags: ["recommended", "nearCelebration", "premium"],
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
    tags: ["nearCelebration", "familyFriendly", "shuttlePossible"],
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
    tags: ["recommended", "nearCelebration", "central"],
    travelTime: "5 min",
    website: "https://www.hotel.de/de/hotel/400738",
  },
  {
    address: "Plieninger Straße 101-107, 70567 Stuttgart",
    bookingUrl: "https://www.maseven.de/serviced-apartments-stuttgart/",
    description: {
      ak: "Serviced suites a ɛbɛn SI-Centrum, ɛwɔ adan akɛse, abusua kwan ne U-Bahn a ɛbɛn.",
      de: "Geräumige Serviced Suites direkt beim SI-Centrum, praktisch für Familien, Musicalgäste und die Nähe zur Kirche.",
      en: "Spacious serviced suites by SI-Centrum, practical for families, musical guests and staying close to the church.",
      it: "Suite servite spaziose presso il SI-Centrum, pratiche per famiglie, ospiti dei musical e la vicinanza alla chiesa.",
    },
    distanceToCelebration: "30.2 km",
    distanceToCeremony: "5.2 km",
    id: "maseven-stuttgart-si-centrum",
    image: "/hotels/maseven-stuttgart-si-centrum.jpg",
    latitude: 48.7237379,
    longitude: 9.1616535,
    mapUrl:
      "https://www.openstreetmap.org/search?query=Plieninger%20Stra%C3%9Fe%20101-107%2C%2070567%20Stuttgart",
    name: "MASEVEN Stuttgart SI-Centrum",
    tags: ["nearChurch", "familyFriendly", "publicTransport"],
    travelTime: "9–23 min",
    website: "https://www.maseven.de/serviced-apartments-stuttgart/",
  },
  {
    address: "Filderbahnstraße 43B, 70567 Stuttgart",
    description: {
      ak: "Ahɔhodan ketewa a ɛwɔ Möhringen mfinimfini, ɛbɛn asɔre no na U-Bahn wɔ baabi a ɛyɛ mmerɛw.",
      de: "Eine kleine, praktische Unterkunft in Möhringen mit kurzer Fahrt zur Kirche und guter Stadtbahn-Anbindung.",
      en: "A small practical stay in Möhringen with a short ride to the church and useful light-rail access.",
      it: "Una piccola sistemazione pratica a Möhringen, con breve tragitto verso la chiesa e comodo accesso alla Stadtbahn.",
    },
    distanceToCelebration: "32 km",
    distanceToCeremony: "3.6 km",
    id: "hotel-flora-moehringen",
    image: "/hotels/hotel-flora-moehringen.jpg",
    latitude: 48.7285397,
    longitude: 9.1457887,
    mapUrl:
      "https://www.openstreetmap.org/search?query=Filderbahnstra%C3%9Fe%2043B%2C%2070567%20Stuttgart",
    name: "Hotel Flora Möhringen",
    tags: ["nearChurch", "budget", "publicTransport"],
    travelTime: "7–24 min",
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
    distanceToCelebration: "32.3 km",
    distanceToCeremony: "1.9 km",
    id: "holiday-inn-the-niu-kettle-stuttgart-vaihingen",
    image: "/hotels/holiday-inn-the-niu-kettle-stuttgart-vaihingen.jpg",
    latitude: 48.7279024,
    longitude: 9.1187851,
    mapUrl:
      "https://www.openstreetmap.org/search?query=Kupferstra%C3%9Fe%203%2C%2070565%20Stuttgart",
    name: "Holiday Inn - the niu, Kettle Stuttgart Vaihingen",
    tags: ["nearChurch", "publicTransport", "parking"],
    travelTime: "4–26 min",
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
    distanceToCelebration: "32.5 km",
    distanceToCeremony: "2 km",
    id: "ibis-styles-stuttgart-vaihingen",
    image: "/hotels/ibis-styles-stuttgart-vaihingen.jpg",
    latitude: 48.7274996,
    longitude: 9.1168959,
    mapUrl:
      "https://www.openstreetmap.org/search?query=Ruppmannstra%C3%9Fe%2020%2C%2070565%20Stuttgart",
    name: "ibis Styles Stuttgart Vaihingen",
    tags: ["nearChurch", "publicTransport", "familyFriendly"],
    travelTime: "4–27 min",
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
    distanceToCelebration: "33.2 km",
    distanceToCeremony: "2.2 km",
    id: "pullman-stuttgart-fontana",
    image: "/hotels/pullman-stuttgart-fontana.jpg",
    latitude: 48.7263615,
    longitude: 9.1113411,
    mapUrl:
      "https://www.openstreetmap.org/search?query=Vollmoellerstra%C3%9Fe%205%2C%2070563%20Stuttgart",
    name: "Pullman Stuttgart Fontana",
    tags: ["nearChurch", "premium", "publicTransport"],
    travelTime: "5–28 min",
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
    distanceToCelebration: "29.2 km",
    distanceToCeremony: "7.9 km",
    id: "holiday-inn-the-niu-mesh-stuttgart-messe",
    image: "/hotels/holiday-inn-the-niu-mesh-stuttgart-messe.jpg",
    latitude: 48.7084989,
    longitude: 9.1671504,
    mapUrl:
      "https://www.openstreetmap.org/search?query=Vor%20dem%20Lauch%2016%2C%2070567%20Stuttgart",
    name: "Holiday Inn - the niu, Mesh Stuttgart Messe",
    tags: ["budget", "airport", "parking"],
    travelTime: "11–22 min",
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
    address: "Otto-Bayer-Straße 8, 73730 Esslingen am Neckar",
    bookingUrl:
      "https://www.ihg.com/holiday-inn-the-niu/hotels/de/de/esslingen-am-neckar/zeben/hoteldetail",
    description: {
      ak: "Design ahɔhodan a ɛbɛn Esslingen kuropɔn dedaw no, ɛda aware dwuma ne anigyede no ntam.",
      de: "Ein modernes Esslinger Designhotel nahe der Altstadt, sinnvoll gelegen zwischen Kirche und Feier.",
      en: "A modern Esslingen design hotel near the old town, usefully positioned between church and celebration.",
      it: "Un moderno design hotel a Esslingen vicino al centro storico, ben posizionato tra chiesa e ricevimento.",
    },
    distanceToCelebration: "25.5 km",
    distanceToCeremony: "22.5 km",
    id: "holiday-inn-the-niu-timber-esslingen",
    image: "/hotels/holiday-inn-the-niu-timber-esslingen.jpg",
    latitude: 48.7334669,
    longitude: 9.3224383,
    mapUrl:
      "https://www.openstreetmap.org/search?query=Otto-Bayer-Stra%C3%9Fe%208%2C%2073730%20Esslingen%20am%20Neckar",
    name: "Holiday Inn - the niu, Timber Esslingen",
    tags: ["betweenVenues", "parking", "publicTransport"],
    travelTime: "24–25 min",
    website:
      "https://www.ihg.com/holiday-inn-the-niu/hotels/de/de/esslingen-am-neckar/zeben/hoteldetail",
  },
  {
    address: "Plochinger Straße 1, 73730 Esslingen am Neckar",
    description: {
      ak: "Esslingen kuropɔn mfinimfini ahɔhodan a ɛyɛ mmerɛw, ɛda mmeae abien no ntam na keteke kwan bɛn.",
      de: "Eine einfache, zentrale Esslinger Option zwischen beiden Locations, mit guter Anbindung an Bahnhof und Altstadt.",
      en: "A simple central Esslingen option between both venues, with useful access to the station and old town.",
      it: "Un'opzione semplice e centrale a Esslingen tra le due location, comoda per stazione e centro storico.",
    },
    distanceToCelebration: "25.7 km",
    distanceToCeremony: "22.8 km",
    id: "hotel-am-charlottenplatz-esslingen",
    image: "/hotels/hotel-am-charlottenplatz-esslingen.jpg",
    latitude: 48.7371391,
    longitude: 9.316229,
    mapUrl:
      "https://www.openstreetmap.org/search?query=Plochinger%20Stra%C3%9Fe%201%2C%2073730%20Esslingen%20am%20Neckar",
    name: "Hotel Am Charlottenplatz",
    tags: ["betweenVenues", "budget", "central"],
    travelTime: "25 min",
  },
  {
    address: "Grabbrunnenstraße 19, 73728 Esslingen am Neckar",
    bookingUrl:
      "https://www.leonardo-hotels.de/esslingen-am-neckar/leonardo-hotel-esslingen",
    description: {
      ak: "Ahɔhodan foforo a ɛwɔ Esslingen mfinimfini, ɛfata wɔn a wɔpɛ ahotɔ ne parking a ɛbɛn.",
      de: "Ein modernes, zentral gelegenes Hotel in Esslingen für Gäste, die mehr Komfort und Parkmöglichkeiten suchen.",
      en: "A modern centrally located Esslingen hotel for guests who want more comfort and parking options.",
      it: "Un hotel moderno e centrale a Esslingen per ospiti che desiderano più comfort e opzioni di parcheggio.",
    },
    distanceToCelebration: "26.1 km",
    distanceToCeremony: "23.1 km",
    id: "leonardo-hotel-esslingen",
    image: "/hotels/leonardo-hotel-esslingen.jpg",
    latitude: 48.7416812,
    longitude: 9.3138492,
    mapUrl:
      "https://www.openstreetmap.org/search?query=Grabbrunnenstra%C3%9Fe%2019%2C%2073728%20Esslingen%20am%20Neckar",
    name: "Leonardo Hotel Esslingen",
    tags: ["betweenVenues", "premium", "central"],
    travelTime: "25–26 min",
    website:
      "https://www.leonardo-hotels.de/esslingen-am-neckar/leonardo-hotel-esslingen",
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
    tags: ["betweenVenues", "familyFriendly", "central"],
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
