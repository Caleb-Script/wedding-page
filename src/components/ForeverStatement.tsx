"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { CINEMATIC_EASE } from "@/components/CinematicMotion";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import styles from "./CinematicScenes.module.css";
import { SplitReveal } from "./SplitReveal";

type ForeverStatementProps = {
  embedded?: boolean;
};

export default function ForeverStatement({
  embedded = false,
}: ForeverStatementProps) {
  const t = useTypedTranslations("wedding");
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const quoteY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const haloScale = useTransform(scrollYProgress, [0, 1], [0.82, 1.18]);

  const Root = embedded ? "div" : "section";

  return (
    <Root
      className={`${embedded ? styles.chapterBeat : `${styles.scene} ${styles.sceneSoft}`} ${styles.quoteScene}`}
      id="quote"
    >
      <motion.div
        aria-hidden="true"
        className={styles.quoteHalo}
        style={reduceMotion ? undefined : { scale: haloScale }}
      />
      <div className={styles.inner} ref={sectionRef}>
        <motion.blockquote
          className={styles.quoteStage}
          initial={{ opacity: 0, scale: 0.97 }}
          style={reduceMotion ? undefined : { y: quoteY }}
          transition={{ duration: 1.2, ease: CINEMATIC_EASE }}
          viewport={{ once: true, amount: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
        >
          <span className={styles.quoteMark} aria-hidden="true">
            “
          </span>
          <p className={styles.quoteText}>
            <SplitReveal>{t("quote.line1")}</SplitReveal>
            <br />
            <SplitReveal delay={0.3}>{t("quote.line2")}</SplitReveal>
          </p>
        </motion.blockquote>
      </div>
    </Root>
  );
}
