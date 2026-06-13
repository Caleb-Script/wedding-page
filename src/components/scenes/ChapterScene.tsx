"use client";

import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";
import styles from "../CinematicScenes.module.css";

type ChapterSceneProps = {
  children: ReactNode;
  id: string;
  index: string;
  label: string;
  tone?: "deep" | "soft" | "warm";
};

const toneClasses = {
  deep: styles.chapterDeep,
  soft: styles.chapterSoft,
  warm: styles.chapterWarm,
} as const;

export default function ChapterScene({
  children,
  id,
  index,
  label,
  tone = "deep",
}: ChapterSceneProps) {
  return (
    <Box
      className={`${styles.chapter} ${toneClasses[tone]}`}
      component="section"
      data-cinematic-scene
      id={id}
    >
      <Box aria-hidden="true" className={styles.chapterRail}>
        <Typography component="span">{index}</Typography>
        <Box className={styles.chapterRailLine} />
        <Typography component="span">{label}</Typography>
      </Box>
      {children}
    </Box>
  );
}
