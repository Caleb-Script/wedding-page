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
  const quoteReference = t("quote.reference");
  const mobileQuoteReference = quoteReference.replace(/^[—-]\s*/, "");

  const Root = embedded ? "div" : "section";

  return (
    <Root
      className={`${embedded ? styles.chapterBeat : `${styles.scene} ${styles.sceneSoft}`} ${styles.quoteScene}`}
      id="quote"
    >
      <div className={styles.inner} ref={sectionRef}>
        <span aria-hidden="true" className={styles.quoteHalo} />

        <div className={styles.quoteDesktop}>
          <div className={styles.quoteFrame}>
            <div aria-hidden="true" className={styles.quoteImageWrapper}>
              <Image
                alt=""
                className={styles.quoteImage}
                fill
                sizes="(max-width: 900px) 88vw, 1280px"
                src="/us/6.png"
              />
              <span className={styles.quoteOverlay} />
            </div>

            <motion.blockquote
              className={styles.quoteStage}
              initial={{ opacity: 0, scale: 0.97 }}
              style={reduceMotion ? undefined : { y: quoteY }}
              transition={{ duration: 1.2, ease: CINEMATIC_EASE }}
              viewport={{ once: true, amount: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
            >
              <div className={styles.quoteNames}>
                <SplitReveal
                  className={styles.quoteName}
                  delay={0.08}
                  direction="left"
                  distance="48%"
                  effect="slideIn"
                >
                  Caleb
                </SplitReveal>
                <SplitReveal
                  className={styles.quoteName}
                  delay={0.14}
                  direction="right"
                  distance="48%"
                  effect="slideIn"
                >
                  Rachel
                </SplitReveal>
              </div>

              <span className={styles.quoteMark} aria-hidden="true">
                “
              </span>

              <p className={styles.quoteText}>
                {quoteLines.map((line, index) => (
                  <SplitReveal
                    className={styles.quoteLine}
                    delay={0.3 + index * 0.22}
                    key={line}
                  >
                    {line}
                  </SplitReveal>
                ))}
              </p>
              <cite className={styles.quoteReference}>
                <SplitReveal delay={0.9}>{quoteReference}</SplitReveal>
              </cite>
            </motion.blockquote>
          </div>
        </div>

        <motion.div
          className={styles.quoteMobile}
          initial={{ opacity: 0, scale: 0.97 }}
          style={reduceMotion ? undefined : { y: quoteY }}
          transition={{ duration: 1.2, ease: CINEMATIC_EASE }}
          viewport={{ once: true, amount: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
        >
          <div className={styles.quoteMobileNames}>
            <SplitReveal
              className={styles.quoteMobileName}
              delay={0.08}
              direction="left"
              distance="36%"
              effect="slideIn"
            >
              Caleb
            </SplitReveal>
            <SplitReveal
              className={styles.quoteMobileName}
              delay={0.14}
              direction="right"
              distance="36%"
              effect="slideIn"
            >
              Rachel
            </SplitReveal>
          </div>

          <blockquote className={styles.quoteFrameMobile}>
            <div aria-hidden="true" className={styles.quoteMobileImageLayer}>
              <Image
                alt=""
                className={styles.quoteImageMobile}
                fill
                sizes="(max-width: 700px) 92vw"
                src="/us/6.png"
              />
            </div>

            <div className={styles.quoteTextScrim}>
              <p className={styles.quoteMobileText}>
                {quoteLines.map((line, index) => (
                  <SplitReveal
                    className={styles.quoteMobileLine}
                    delay={0.24 + index * 0.2}
                    key={line}
                  >
                    {line}
                  </SplitReveal>
                ))}
              </p>
              <cite className={styles.quoteMobileReference}>
                <SplitReveal
                  className={styles.quoteMobileReferenceText}
                  delay={0.88}
                >
                  {mobileQuoteReference}
                </SplitReveal>
              </cite>
            </div>
          </blockquote>
        </motion.div>
      </div>
    </Root>
  );
}
