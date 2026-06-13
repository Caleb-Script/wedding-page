# Curated Hotel Recommendation Research

Research date: June 13, 2026

## Location Analysis

The wedding day spans two cities:

- Ceremony: Katholisches Pfarramt Heilige Familie, Stuttgart
- Celebration: White Event Palast, Kirchheim unter Teck

The original recommendations are concentrated around the celebration in
Kirchheim. The extended shortlist deliberately adds options for five different
guest situations:

1. Staying very close to the ceremony and Stuttgart-Vaihingen station.
2. Staying affordably in Stuttgart-Feuerbach with direct public transport.
3. Staying near Stuttgart Airport and Messe at a budget-focused chain.
4. Staying between both wedding locations in Esslingen.
5. Staying in Filderstadt with parking and an airport shuttle.

Hotel coordinates were verified once using OpenStreetMap Nominatim. Estimated
driving distances and times were verified once using the public OSRM routing
service. Neither service is called by the website at runtime.

## Recommended Shortlist

### ibis Styles Stuttgart Vaihingen

- Profile: affordable mid-range, families, public transport, close to ceremony
- Ceremony: approximately 2 km / 4 minutes by car
- Celebration: approximately 32.5 km / 27 minutes by car
- Why selected: closest recommendation to the ceremony; Stuttgart-Vaihingen
  station is approximately 500 m away; official hotel information highlights
  strong public transport, parking options and family rooms.
- Official guest rating at research time: 4.5/5 from 670 verified ALL reviews.
- Official source:
  https://all.accor.com/hotel/A6Q4/index.de.shtml

### ibis budget Stuttgart City Nord

- Profile: budget, Stuttgart-Feuerbach, public transport, parking
- Ceremony: approximately 15.4 km / 25 minutes by car
- Celebration: approximately 39.6 km / 39 minutes by car
- Why selected: explicitly budget-focused; U-Bahn station Maybachstraße is
  directly outside; the hotel has an underground parking garage.
- Official guest rating at research time: 4.2/5 from 701 verified ALL reviews.
- Official source:
  https://all.accor.com/hotel/5441/index.de.shtml

### B&B HOTEL Stuttgart-Airport/Messe

- Profile: budget chain, airport and Messe corridor, family rooms
- Ceremony: approximately 7.2 km / 10 minutes by car
- Celebration: approximately 28.5 km / 21 minutes by car
- Why selected: one of the clearest low-cost choices near the airport corridor;
  straightforward check-in, family-room options and a strong official guest
  score.
- Official guest rating at research time: 4.5/5 from 1,587 reviews.
- Official source:
  https://www.hotel-bb.com/de/hotel/stuttgart-airport-messe

### Hotel am Schillerpark

- Profile: family-run, Esslingen, balanced position between both venues
- Ceremony: approximately 22.5 km / 24 minutes by car
- Celebration: approximately 25.4 km / 24 minutes by car
- Why selected: the most balanced option between both wedding locations;
  offers single, double and family rooms; the hotel advertises fair direct
  rates, central Esslingen access and quick access to the B10 and A8.
- Official sources:
  https://www.hotel-am-schillerpark.de/
  https://www.hotel-am-schillerpark.de/service/vorteile-auf-einen-blick
  https://www.hotel-am-schillerpark.de/buchen

### NH Stuttgart Airport

- Profile: optional higher-comfort choice, Filderstadt, airport, parking
- Ceremony: approximately 13.9 km / 15 minutes by car
- Celebration: approximately 25 km / 25 minutes by car
- Why selected: fills the Filderstadt requirement and provides a practical
  airport-oriented option with parking, shuttle service, accessible rooms and
  connecting rooms for families. This is the only new premium-tagged option.
- Official source:
  https://www.nh-hotels.com/en/hotel/nh-stuttgart-airport

## Candidate Evaluation

The shortlist intentionally avoids turning the section into a hotel directory.
Several additional local hotels and chain properties were considered but not
added when they had one or more of these weaknesses:

- incomplete or unverified official booking links;
- inaccurate or conflicting address information;
- no meaningful geographic advantage over an included hotel;
- luxury positioning without a clear guest-planning benefit;
- insufficiently reliable image sourcing;
- excessive overlap with the existing Kirchheim recommendations.

The five selected hotels expand geographic coverage without removing or
weakening the original couple-curated recommendations.

## Image Assets

All required images are real hotel images downloaded from official hotel
sources and stored locally. No placeholder or generated hotel imagery is used.

| Hotel | Target path | Official image source |
| --- | --- | --- |
| ibis Styles Stuttgart Vaihingen | `/public/hotels/ibis-styles-stuttgart-vaihingen.jpg` | `https://www.ahstatic.com/photos/a6q4_ho_00_p_1024x768.jpg` |
| ibis budget Stuttgart City Nord | `/public/hotels/ibis-budget-stuttgart-city-nord.jpg` | `https://www.ahstatic.com/photos/5441_ho_00_p_1024x768.jpg` |
| B&B HOTEL Stuttgart-Airport/Messe | `/public/hotels/bb-hotel-stuttgart-airport-messe.jpg` | `https://res.cloudinary.com/hzekpb1cg/image/upload/q_auto:good/c_fill,h_900,w_1400,f_jpg/s3/public/prod/s3fs-public/hotel-stuttgart-airport-messe_0118_double-room_3.e8e8589e-55677.jpg` |
| Hotel am Schillerpark | `/public/hotels/hotel-am-schillerpark-esslingen.jpg` | `https://www.hotel-am-schillerpark.de/media/user_upload/zimmer/thumbs/einzelzimmer-standard-esslingen_thumb-min.jpg` |
| NH Stuttgart Airport | `/public/hotels/nh-stuttgart-airport.jpg` | `https://img.nh-hotels.net/d2KK/1dk1XP/original/NH_Stuttgart_Airport_Room_superior_curtains_open_king_size_bed_armchair_coffee_maker_lamps_tv_view.jpg` |

The image sources are official promotional hotel media. Usage permission should
be confirmed before public commercial distribution.

## Maintenance Notes

- All live hotel content remains centralized in
  `src/data/recommended-hotels.ts`.
- Prices and ratings are intentionally not stored in the runtime dataset
  because they change frequently.
- Distances and travel times are editorial estimates and should be reviewed if
  either wedding venue changes.
- The website performs no hotel search, geocoding or route API requests.
