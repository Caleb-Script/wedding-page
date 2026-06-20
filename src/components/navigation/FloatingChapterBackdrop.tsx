"use client";

import { motion } from "framer-motion";
import styles from "./FloatingChapterMenu.module.css";

type FloatingChapterBackdropProps = {
  onClose: () => void;
};

export default function FloatingChapterBackdrop({
  onClose,
}: FloatingChapterBackdropProps) {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      aria-hidden="true"
      className={styles.backdrop}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      onClick={onClose}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}
