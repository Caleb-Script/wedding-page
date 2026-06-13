"use client";

import { motion } from "framer-motion";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import styles from "./CinematicScenes.module.css";

export default function QuoteSection() {
  const t = useTypedTranslations("wedding");

  return (
    <section className={`${styles.scene} ${styles.sceneSoft}`} id="quote">
      <div className={styles.inner}>
        <motion.blockquote
          className={styles.quoteStage}
          initial={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true, amount: 0.5 }}
          whileInView={{ opacity: 1 }}
        >
          <span className={styles.quoteMark} aria-hidden="true">
            “
          </span>
          <p className={styles.quoteText}>
            {t("quote.line1")}
            <br />
            {t("quote.line2")}
          </p>
        </motion.blockquote>
      </div>
    </section>
  );
}
