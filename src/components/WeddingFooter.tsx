"use client";

import { format } from "date-fns";
import { de, enUS, it } from "date-fns/locale";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import styles from "./CinematicScenes.module.css";

const weddingDate = new Date(2026, 10, 21);

export default function WeddingFooter() {
  const t = useTypedTranslations("wedding");
  const locale = useLocale();
  const dateLocale = locale === "de" ? de : locale === "it" ? it : enUS;

  return (
    <footer className={styles.footer}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <div className={styles.footerMonogram} aria-hidden="true">
          #CGR
        </div>
        <p className={styles.footerNames}>Caleb & Rachel</p>
        <p className={styles.footerDate}>
          {format(weddingDate, "d MMMM yyyy", { locale: dateLocale })}
        </p>
        <p className={styles.footerMessage}>{t("footer.message")}</p>
      </motion.div>
    </footer>
  );
}
