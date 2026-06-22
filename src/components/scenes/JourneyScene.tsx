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
  const primaryMediaY = useTransform(scrollYProgress, [0, 1], ["-4%", "6%"]);
  const primaryMediaScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.09]);
  const secondaryMediaY = useTransform(scrollYProgress, [0, 1], ["4%", "-5%"]);
  const secondaryMediaScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1.06, 1.02],
  );

  return (
    <ChapterScene
      id="journey"
      index="02"
      label={t("hero.infoTitle")}
      tone="soft"
    >
      <Box className={styles.journeyStage} ref={stageRef}>
        <motion.div
          className={`${styles.journeyImage} ${styles.journeyImageLead}`}
          initial={
            reduceMotion
              ? { opacity: 1 }
              : { filter: "blur(8px)", opacity: 0, scale: 0.94, y: 54 }
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
          <motion.div
            className={styles.journeyImageInner}
            style={
              reduceMotion
                ? undefined
                : { scale: primaryMediaScale, y: primaryMediaY }
            }
          >
            <Image
              alt="Elegant couple walking hand in hand at golden hour"
              fill
              sizes="(max-width: 560px) calc(100vw - 40px), (max-width: 900px) 68vw, 38vw"
              src="/us/3.png"
              // src="/pic_02.webp"
              style={{
                objectFit: "cover",
                objectPosition: "center center",
              }}
            />
          </motion.div>
        </motion.div>

        <Box className={styles.journeyContent}>
          <Box className={styles.journeyCopy}>
            <p className={styles.journeyMeta} aria-hidden="true">
              <EditorialReveal delay={0.1} distance={18}>
                02
              </EditorialReveal>
            </p>
            <h2>
              <WordReveal delay={0.18}>{t("hero.infoTitle")}</WordReveal>
            </h2>
            <p className={styles.journeyMessage}>
              <EditorialReveal delay={0.46} distance={34}>
                {t("hero.infoText")}
              </EditorialReveal>
            </p>
            <p className={styles.journeyDateline} aria-hidden="true">
              <EditorialReveal delay={0.72} distance={22}>
                2026 {"\u00b7"} OUR STORY
              </EditorialReveal>
            </p>
          </Box>
        </Box>

        <motion.div
          className={`${styles.journeyImage} ${styles.journeyImageSecondary}`}
          initial={
            reduceMotion
              ? { opacity: 1 }
              : { filter: "blur(8px)", opacity: 0, scale: 0.95, y: 46 }
          }
          transition={{
            delay: reduceMotion ? 0 : 0.22,
            duration: reduceMotion ? 0 : 1.35,
            ease: CINEMATIC_EASE,
          }}
          viewport={{ amount: 0.38, once: true }}
          whileInView={{
            filter: "blur(0px)",
            opacity: 1,
            scale: 1,
            y: 0,
          }}
        >
          <Box className={styles.journeyImageFrame}>
            <motion.div
              className={styles.journeyImageInner}
              style={
                reduceMotion
                  ? undefined
                  : { scale: secondaryMediaScale, y: secondaryMediaY }
              }
            >
              {/* <Image
                alt="Couple smiling together in a warm editorial portrait"
                fill
                sizes="(max-width: 560px) 76vw, (max-width: 900px) 54vw, 27vw"
                src="/us/5.png"
                style={{
                  objectFit: "cover",
                  objectPosition: "center center",
                }}
              /> */}
            </motion.div>
          </Box>
        </motion.div>
      </Box>
    </ChapterScene>
  );
}
