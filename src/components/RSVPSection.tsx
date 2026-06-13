"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HiArrowUpRight } from "react-icons/hi2";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import styles from "./CinematicScenes.module.css";

const EVENT_ID =
  process.env.NEXT_PUBLIC_EVENT_ID || "6d650ee6-8ed0-4694-afd4-71871c37683a";

export default function RSVPSection() {
  const t = useTypedTranslations("wedding");

  return (
    <section className={`${styles.scene} ${styles.sceneDeep}`} id="rsvp">
      <div className={styles.inner}>
        <motion.div
          className={styles.rsvpStage}
          initial={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.35 }}
          whileInView={{ opacity: 1, scale: 1 }}
        >
          <div className={styles.rsvpContent}>
            <p className={styles.eyebrow}>{t("rsvp.subtitle")}</p>
            <h2 className={styles.rsvpTitle}>{t("rsvp.title")}</h2>
            <p className={styles.rsvpQuote}>{t("rsvp.quote")}</p>
            <Link
              className={styles.primaryAction}
              href={`https://checkpoint.omnixys.com/rsvp?eventId=${EVENT_ID}`}
            >
              <span>{t("rsvp.button")}</span>
              <HiArrowUpRight />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
