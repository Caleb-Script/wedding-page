"use client";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLocale } from "next-intl";
import {
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

type DestinationStaysProps = {
  embedded?: boolean;
};

export default function DestinationStays({
  embedded = false,
}: DestinationStaysProps) {
  const t = useTypedTranslations("wedding");
  const locale = resolveHotelContentLocale(useLocale());
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

        <Box
          aria-label={t("accommodation.listLabel")}
          className={hotelStyles.hotelEditorialGrid}
          component="div"
        >
          {RECOMMENDED_HOTELS.map((hotel, index) => (
            <HotelRecommendationCard
              hotel={hotel}
              index={index}
              key={hotel.id}
              locale={locale}
            />
          ))}
        </Box>
      </div>
    </Root>
  );
}

type HotelRecommendationCardProps = {
  hotel: RecommendedHotel;
  index: number;
  locale: ReturnType<typeof resolveHotelContentLocale>;
};

function HotelRecommendationCard({
  hotel,
  index,
  locale,
}: HotelRecommendationCardProps) {
  const t = useTypedTranslations("wedding");

  return (
    <motion.article
      aria-labelledby={`${hotel.id}-title`}
      className={`${hotelStyles.hotelRecommendationMotion} ${
        hotel.featured ? hotelStyles.hotelRecommendationMotionFeatured : ""
      }`}
      initial={{ opacity: 0, y: 34 }}
      transition={{
        delay: index * 0.1,
        duration: 0.8,
        ease: CINEMATIC_EASE,
      }}
      viewport={{ once: true, amount: 0.18 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <Card
        className={`${hotelStyles.hotelRecommendationCard} ${
          hotel.featured ? hotelStyles.hotelRecommendationFeatured : ""
        }`}
        elevation={0}
      >
        <Box className={hotelStyles.hotelRecommendationMedia}>
          <Image
            alt={t("accommodation.imageAlt", { hotel: hotel.name })}
            fill
            sizes={
              hotel.featured
                ? "(max-width: 900px) 100vw, 58vw"
                : "(max-width: 560px) 100vw, (max-width: 900px) 50vw, 42vw"
            }
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
              {String(index + 1).padStart(2, "0")}
            </Typography>

            {hotel.tags && hotel.tags.length > 0 && (
              <Stack
                className={hotelStyles.hotelRecommendationTags}
                direction="row"
                useFlexGap
              >
                {hotel.tags.map((tag) => (
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
              component="h3"
              id={`${hotel.id}-title`}
            >
              <WordReveal delay={index * 0.05}>{hotel.name}</WordReveal>
            </Typography>

            <Typography
              className={hotelStyles.hotelRecommendationDescription}
              component="p"
            >
              <EditorialReveal delay={0.14 + index * 0.05}>
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
    </motion.article>
  );
}
