"use client";

import { Box } from "@mui/material";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import {
  CINEMATIC_EASE,
  EditorialReveal,
  WordReveal,
} from "@/components/CinematicMotion";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import styles from "../CinematicScenes.module.css";
import ChapterScene from "./ChapterScene";

export default function JourneyScene() {
  const t = useTypedTranslations("wedding");
  const stageRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "end start"],
  });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["-5%", "7%"]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1.03, 1.1]);

  return (
    <ChapterScene
      id="journey"
      index="02"
      label={t("hero.infoTitle")}
      tone="soft"
    >
      <Box className={styles.journeyStage} ref={stageRef}>
        <Box className={styles.journeyIndex} aria-hidden="true">
          02
        </Box>

        <motion.div
          className={styles.journeyMedia}
          initial={
            reduceMotion
              ? { opacity: 1 }
              : { filter: "blur(5px)", opacity: 0, scale: 0.96, y: 42 }
          }
          transition={{
            duration: reduceMotion ? 0 : 1.25,
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
          <motion.div
            className={styles.journeyMediaInner}
            style={reduceMotion ? undefined : { scale: mediaScale, y: mediaY }}
          >
            <Image
              alt="Caleb and Rachel"
              fill
              sizes="(max-width: 900px) calc(100vw - 40px), 44vw"
              src="/treppe1.JPG"
              style={{
                objectFit: "cover",
                objectPosition: "center center",
              }}
            />
          </motion.div>
          <Box className={styles.journeyMediaOverlay} aria-hidden="true">
            <span>02</span>
            <span>{t("hero.infoTitle")}</span>
          </Box>
        </motion.div>

        <Box className={styles.journeyContent}>
          <Box className={styles.journeyMeta} aria-hidden="true">
            <span>02</span>
            <span>{t("hero.infoTitle")}</span>
          </Box>
          <Box className={styles.journeyCopy}>
            <h2>
              <WordReveal>{t("hero.infoTitle")}</WordReveal>
            </h2>
            <p className={styles.journeyMessage}>
              <EditorialReveal delay={0.28}>
                {t("hero.infoText")}
              </EditorialReveal>
            </p>
          </Box>
        </Box>
      </Box>
    </ChapterScene>
  );
}
