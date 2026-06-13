"use client";

import { Box } from "@mui/material";
import { EditorialReveal, WordReveal } from "@/components/CinematicMotion";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import styles from "../CinematicScenes.module.css";
import ChapterScene from "./ChapterScene";

export default function JourneyScene() {
  const t = useTypedTranslations("wedding");

  return (
    <ChapterScene
      id="journey"
      index="02"
      label={t("hero.infoTitle")}
      tone="soft"
    >
      <Box className={styles.journeyStage}>
        <Box className={styles.journeyIndex} aria-hidden="true">
          02
        </Box>
        <Box className={styles.journeyCopy}>
          <h2>
            <WordReveal>{t("hero.infoTitle")}</WordReveal>
          </h2>
          <p className={styles.journeyMessage}>
            <EditorialReveal delay={0.28}>{t("hero.infoText")}</EditorialReveal>
          </p>
        </Box>
      </Box>
    </ChapterScene>
  );
}
