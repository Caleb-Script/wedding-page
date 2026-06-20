"use client";

import type { Transition } from "framer-motion";
import { motion } from "framer-motion";
import styles from "./FloatingChapterMenu.module.css";

type FloatingChapterButtonProps = {
  index: string;
  isActive: boolean;
  label: string;
  onSelect: () => void;
  order: number;
  position: {
    x: number;
    y: number;
  };
  reduceMotion: boolean;
};

export default function FloatingChapterButton({
  index,
  isActive,
  label,
  onSelect,
  order,
  position,
  reduceMotion,
}: FloatingChapterButtonProps) {
  const transition: Transition = reduceMotion
    ? { duration: 0.01 }
    : {
        damping: 23,
        delay: order * 0.045,
        mass: 0.75,
        stiffness: 260,
        type: "spring",
      };

  return (
    <motion.button
      animate={{
        opacity: 1,
        scale: 1,
        x: position.x,
        y: position.y,
      }}
      aria-current={isActive ? "true" : undefined}
      aria-label={`${index} ${label}`}
      className={`${styles.chapterButton} ${isActive ? styles.active : ""}`}
      exit={{
        opacity: 0,
        scale: 0.72,
        x: 0,
        y: 0,
      }}
      initial={{
        opacity: 0,
        scale: 0.72,
        x: 0,
        y: 0,
      }}
      onClick={onSelect}
      transition={transition}
      type="button"
      whileHover={reduceMotion ? undefined : { scale: 1.08 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
    >
      <span className={styles.chapterLabel}>{label}</span>
      <span className={styles.chapterOrb}>
        <span>{index}</span>
      </span>
    </motion.button>
  );
}
