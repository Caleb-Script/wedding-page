"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { HiOutlineMapPin } from "react-icons/hi2";
import {
  CINEMATIC_EASE,
  EditorialReveal,
  WordReveal,
} from "@/components/CinematicMotion";
import CinematicTabs from "@/components/CinematicTabs";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import styles from "./CinematicScenes.module.css";
import SceneHeader from "./SceneHeader";

type DestinationLocationsProps = {
  embedded?: boolean;
};

export default function DestinationLocations({
  embedded = false,
}: DestinationLocationsProps) {
  const t = useTypedTranslations("wedding");
  const [tab, setTab] = useState(0);

  const locations = [
    {
      tab: t("locations.ceremony.tab"),
      title: t("locations.ceremony.title"),
      venue: t("locations.ceremony.venue"),
      address: t("locations.ceremony.address"),
      description: t("locations.ceremony.description"),
      image: "/locations/church.jpg",
    },
    {
      tab: t("locations.reception.tab"),
      title: t("locations.reception.title"),
      venue: t("locations.reception.venue"),
      address: t("locations.reception.address"),
      description: t("locations.reception.description"),
      image: "/locations/reception.jpg",
    },
  ];
  const location = locations[tab];

  const Root = embedded ? "div" : "section";

  return (
    <Root
      className={
        embedded ? styles.chapterBeat : `${styles.scene} ${styles.sceneSoft}`
      }
      id="locations"
    >
      <div className={styles.inner}>
        <SceneHeader
          eyebrow={t("locations.subtitle")}
          index="05"
          title={t("locations.title")}
        />

        <CinematicTabs
          ariaLabel={t("locations.title")}
          labels={locations.map((item) => item.tab)}
          onChange={setTab}
          value={tab}
        />

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className={styles.locationStage}
          initial={{ opacity: 0, y: 24 }}
          key={location.title}
          transition={{ duration: 0.65, ease: CINEMATIC_EASE }}
        >
          <div className={styles.locationCopy}>
            <div className={styles.locationIcon}>
              <HiOutlineMapPin />
            </div>
            <h3 className={styles.locationTitle}>
              <WordReveal>{location.title}</WordReveal>
            </h3>
            <p className={styles.locationVenue}>{location.venue}</p>
            <p className={styles.locationAddress}>{location.address}</p>
            <p className={styles.locationDescription}>
              <EditorialReveal delay={0.18}>
                {location.description}
              </EditorialReveal>
            </p>
          </div>

          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className={styles.locationMedia}
            initial={{ opacity: 0, x: 28 }}
            key={location.image}
            transition={{ duration: 0.72, ease: CINEMATIC_EASE }}
          >
            <Image
              alt={`${location.title} - ${location.venue}`}
              className={styles.locationImage}
              fill
              sizes="(max-width: 900px) calc(100vw - 40px), 56vw"
              src={location.image}
            />
            <div className={styles.locationImageOverlay}>
              <span className={styles.locationImageLabel}>{location.tab}</span>
              <span>{location.venue}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Root>
  );
}
