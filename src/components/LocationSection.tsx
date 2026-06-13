"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { HiOutlineMapPin } from "react-icons/hi2";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import styles from "./CinematicScenes.module.css";
import SceneHeader from "./SceneHeader";

export default function LocationSection() {
  const t = useTypedTranslations("wedding");
  const [tab, setTab] = useState(0);

  const locations = [
    {
      tab: t("locations.ceremony.tab"),
      title: t("locations.ceremony.title"),
      venue: t("locations.ceremony.venue"),
      address: t("locations.ceremony.address"),
      description: t("locations.ceremony.description"),
      mapQuery: "Heilige+Familie+Stuttgart",
    },
    {
      tab: t("locations.reception.tab"),
      title: t("locations.reception.title"),
      venue: t("locations.reception.venue"),
      address: t("locations.reception.address"),
      description: t("locations.reception.description"),
      mapQuery: "White+Event+Palast+Kirchheim+unter+Teck",
    },
  ];
  const location = locations[tab];

  return (
    <section className={`${styles.scene} ${styles.sceneSoft}`} id="locations">
      <div className={styles.inner}>
        <SceneHeader
          eyebrow={t("locations.subtitle")}
          index="05"
          title={t("locations.title")}
        />

        <div className={styles.tabs} role="tablist">
          {locations.map((item, index) => (
            <button
              aria-selected={tab === index}
              className={`${styles.tab} ${tab === index ? styles.tabActive : ""}`}
              key={item.tab}
              onClick={() => setTab(index)}
              role="tab"
              type="button"
            >
              {item.tab}
            </button>
          ))}
        </div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className={styles.locationStage}
          initial={{ opacity: 0, y: 24 }}
          key={location.title}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.mapFrame}>
            <iframe
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${location.mapQuery}&output=embed`}
              title={`Map of ${location.venue}`}
              width="100%"
            />
          </div>
          <div className={styles.locationCopy}>
            <div className={styles.locationIcon}>
              <HiOutlineMapPin />
            </div>
            <h3 className={styles.locationTitle}>{location.title}</h3>
            <p className={styles.locationVenue}>{location.venue}</p>
            <p className={styles.locationAddress}>{location.address}</p>
            <p className={styles.locationDescription}>{location.description}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
