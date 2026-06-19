"use client";

import { format } from "date-fns";
import { de, enUS, it } from "date-fns/locale";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import {
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineMapPin,
} from "react-icons/hi2";
import { CINEMATIC_EASE, WordReveal } from "@/components/CinematicMotion";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import styles from "./CinematicScenes.module.css";
import SceneHeader from "./SceneHeader";

const weddingDate = new Date(2026, 10, 21);

type WeddingDetailsBeatProps = {
  embedded?: boolean;
};

export default function WeddingDetailsBeat({
  embedded = false,
}: WeddingDetailsBeatProps) {
  const t = useTypedTranslations("wedding");
  const locale = useLocale();
  const dateLocale = locale === "de" ? de : locale === "it" ? it : enUS;
  const date = format(weddingDate, "d MMMM yyyy", { locale: dateLocale });

  const cards = [
    {
      title: t("weddingInfo.ceremony.title"),
      venue: t("weddingInfo.ceremony.venue"),
      address: t("weddingInfo.ceremony.address"),
      time: "12:30",
      icon: HiOutlineMapPin,
    },
    {
      title: t("weddingInfo.reception.title"),
      venue: t("weddingInfo.reception.venue"),
      address: t("weddingInfo.reception.address"),
      time: "18:00",
      icon: HiOutlineClock,
    },
  ];

  const Root = embedded ? "div" : "section";

  return (
    <Root
      className={
        embedded ? styles.chapterBeat : `${styles.scene} ${styles.sceneWarm}`
      }
      id="details"
    >
      <div className={styles.inner}>
        <SceneHeader
          eyebrow={t("weddingInfo.subtitle")}
          index="03"
          title={t("weddingInfo.title")}
        />

        <div className={styles.detailsGrid}>
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.article
                className={styles.detailPanel}
                initial={{ opacity: 0, y: 35 }}
                key={card.title}
                transition={{
                  delay: index * 0.12,
                  duration: 0.8,
                  ease: CINEMATIC_EASE,
                }}
                viewport={{ once: true, amount: 0.3 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className={styles.panelTop}>
                  <Icon />
                  <span className={styles.panelNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className={styles.panelTitle}>
                  <WordReveal delay={index * 0.08}>{card.title}</WordReveal>
                </h3>
                <p className={styles.panelVenue}>{card.venue}</p>
                <p className={styles.panelAddress}>{card.address}</p>

                <div className={styles.panelMeta}>
                  <span className={styles.metaItem}>
                    <HiOutlineCalendar />
                    {date}
                  </span>
                  <span className={styles.metaItem}>
                    <HiOutlineClock />
                    {card.time}
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </Root>
  );
}
