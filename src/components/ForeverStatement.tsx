"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
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
  const quoteLines = [t("quote.line1"), t("quote.line2"), t("quote.line3")];

  const Root = embedded ? "div" : "section";

  return (
    <Root
      className={`${embedded ? styles.chapterBeat : `${styles.scene} ${styles.sceneSoft}`} ${styles.quoteScene}`}
      id="quote"
    >
      <div className={styles.inner} ref={sectionRef}>
        <motion.blockquote
          className={styles.quoteStage}
          initial={{ opacity: 0, scale: 0.97 }}
          style={reduceMotion ? undefined : { y: quoteY }}
          transition={{ duration: 1.2, ease: CINEMATIC_EASE }}
          viewport={{ once: true, amount: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
        >
          <div aria-hidden="true" className={styles.quoteImageLayer}>
            <Image
              alt=""
              className={styles.quoteImage}
              fill
              sizes="100vw"
              src="/us/7.png"
            />
            <span className={styles.quoteVignette} />
          </div>

          <span className={styles.quoteMark} aria-hidden="true">
            “
          </span>

          <p className={styles.quoteText}>
            {quoteLines.map((line, index) => (
              <SplitReveal
                className={styles.quoteLine}
                delay={index * 0.22}
                key={line}
              >
                {line}
              </SplitReveal>
            ))}
          </p>
          <cite className={styles.quoteReference}>
            <SplitReveal delay={0.72}>{t("quote.reference")}</SplitReveal>
          </cite>
        </motion.blockquote>
      </div>
    </Root>
  );
}
