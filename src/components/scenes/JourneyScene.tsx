"use client";

import { Box } from "@mui/material";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import {
  CINEMATIC_EASE,
  EditorialReveal,
  WordReveal,
} from "@/components/CinematicMotion";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import styles from "../CinematicScenes.module.css";
import ChapterScene from "./ChapterScene";

const PILLAR_KEYS = ["twoVenues", "weSayYes", "thenCelebrate"] as const;

export default function JourneyScene() {
  const t = useTypedTranslations("wedding");
  const reduceMotion = useReducedMotion();

  return (
    <ChapterScene
      id="journey"
      index="02"
      label={t("journey.title")}
      tone="soft"
    >
      <Box className={styles.journeyStage}>
        <Box className={styles.journeyContent}>
          <Box className={styles.journeyCopy}>
            <p className={styles.journeyEyebrow}>
              <EditorialReveal delay={0.16} distance={18}>
                {t("journey.eyebrow")}
              </EditorialReveal>
            </p>
            <h2>
              <WordReveal delay={0.24}>{t("journey.title")}</WordReveal>
            </h2>
            <p className={styles.journeyMessage}>
              <EditorialReveal delay={0.46} distance={34}>
                {t("hero.infoText")}
              </EditorialReveal>
            </p>
          </Box>
        </Box>

        <motion.div
          className={`${styles.journeyImage} ${styles.journeyImageLead}`}
          initial={
            reduceMotion
              ? { opacity: 1 }
              : { filter: "blur(8px)", opacity: 0, scale: 0.94, y: 40 }
          }
          transition={{
            duration: reduceMotion ? 0 : 1.45,
            ease: CINEMATIC_EASE,
          }}
          viewport={{ amount: 0.42, once: true }}
          whileInView={{
            filter: "blur(0px)",
            opacity: 1,
            scale: 1,
            y: 0,
          }}
        >
          <Image
            alt="Elegant couple walking hand in hand at golden hour"
            className={styles.journeyImageDefault}
            fill
            sizes="(max-width: 560px) calc(100vw - 40px), (max-width: 900px) 46vw, 26vw"
            src="/us/3.png"
            style={{
              objectFit: "cover",
              objectPosition: "center center",
            }}
          />

          <Image
            alt=""
            aria-hidden="true"
            className={styles.journeyImageHover}
            fill
            sizes="(max-width: 560px) calc(100vw - 40px), (max-width: 900px) 46vw, 26vw"
            src="/us/3.5.png"
            style={{
              objectFit: "cover",
              objectPosition: "center center",
            }}
          />
        </motion.div>

        <Box className={styles.journeyPillars}>
          {PILLAR_KEYS.map((key, index) => (
            <Box className={styles.journeyPillar} key={key}>
              <span className={styles.journeyRouteIndex} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className={styles.journeyPillarTitle}>
                <EditorialReveal delay={0.6 + index * 0.12} distance={10}>
                  {t(`journey.pillars.${key}.title`)}
                </EditorialReveal>
              </p>
              <p className={styles.journeyPillarText}>
                <EditorialReveal delay={0.72 + index * 0.12} distance={10}>
                  {t(`journey.pillars.${key}.text`)}
                </EditorialReveal>
              </p>
            </Box>
          ))}
        </Box>

        <Box className={styles.journeyFacts}>
          <span className={styles.journeyFact}>
            <b className={styles.journeyFactLabel}>
              {t("journey.facts.dateLabel")}
            </b>
            <span className={styles.journeyFactValue}>
              {t("journey.facts.date")}
            </span>
          </span>
          <span className={styles.journeyFact}>
            <b className={styles.journeyFactLabel}>
              {t("journey.facts.ceremonyLabel")}
            </b>
            <span className={styles.journeyFactValue}>
              {t("locations.ceremony.venue")}
            </span>
          </span>
          <span className={styles.journeyFact}>
            <b className={styles.journeyFactLabel}>
              {t("journey.facts.receptionLabel")}
            </b>
            <span className={styles.journeyFactValue}>
              {t("locations.reception.venue")}
            </span>
          </span>
          <span className={styles.journeyFact}>
            <b className={styles.journeyFactLabel}>
              {t("journey.facts.hashtagLabel")}
            </b>
            <span className={styles.journeyFactValue}>
              {t("footer.hashtag")}
            </span>
          </span>
        </Box>
      </Box>
    </ChapterScene>
  );
}
