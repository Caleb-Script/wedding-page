"use client";

import { format } from "date-fns";
import { de, enUS, it } from "date-fns/locale";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useLocale } from "next-intl";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { HiArrowDown, HiArrowUpRight } from "react-icons/hi2";
import { CINEMATIC_EASE } from "@/components/CinematicMotion";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import styles from "./ArrivalHero.module.css";
import { HERO_MEDIA_READY_EVENT } from "./cinematicEvents";
import { SplitReveal } from "./SplitReveal";
import { Stack } from "@mui/material";

const weddingDate = new Date(2026, 10, 21);

const PARTICLES = [
  [8, 18, 1.2, 16],
  [15, 72, 0.8, 19],
  [20, 40, 1.5, 22],
  [27, 88, 0.7, 17],
  [34, 12, 1, 24],
  [40, 58, 0.6, 18],
  [47, 28, 1.3, 21],
  [54, 82, 0.9, 25],
  [61, 16, 0.7, 20],
  [68, 62, 1.5, 23],
  [74, 36, 0.8, 18],
  [81, 76, 1.1, 21],
  [88, 22, 0.6, 17],
  [93, 54, 1.3, 24],
] as const;

function useCountdown() {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const distance = Math.max(0, weddingDate.getTime() - Date.now());

      setTime({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    updateCountdown();
    const interval = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return time;
}

export default function ArrivalHero() {
  const locale = useLocale();
  const t = useTypedTranslations("wedding");
  const { days, hours, minutes, seconds } = useCountdown();
  const [videoReady, setVideoReady] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  const dateLocale = locale === "de" ? de : locale === "it" ? it : enUS;
  const countdown = [
    { label: t("hero.countdown.days"), value: days },
    { label: t("hero.countdown.hours"), value: hours },
    { label: t("hero.countdown.minutes"), value: minutes },
    { label: t("hero.countdown.seconds"), value: seconds },
  ];

  const beginJourney = () => {
    document
      .getElementById("journey")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const announceMediaReady = () => {
    window.dispatchEvent(new Event(HERO_MEDIA_READY_EVENT));
  };

  return (
    <div className={styles.root}>
      <section
        aria-label={t("hero.backgroundAlt")}
        className={styles.hero}
        id="hero"
        ref={heroRef}
      >
        <motion.div
          className={styles.videoLayer}
          style={reduceMotion ? undefined : { scale: mediaScale, y: mediaY }}
        >
          <video
            autoPlay
            className={`${styles.video} ${videoReady ? styles.videoReady : ""}`}
            disablePictureInPicture
            loop
            muted
            onCanPlay={(event) => {
              setVideoReady(true);
              announceMediaReady();
              event.currentTarget.play().catch(() => undefined);
            }}
            onError={announceMediaReady}
            playsInline
            poster="/hero-bg.jpg"
            preload="auto"
          >
            <source
              media="(min-width: 769px)"
              src="/video/hero-cinematic-1080.webm"
              type="video/webm"
            />
            <source src="/video/hero-cinematic-480.webm" type="video/webm" />
          </video>
        </motion.div>

        <div className={styles.cinematicOverlay} />

        <div className={styles.particles} aria-hidden="true">
          {PARTICLES.map(([left, top, size, duration], index) => (
            <span
              key={`${left}-${top}`}
              style={
                {
                  "--delay": `${index * -1.7}s`,
                  "--duration": `${duration}s`,
                  "--left": `${left}%`,
                  "--size": `${size}px`,
                  "--top": `${top}%`,
                } as CSSProperties
              }
            />
          ))}
        </div>

        <div className={styles.lightEffects} aria-hidden="true">
          <span className={styles.lightBeam} />
          <span className={styles.lightBloom} />
          <span className={styles.lightSweep} />
        </div>

        <div className={styles.topRail}>
          <div className={styles.sceneChip}>
            <span className={styles.liveDot} />
            <span>{t("hero.scene")}</span>
            <span className={styles.sceneRule} />
            <span className={styles.sceneChipDate}>21 · 11 · 26</span>
          </div>

          <LanguageSwitcher />
        </div>

        <div className={styles.credit}>
          <span>Film / Alexis Markwick</span>
          <a
            href="https://creativecommons.org/licenses/by-sa/3.0/"
            rel="noreferrer"
            target="_blank"
          >
            CC BY-SA 3.0
          </a>
        </div>

        <motion.div
          className={styles.content}
          style={
            reduceMotion ? undefined : { opacity: contentOpacity, y: contentY }
          }
        >
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className={styles.eyebrow}
            initial={{ opacity: 0, y: 18 }}
            transition={{ delay: 0.4, duration: 1.1 }}
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className={styles.titleWrap}
            initial={{ opacity: 0, y: 18 }}
            transition={{
              delay: 0.65,
              duration: 1.4,
              ease: CINEMATIC_EASE,
            }}
          >
            <h1 className={styles.title}>
              <Stack 
              direction="column" 
              spacing={0.5} 
              sx={{ 
                alignItems:"center",
                justifyContent: "center"
                }}
                >
             <SplitReveal direction="down" delay={3}>Caleb</SplitReveal>
              <span className={styles.ampersand}>&</span>
              <SplitReveal direction="up" delay={3.5}>Rachel</SplitReveal>
              </Stack>
            </h1>
          </motion.div>

          <motion.p
            animate={{ opacity: 1 }}
            className={styles.quote}
            initial={{ opacity: 0 }}
            transition={{ delay: 1.2, duration: 1.2 }}
          >
            {t("hero.quote")}
          </motion.p>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className={styles.dateLine}
            initial={{ opacity: 0, y: 18 }}
            transition={{ delay: 1.35, duration: 1 }}
          >
            <span />
            <time dateTime="2026-11-21">
              {format(weddingDate, "d MMMM yyyy", { locale: dateLocale })}
            </time>
            <span />
          </motion.div>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className={styles.glassPanel}
            initial={{ opacity: 0, y: 24 }}
            transition={{ delay: 1.55, duration: 1 }}
          >
            <div className={styles.countdown}>
              {countdown.map((item) => (
                <div className={styles.countdownItem} key={item.label}>
                  <strong>{String(item.value).padStart(2, "0")}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            <button
              className={styles.journeyButton}
              onClick={beginJourney}
              type="button"
            >
              <span>{t("hero.cta")}</span>
              <HiArrowUpRight />
            </button>
          </motion.div>
        </motion.div>

        <button
          aria-label={t("hero.scroll")}
          className={styles.scrollCue}
          onClick={beginJourney}
          type="button"
        >
          <span>{t("hero.scroll")}</span>
          <span className={styles.scrollLine} />
          <HiArrowDown />
        </button>
      </section>
    </div>
  );
}
