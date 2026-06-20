"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HiArrowUpRight } from "react-icons/hi2";
import {
  CINEMATIC_EASE,
  EditorialReveal,
  WordReveal,
} from "@/components/CinematicMotion";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import styles from "./CinematicScenes.module.css";

const EVENT_ID =
  process.env.NEXT_PUBLIC_EVENT_ID || "6d650ee6-8ed0-4694-afd4-71871c37683a";

type RSVPInvitationProps = {
  embedded?: boolean;
};

function setWeddingThemePreference() {
  const sharedDomain = window.location.hostname.endsWith(".omnixys.com")
    ? "; domain=.omnixys.com; secure"
    : "";

  // biome-ignore lint/suspicious/noDocumentCookie: cross-subdomain one-shot theme bridge
  document.cookie = `theme=wedding; path=/; max-age=300; SameSite=Lax${sharedDomain}`;
}

export default function RSVPInvitation({
  embedded = false,
}: RSVPInvitationProps) {
  const t = useTypedTranslations("wedding");
  const Root = embedded ? "div" : "section";

  return (
    <Root
      className={
        embedded ? styles.chapterBeat : `${styles.scene} ${styles.sceneDeep}`
      }
      id={embedded ? undefined : "rsvp"}
    >
      <div className={styles.inner}>
        <motion.div
          className={styles.rsvpStage}
          initial={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1, ease: CINEMATIC_EASE }}
          viewport={{ once: true, amount: 0.35 }}
          whileInView={{ opacity: 1, scale: 1 }}
        >
          <div className={styles.rsvpContent}>
            <p className={styles.eyebrow}>
              <EditorialReveal>{t("rsvp.subtitle")}</EditorialReveal>
            </p>
            <h2 className={styles.rsvpTitle}>
              <WordReveal delay={0.12}>{t("rsvp.title")}</WordReveal>
            </h2>
            <p className={styles.rsvpQuote}>
              <EditorialReveal delay={0.28}>{t("rsvp.quote")}</EditorialReveal>
            </p>
            <Link
              className={styles.primaryAction}
              href={`https://checkpoint.omnixys.com/rsvp?eventId=${EVENT_ID}&theme=wedding`}
              onClick={setWeddingThemePreference}
            >
              <span>{t("rsvp.button")}</span>
              <HiArrowUpRight />
            </Link>
          </div>
        </motion.div>
      </div>
    </Root>
  );
}
