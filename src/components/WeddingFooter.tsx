"use client";

import { format } from "date-fns";
import { de, enUS, it } from "date-fns/locale";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useLocale } from "next-intl";
import {
  CINEMATIC_EASE,
  EditorialReveal,
  WordReveal,
} from "@/components/CinematicMotion";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import styles from "./CinematicScenes.module.css";

const weddingDate = new Date(2026, 10, 21);

export default function WeddingFooter() {
  const t = useTypedTranslations("wedding");
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const dateLocale = locale === "de" ? de : locale === "it" ? it : enUS;

  return (
    <footer className={styles.footer}>
      <motion.div
        className={styles.footerEditorial}
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 28 }}
        transition={{ duration: reduceMotion ? 0 : 1.1, ease: CINEMATIC_EASE }}
        viewport={{ once: true, amount: 0.35 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <header className={styles.footerHeader}>
          <p className={styles.footerNames}>
            <WordReveal>Caleb & Rachel</WordReveal>
          </p>
          <motion.div
            aria-hidden="true"
            className={styles.footerDivider}
            initial={
              reduceMotion
                ? { opacity: 1, scaleX: 1 }
                : { opacity: 0, scaleX: 0 }
            }
            transition={{
              delay: reduceMotion ? 0 : 0.42,
              duration: reduceMotion ? 0 : 1.35,
              ease: CINEMATIC_EASE,
            }}
            viewport={{ once: true, amount: 0.5 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
          />
        </header>

        <div className={styles.footerBody}>
          <motion.figure
            className={styles.footerPortrait}
            initial={
              reduceMotion
                ? { opacity: 1 }
                : { filter: "blur(7px)", opacity: 0, scale: 0.96, y: 34 }
            }
            transition={{
              delay: reduceMotion ? 0 : 0.14,
              duration: reduceMotion ? 0 : 1.25,
              ease: CINEMATIC_EASE,
            }}
            viewport={{ once: true, amount: 0.32 }}
            whileInView={{
              filter: "blur(0px)",
              opacity: 1,
              scale: 1,
              y: 0,
            }}
          >
            <Image
              alt={t("footer.imageAlt")}
              fill
              sizes="(max-width: 560px) calc(100vw - 40px), (max-width: 900px) 62vw, 34vw"
              src="/us/1.png"
              style={{
                objectFit: "cover",
                objectPosition: "center center",
              }}
            />
          </motion.figure>

          <div className={styles.footerCopy}>
            <p className={styles.footerThankYouTitle}>
              <EditorialReveal delay={0.18}>
                {t("footer.thankYouTitle")}
              </EditorialReveal>
            </p>
            <p className={styles.footerThankYouBody}>
              <EditorialReveal delay={0.34} distance={28}>
                {t("footer.thankYouBody")}
              </EditorialReveal>
            </p>
            <blockquote className={styles.footerVerse}>
              <p>
                <EditorialReveal delay={0.5} distance={26}>
                  <span>{t("footer.verseLine1")}</span>
                  <span>{t("footer.verseLine2")}</span>
                </EditorialReveal>
              </p>
              <cite className={styles.footerVerseReference}>
                <EditorialReveal delay={0.66} distance={18}>
                  {t("footer.verseReference")}
                </EditorialReveal>
              </cite>
            </blockquote>
          </div>
        </div>

        <div className={styles.footerClosing}>
          <motion.div
            aria-hidden="true"
            className={styles.footerDivider}
            initial={
              reduceMotion
                ? { opacity: 1, scaleX: 1 }
                : { opacity: 0, scaleX: 0 }
            }
            transition={{
              delay: reduceMotion ? 0 : 0.2,
              duration: reduceMotion ? 0 : 1.2,
              ease: CINEMATIC_EASE,
            }}
            viewport={{ once: true, amount: 0.6 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
          />
          <p className={styles.footerDate}>
            {format(weddingDate, "d MMMM yyyy", { locale: dateLocale })}
          </p>
          <p className={styles.footerHashtag}>{t("footer.hashtag")}</p>
        </div>
      </motion.div>
    </footer>
  );
}
