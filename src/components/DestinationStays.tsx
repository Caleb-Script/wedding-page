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
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  HiArrowLeft,
  HiArrowRight,
  HiArrowUpRight,
  HiOutlineBuildingOffice,
  HiOutlineClock,
  HiOutlineGlobeAlt,
  HiOutlineHeart,
  HiOutlineMapPin,
} from "react-icons/hi2";
import {
  CINEMATIC_EASE,
  EditorialReveal,
  WordReveal,
} from "@/components/CinematicMotion";
import {
  RECOMMENDED_HOTELS,
  type RecommendedHotel,
  resolveHotelContentLocale,
} from "@/data/recommended-hotels";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import styles from "./CinematicScenes.module.css";
import DestinationMap from "./DestinationMap";
import hotelStyles from "./DestinationStays.module.css";
import SceneHeader from "./SceneHeader";

const AUTO_ADVANCE_MS = 3000;

type DestinationStaysProps = {
  embedded?: boolean;
};

export default function DestinationStays({
  embedded = false,
}: DestinationStaysProps) {
  const t = useTypedTranslations("wedding");
  const Root = embedded ? "div" : "section";

  return (
    <Root
      className={
        embedded ? styles.chapterBeat : `${styles.scene} ${styles.sceneWarm}`
      }
      id="accommodation"
    >
      <div className={styles.inner}>
        <SceneHeader
          eyebrow={t("accommodation.subtitle")}
          index="06"
          title={t("accommodation.title")}
        />

        <Box className={hotelStyles.hotelEditorialIntro} component="header">
          <Typography
            className={hotelStyles.hotelEditorialEyebrow}
            component="p"
          >
            {t("accommodation.intro.eyebrow")}
          </Typography>

          <Typography
            className={hotelStyles.hotelEditorialTitle}
            component="h3"
          >
            <WordReveal>{t("accommodation.intro.title")}</WordReveal>
          </Typography>

          <Typography
            className={hotelStyles.hotelEditorialDescription}
            component="p"
          >
            <EditorialReveal delay={0.16}>
              {t("accommodation.intro.description")}
            </EditorialReveal>
          </Typography>
        </Box>

        <DestinationMap />

        <HotelShowcase />
      </div>
    </Root>
  );
}

function HotelShowcase() {
  const t = useTypedTranslations("wedding");
  const locale = resolveHotelContentLocale(useLocale());
  const theme = useTheme();
  const reduceMotion = useReducedMotion();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const cardsPerPage = isMobile ? 1 : isTablet ? 2 : 3;
  const totalPages = Math.max(
    1,
    Math.ceil(RECOMMENDED_HOTELS.length / cardsPerPage),
  );

  const [page, setPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const safePage = page % totalPages;

  const visibleHotels = useMemo(() => {
    const start = safePage * cardsPerPage;
    return RECOMMENDED_HOTELS.slice(start, start + cardsPerPage);
  }, [cardsPerPage, safePage]);

  const goToPage = useCallback(
    (nextPage: number) => {
      setPage((nextPage + totalPages) % totalPages);
    },
    [totalPages],
  );

  const goNext = useCallback(() => {
    goToPage(safePage + 1);
  }, [goToPage, safePage]);

  const goPrev = useCallback(() => {
    goToPage(safePage - 1);
  }, [goToPage, safePage]);

  useEffect(() => {
    if (reduceMotion || isPaused || totalPages <= 1) return;

    const timeout = window.setTimeout(() => {
      setPage((currentPage) => (currentPage + 1) % totalPages);
    }, AUTO_ADVANCE_MS);

    return () => window.clearTimeout(timeout);
  }, [isPaused, reduceMotion, totalPages]);

  return (
    <Box
      aria-label={t("accommodation.listLabel")}
      className={hotelStyles.hotelShowcase}
      component="section"
      onBlur={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Stack
        className={hotelStyles.hotelShowcaseHeader}
        direction={{ xs: "column", md: "row" }}
        spacing={3}
      >
        <Box className={hotelStyles.hotelShowcaseCopy}>
          <Typography className={hotelStyles.hotelShowcaseEyebrow}>
            {t("accommodation.showcase.count", {
              count: String(RECOMMENDED_HOTELS.length).padStart(2, "0"),
            })}
          </Typography>

          <Typography className={hotelStyles.hotelShowcaseTitle} component="h3">
            <WordReveal>{t("accommodation.showcase.title")}</WordReveal>
          </Typography>
        </Box>

        <Stack
          className={hotelStyles.hotelShowcaseControls}
          direction="row"
          spacing={1.25}
        >
          <IconButton
            aria-label={t("accommodation.showcase.previous")}
            className={hotelStyles.hotelShowcaseButton}
            disabled={totalPages <= 1}
            onClick={goPrev}
          >
            <HiArrowLeft />
          </IconButton>

          <Typography
            aria-live="polite"
            className={hotelStyles.hotelShowcasePage}
          >
            {String(safePage + 1).padStart(2, "0")} /{" "}
            {String(totalPages).padStart(2, "0")}
          </Typography>

          <IconButton
            aria-label={t("accommodation.showcase.next")}
            className={hotelStyles.hotelShowcaseButton}
            disabled={totalPages <= 1}
            onClick={goNext}
          >
            <HiArrowRight />
          </IconButton>
        </Stack>
      </Stack>

      <Box className={hotelStyles.hotelShowcaseViewport}>
        <AnimatePresence mode="wait">
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className={hotelStyles.hotelShowcaseGrid}
            exit={{ opacity: 0, x: reduceMotion ? 0 : -24 }}
            initial={{ opacity: 0, x: reduceMotion ? 0 : 24 }}
            key={`${safePage}-${cardsPerPage}`}
            transition={{
              duration: reduceMotion ? 0 : 0.55,
              ease: CINEMATIC_EASE,
            }}
          >
            {visibleHotels.map((hotel, index) => (
              <HotelRecommendationCard
                absoluteIndex={safePage * cardsPerPage + index}
                hotel={hotel}
                key={hotel.id}
                locale={locale}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
}

type HotelRecommendationCardProps = {
  absoluteIndex: number;
  hotel: RecommendedHotel;
  locale: ReturnType<typeof resolveHotelContentLocale>;
};

function HotelRecommendationCard({
  absoluteIndex,
  hotel,
  locale,
}: HotelRecommendationCardProps) {
  const t = useTypedTranslations("wedding");

  return (
    <Card
      aria-labelledby={`${hotel.id}-title`}
      className={`${hotelStyles.hotelRecommendationCard} ${
        hotel.featured ? hotelStyles.hotelRecommendationFeatured : ""
      }`}
      elevation={0}
    >
      <Box className={hotelStyles.hotelRecommendationMedia}>
        <Image
          alt={t("accommodation.imageAlt", { hotel: hotel.name })}
          fill
          loading={absoluteIndex < 3 ? "eager" : "lazy"}
          priority={absoluteIndex < 3}
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
          src={hotel.image}
        />
      </Box>

      <Box className={hotelStyles.hotelRecommendationBody}>
        <CardContent className={hotelStyles.hotelRecommendationContent}>
          <Typography
            aria-hidden="true"
            className={hotelStyles.hotelRecommendationIndex}
            component="span"
          >
            {String(absoluteIndex + 1).padStart(2, "0")}
          </Typography>

          {hotel.tags && hotel.tags.length > 0 && (
            <Stack
              className={hotelStyles.hotelRecommendationTags}
              direction="row"
              useFlexGap
            >
              {hotel.tags.slice(0, 3).map((tag) => (
                <Chip
                  key={tag}
                  label={t(`accommodation.tags.${tag}`)}
                  size="small"
                />
              ))}
            </Stack>
          )}

          <Typography
            className={hotelStyles.hotelRecommendationTitle}
            component="h4"
            id={`${hotel.id}-title`}
          >
            <WordReveal delay={0.04}>{hotel.name}</WordReveal>
          </Typography>

          <Typography
            className={hotelStyles.hotelRecommendationDescription}
            component="p"
          >
            <EditorialReveal delay={0.12}>
              {hotel.description[locale]}
            </EditorialReveal>
          </Typography>

          <Typography
            className={hotelStyles.hotelRecommendationAddress}
            component="address"
          >
            <HiOutlineMapPin aria-hidden="true" />
            {hotel.address}
          </Typography>

          <Box className={hotelStyles.hotelRecommendationFacts}>
            {hotel.distanceToCeremony && (
              <span>
                <HiOutlineHeart aria-hidden="true" />
                <small>{t("accommodation.ceremonyDistance")}</small>
                <strong>{hotel.distanceToCeremony}</strong>
              </span>
            )}

            {hotel.distanceToCelebration && (
              <span>
                <HiOutlineBuildingOffice aria-hidden="true" />
                <small>{t("accommodation.celebrationDistance")}</small>
                <strong>{hotel.distanceToCelebration}</strong>
              </span>
            )}

            {hotel.travelTime && (
              <span>
                <HiOutlineClock aria-hidden="true" />
                <small>{t("accommodation.travelTime")}</small>
                <strong>{hotel.travelTime}</strong>
              </span>
            )}
          </Box>
        </CardContent>

        {(hotel.bookingUrl || hotel.mapUrl || hotel.website) && (
          <CardActions className={hotelStyles.hotelRecommendationActions}>
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
                <HiArrowUpRight aria-hidden="true" />
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
                <HiOutlineMapPin aria-hidden="true" />
              </Button>
            )}

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
                {t("accommodation.website")}
                <HiOutlineGlobeAlt aria-hidden="true" />
              </Button>
            )}
          </CardActions>
        )}
      </Box>
    </Card>
  );
}
