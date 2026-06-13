"use client";

import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { CINEMATIC_EASE, WordReveal } from "./CinematicMotion";
import styles from "./CinematicScenes.module.css";

type SceneHeaderProps = {
  eyebrow: string;
  index: string;
  title: string;
};

export default function SceneHeader({
  eyebrow,
  index,
  title,
}: SceneHeaderProps) {
  return (
    <Box component="header" className={styles.sceneHeader}>
      <motion.div
        aria-hidden="true"
        className={styles.sceneIndex}
        initial={{ opacity: 0, x: -18 }}
        transition={{ duration: 0.9, ease: CINEMATIC_EASE }}
        viewport={{ amount: 0.5, once: true }}
        whileInView={{ opacity: 1, x: 0 }}
      >
        {index}
      </motion.div>
      <Box className={styles.sceneTitles}>
        <motion.p
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.75, ease: CINEMATIC_EASE }}
          viewport={{ amount: 0.5, once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {eyebrow}
        </motion.p>
        <h2 className={styles.heading}>
          <WordReveal delay={0.08}>{title}</WordReveal>
        </h2>
        <motion.div
          className={styles.sectionRule}
          initial={{ scaleX: 0 }}
          transition={{ delay: 0.28, duration: 1.1, ease: CINEMATIC_EASE }}
          viewport={{ amount: 0.5, once: true }}
          whileInView={{ scaleX: 1 }}
        />
      </Box>
    </Box>
  );
}
