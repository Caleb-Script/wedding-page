"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import {
  HiOutlineBuildingOffice,
  HiOutlineCake,
  HiOutlineCamera,
  HiOutlineHeart,
  HiOutlineMusicalNote,
} from "react-icons/hi2";
import { WordReveal } from "@/components/CinematicMotion";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import styles from "./CinematicScenes.module.css";
import SceneHeader from "./SceneHeader";

type WeddingDayTimelineProps = {
  embedded?: boolean;
};

export default function WeddingDayTimeline({
  embedded = false,
}: WeddingDayTimelineProps) {
  const t = useTypedTranslations("wedding");
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeEvent, setActiveEvent] = useState<string | null>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 65%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });

  const events = [
    {
      id: "ceremony",
      time: "12:30",
      title: t("timeline.events.ceremony"),
      icon: HiOutlineHeart,
      image: "/gallery-1.jpg",
    },
    {
      id: "photos",
      time: "15:30",
      title: t("timeline.events.photos"),
      icon: HiOutlineCamera,
      image: "/gallery-2.jpg",
    },
    {
      id: "arrival",
      time: "17:30",
      title: t("timeline.events.arrival"),
      icon: HiOutlineBuildingOffice,
      image: "/gallery-3.jpg",
    },
    {
      id: "dinner",
      time: "17:30",
      title: t("timeline.events.dinner"),
      icon: HiOutlineCake,
      image: "/gallery-4.jpg",
    },
    {
      id: "party",
      time: "22:00",
      title: t("timeline.events.party"),
      icon: HiOutlineMusicalNote,
      image: "/hero-bg.jpg",
    },
  ] as const;

  const Root = embedded ? "div" : "section";

  return (
    <Root
      className={`${embedded ? styles.chapterBeat : `${styles.scene} ${styles.sceneDeep}`} ${styles.timelineScene}`}
      id="timeline"
    >
      <div className={styles.inner}>
        <SceneHeader
          eyebrow={t("timeline.subtitle")}
          index="04"
          title={t("timeline.title")}
        />

        <div className={styles.timeline} ref={timelineRef}>
          <div className={styles.timelineRail} />
          <motion.div className={styles.timelineProgress} style={{ scaleY }} />

          {events.map((event, index) => {
            const Icon = event.icon;
            const isActive = activeEvent === event.id;

            return (
              <motion.article
                className={styles.timelineEvent}
                initial={{ opacity: 0, y: 28 }}
                key={`${event.time}-${event.title}`}
                transition={{ duration: 0.7, delay: index * 0.06 }}
                viewport={{ once: true, amount: 0.45 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <button
                  aria-label={`${event.title}. ${isActive ? t("timeline.close") : t("timeline.open")}`}
                  aria-pressed={isActive}
                  className={`${styles.timelineCard} ${isActive ? styles.timelineCardActive : ""}`}
                  onClick={() => setActiveEvent(isActive ? null : event.id)}
                  type="button"
                >
                  <span className={styles.timelineCardInner}>
                    <span className={styles.timelineCardFront}>
                      <span className={styles.timelineCardHint}>
                        {t("timeline.open")}
                      </span>
                      <time className={styles.timelineTime}>{event.time}</time>
                      <span className={styles.timelineTitle}>
                        <WordReveal delay={index * 0.04}>
                          {event.title}
                        </WordReveal>
                      </span>
                      <span className={styles.timelineCardIcon}>
                        <Icon />
                      </span>
                    </span>

                    <span className={styles.timelineCardBack}>
                      <span className={styles.timelineCardMedia}>
                        <Image
                          alt={event.title}
                          fill
                          sizes="(max-width: 900px) 82vw, 380px"
                          src={event.image}
                        />
                      </span>
                      <span className={styles.timelineBackContent}>
                        <span className={styles.timelineBackInfo}>
                          {t(`timeline.details.${event.id}.info`)}
                        </span>
                        <strong className={styles.timelineBackTitle}>
                          {event.title}
                        </strong>
                        <span className={styles.timelineBackDescription}>
                          {t(`timeline.details.${event.id}.description`)}
                        </span>
                        <em className={styles.timelineBackMessage}>
                          {t(`timeline.details.${event.id}.message`)}
                        </em>
                        <span className={styles.timelineClose}>
                          {t("timeline.close")}
                        </span>
                      </span>
                    </span>
                  </span>
                </button>
                <div className={styles.timelineNode}>
                  <Icon />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </Root>
  );
}
