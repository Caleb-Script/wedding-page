"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  HiArrowUpRight,
  HiOutlineClock,
  HiOutlineMapPin,
} from "react-icons/hi2";
import { CINEMATIC_EASE } from "@/components/CinematicMotion";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import styles from "./CinematicScenes.module.css";
import SceneHeader from "./SceneHeader";

const hotels = [
  {
    id: "fuchsen",
    image: "/hotels/hotel-fuchsen.jpg",
    booking: "https://www.hotel-fuchsen.de/",
    map: "https://www.google.com/maps/search/?api=1&query=Hotel+Fuchsen+Kirchheim+unter+Teck",
  },
  {
    id: "ateck",
    image: "/hotels/ateckhotel.jpg",
    booking: "https://www.ateckhotel.de/zimmer/",
    map: "https://www.google.com/maps/search/?api=1&query=Ateckhotel+Kirchheim+unter+Teck",
  },
  {
    id: "wuerttemberg",
    image: "/hotels/wuerttembergischer-hof.jpg",
    booking: "https://www.hotel.de/de/hotel/400738",
    map: "https://www.google.com/maps/search/?api=1&query=Wuerttembergischer+Hof+Kirchheim+unter+Teck",
  },
] as const;

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

        <div className={styles.hotelGrid}>
          {hotels.map((hotel, index) => (
            <motion.article
              className={styles.hotelCard}
              initial={{ opacity: 0, y: 42 }}
              key={hotel.id}
              transition={{
                delay: index * 0.1,
                duration: 0.8,
                ease: CINEMATIC_EASE,
              }}
              viewport={{ once: true, amount: 0.25 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className={styles.hotelMedia}>
                <Image
                  alt={t(`accommodation.hotels.${hotel.id}.name`)}
                  fill
                  sizes="(max-width: 900px) 100vw, 33vw"
                  src={hotel.image}
                />
                <span className={styles.hotelNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className={styles.hotelContent}>
                <div className={styles.hotelMetrics}>
                  <span>
                    <HiOutlineMapPin />
                    {t(`accommodation.hotels.${hotel.id}.distance`)}
                  </span>
                  <span>
                    <HiOutlineClock />
                    {t(`accommodation.hotels.${hotel.id}.travelTime`)}
                  </span>
                  <span>{t(`accommodation.hotels.${hotel.id}.price`)}</span>
                </div>
                <h3 className={styles.hotelTitle}>
                  {t(`accommodation.hotels.${hotel.id}.name`)}
                </h3>
                <p className={styles.hotelDescription}>
                  {t(`accommodation.hotels.${hotel.id}.description`)}
                </p>
                <div className={styles.hotelActions}>
                  <a href={hotel.booking} rel="noreferrer" target="_blank">
                    {t("accommodation.booking")}
                    <HiArrowUpRight />
                  </a>
                  <a href={hotel.map} rel="noreferrer" target="_blank">
                    {t("accommodation.map")}
                    <HiOutlineMapPin />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </Root>
  );
}
