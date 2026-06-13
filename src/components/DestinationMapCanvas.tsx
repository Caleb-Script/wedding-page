"use client";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  divIcon,
  type LatLngBoundsExpression,
  type LatLngTuple,
} from "leaflet";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";
import {
  HiArrowsPointingIn,
  HiArrowsPointingOut,
  HiArrowUpRight,
  HiOutlineBuildingOffice,
  HiOutlineGlobeAlt,
  HiOutlineHeart,
  HiOutlineMapPin,
} from "react-icons/hi2";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMap,
  ZoomControl,
} from "react-leaflet";
import {
  RECOMMENDED_HOTELS,
  type RecommendedHotel,
  resolveHotelContentLocale,
} from "@/data/recommended-hotels";
import {
  WEDDING_LOCATIONS,
  type WeddingLocationCoordinates,
} from "@/data/wedding-locations";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import styles from "./DestinationMap.module.css";

type MarkerKind = "ceremony" | "hotel" | "reception";

const MARKER_SVGS: Record<MarkerKind, string> = {
  ceremony:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v18M7 8h10M5 21h14"/></svg>',
  hotel:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 21V4h11v17M16 9h3v12M8 8h2M8 12h2M8 16h2M13 8h1M13 12h1M13 16h1M3 21h18"/></svg>',
  reception:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4"/></svg>',
};

function createMarkerIcon(kind: MarkerKind) {
  return divIcon({
    className: `${styles.mapMarkerHost} ${styles[`mapMarker${kind}`]}`,
    html: `<span class="${styles.mapMarkerCore}">${MARKER_SVGS[kind]}</span>`,
    iconAnchor: [25, 25],
    iconSize: [50, 50],
    popupAnchor: [0, -25],
  });
}

const MARKER_ICONS: Record<MarkerKind, ReturnType<typeof divIcon>> = {
  ceremony: createMarkerIcon("ceremony"),
  hotel: createMarkerIcon("hotel"),
  reception: createMarkerIcon("reception"),
};

const ALL_COORDINATES: LatLngBoundsExpression = [
  ...WEDDING_LOCATIONS.map(
    (location) => [location.latitude, location.longitude] as LatLngTuple,
  ),
  ...RECOMMENDED_HOTELS.map(
    (hotel) => [hotel.latitude, hotel.longitude] as LatLngTuple,
  ),
];

const WEDDING_ROUTE: LatLngTuple[] = WEDDING_LOCATIONS.map(
  (location) => [location.latitude, location.longitude] as LatLngTuple,
);

function MapController() {
  const map = useMap();

  useEffect(() => {
    map.fitBounds(ALL_COORDINATES, {
      animate: false,
      maxZoom: 12,
      padding: [44, 44],
    });
  }, [map]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      window.setTimeout(() => map.invalidateSize(), 80);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [map]);

  return null;
}

export default function DestinationMapCanvas() {
  const t = useTypedTranslations("wedding");
  const locale = resolveHotelContentLocale(useLocale());
  const mapShellRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [recenterVersion, setRecenterVersion] = useState(0);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === mapShellRef.current);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    await mapShellRef.current?.requestFullscreen();
  };

  return (
    <Box className={styles.mapShell} ref={mapShellRef}>
      <MapContainer
        aria-label={t("accommodation.mapView.mapLabel")}
        center={[48.66, 9.3]}
        className={styles.mapRoot}
        scrollWheelZoom={false}
        zoom={10}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Polyline
          pathOptions={{
            color: "#d8b879",
            dashArray: "8 13",
            opacity: 0.62,
            weight: 2,
          }}
          positions={WEDDING_ROUTE}
        />

        {WEDDING_LOCATIONS.map((location) => (
          <Marker
            alt={t(`locations.${location.id}.title`)}
            icon={MARKER_ICONS[location.id]}
            key={location.id}
            keyboard
            position={[location.latitude, location.longitude]}
            title={t(`locations.${location.id}.venue`)}
          >
            <Popup maxWidth={330} minWidth={270}>
              <WeddingLocationPopup location={location} />
            </Popup>
          </Marker>
        ))}

        {RECOMMENDED_HOTELS.map((hotel) => (
          <Marker
            alt={hotel.name}
            icon={MARKER_ICONS.hotel}
            key={hotel.id}
            keyboard
            position={[hotel.latitude, hotel.longitude]}
            title={hotel.name}
          >
            <Popup maxWidth={340} minWidth={280}>
              <HotelPopup hotel={hotel} locale={locale} />
            </Popup>
          </Marker>
        ))}

        <MapController key={recenterVersion} />
        <ZoomControl position="bottomright" />
      </MapContainer>

      <Box
        aria-label={t("accommodation.mapView.legendLabel")}
        className={styles.mapLegend}
        component="aside"
      >
        <Typography component="p">
          {t("accommodation.mapView.legendTitle")}
        </Typography>
        <Stack component="ul">
          <li>
            <span className={styles.legendCeremony} />
            {t("accommodation.mapView.ceremony")}
          </li>
          <li>
            <span className={styles.legendReception} />
            {t("accommodation.mapView.celebration")}
          </li>
          <li>
            <span className={styles.legendHotel} />
            {t("accommodation.mapView.hotels")}
          </li>
        </Stack>
      </Box>

      <Stack className={styles.mapControls} direction="row">
        <Tooltip title={t("accommodation.mapView.showAll")}>
          <IconButton
            aria-label={t("accommodation.mapView.showAll")}
            onClick={() => setRecenterVersion((version) => version + 1)}
          >
            <HiOutlineMapPin aria-hidden="true" />
          </IconButton>
        </Tooltip>
        <Tooltip
          title={
            isFullscreen
              ? t("accommodation.mapView.exitFullscreen")
              : t("accommodation.mapView.fullscreen")
          }
        >
          <IconButton
            aria-label={
              isFullscreen
                ? t("accommodation.mapView.exitFullscreen")
                : t("accommodation.mapView.fullscreen")
            }
            onClick={toggleFullscreen}
          >
            {isFullscreen ? (
              <HiArrowsPointingIn aria-hidden="true" />
            ) : (
              <HiArrowsPointingOut aria-hidden="true" />
            )}
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );
}

function WeddingLocationPopup({
  location,
}: {
  location: WeddingLocationCoordinates;
}) {
  const t = useTypedTranslations("wedding");

  return (
    <Card className={styles.mapPopupCard} elevation={0}>
      <CardContent>
        <Typography className={styles.mapPopupEyebrow} component="p">
          {t(`locations.${location.id}.title`)}
        </Typography>
        <Typography className={styles.mapPopupTitle} component="h4">
          {t(`locations.${location.id}.venue`)}
        </Typography>
        <Typography className={styles.mapPopupAddress} component="address">
          <HiOutlineMapPin aria-hidden="true" />
          {t(`locations.${location.id}.address`)}
        </Typography>
        <Typography className={styles.mapPopupDescription} component="p">
          {t(`locations.${location.id}.description`)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          aria-label={t("accommodation.mapView.routeToLocation", {
            location: t(`locations.${location.id}.venue`),
          })}
          href={location.mapUrl}
          rel="noreferrer"
          target="_blank"
        >
          {t("accommodation.map")}
          <HiArrowUpRight aria-hidden="true" />
        </Button>
      </CardActions>
    </Card>
  );
}

function HotelPopup({
  hotel,
  locale,
}: {
  hotel: RecommendedHotel;
  locale: ReturnType<typeof resolveHotelContentLocale>;
}) {
  const t = useTypedTranslations("wedding");

  return (
    <Card className={styles.mapPopupCard} elevation={0}>
      <Box className={styles.mapPopupMedia}>
        <Image
          alt={t("accommodation.imageAlt", { hotel: hotel.name })}
          fill
          sizes="340px"
          src={hotel.image}
        />
      </Box>
      <CardContent>
        {hotel.tags && hotel.tags.length > 0 && (
          <Stack className={styles.mapPopupTags} direction="row" useFlexGap>
            {hotel.tags.map((tag) => (
              <Chip key={tag} label={t(`accommodation.tags.${tag}`)} />
            ))}
          </Stack>
        )}
        <Typography className={styles.mapPopupTitle} component="h4">
          {hotel.name}
        </Typography>
        <Typography className={styles.mapPopupDescription} component="p">
          {hotel.description[locale]}
        </Typography>
        <Typography className={styles.mapPopupAddress} component="address">
          <HiOutlineMapPin aria-hidden="true" />
          {hotel.address}
        </Typography>
        <Box className={styles.mapPopupFacts}>
          {hotel.distanceToCeremony && (
            <span>
              <HiOutlineHeart aria-hidden="true" />
              {t("accommodation.ceremonyDistance")}:{" "}
              <strong>{hotel.distanceToCeremony}</strong>
            </span>
          )}
          {hotel.distanceToCelebration && (
            <span>
              <HiOutlineBuildingOffice aria-hidden="true" />
              {t("accommodation.celebrationDistance")}:{" "}
              <strong>{hotel.distanceToCelebration}</strong>
            </span>
          )}
        </Box>
      </CardContent>
      {(hotel.website || hotel.bookingUrl || hotel.mapUrl) && (
        <CardActions>
          {hotel.website && (
            <Button
              aria-label={t("accommodation.actionLabel", {
                action: t("accommodation.website"),
                hotel: hotel.name,
              })}
              href={hotel.website}
              rel="noreferrer"
              target="_blank"
            >
              <HiOutlineGlobeAlt aria-hidden="true" />
              {t("accommodation.website")}
            </Button>
          )}
          {hotel.bookingUrl && (
            <Button
              aria-label={t("accommodation.actionLabel", {
                action: t("accommodation.booking"),
                hotel: hotel.name,
              })}
              href={hotel.bookingUrl}
              rel="noreferrer"
              target="_blank"
            >
              {t("accommodation.booking")}
            </Button>
          )}
          {hotel.mapUrl && (
            <Button
              aria-label={t("accommodation.actionLabel", {
                action: t("accommodation.map"),
                hotel: hotel.name,
              })}
              href={hotel.mapUrl}
              rel="noreferrer"
              target="_blank"
            >
              {t("accommodation.map")}
            </Button>
          )}
        </CardActions>
      )}
    </Card>
  );
}
