"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import useActiveChapter from "@/hooks/useActiveChapter";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import FloatingChapterBackdrop from "./FloatingChapterBackdrop";
import FloatingChapterButton from "./FloatingChapterButton";
import styles from "./FloatingChapterMenu.module.css";

type ChapterId =
  | "arrival"
  | "journey"
  | "wedding-day"
  | "destination"
  | "guest-guide"
  | "rsvp"
  | "forever";

type Chapter = {
  id: ChapterId;
  index: string;
  label: string;
};

type Position = {
  x: number;
  y: number;
};

const DESKTOP_POSITIONS: Record<ChapterId, Position> = {
  arrival: { x: -42, y: -32 },
  journey: { x: -118, y: -88 },
  "wedding-day": { x: -184, y: -145 },
  destination: { x: -96, y: -204 },
  "guest-guide": { x: -224, y: -264 },
  rsvp: { x: -134, y: -330 },
  forever: { x: -30, y: -386 },
};

const MOBILE_STEP = 56;

const CHAPTER_IDS = [
  "arrival",
  "journey",
  "wedding-day",
  "destination",
  "guest-guide",
  "rsvp",
  "forever",
] as const satisfies readonly ChapterId[];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => {
      mediaQuery.removeEventListener("change", update);
    };
  }, []);

  return isMobile;
}

export default function FloatingChapterMenu() {
  const t = useTypedTranslations("wedding");
  const reduceMotion = Boolean(useReducedMotion());
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const chapters = useMemo<Chapter[]>(
    () => [
      {
        id: "arrival",
        index: "01",
        label: t("navigation.chapters.arrival"),
      },
      {
        id: "journey",
        index: "02",
        label: t("navigation.chapters.journey"),
      },
      {
        id: "wedding-day",
        index: "03",
        label: t("navigation.chapters.weddingDay"),
      },
      {
        id: "destination",
        index: "04",
        label: t("navigation.chapters.destination"),
      },
      {
        id: "guest-guide",
        index: "05",
        label: t("navigation.chapters.guestGuide"),
      },
      {
        id: "rsvp",
        index: "06",
        label: t("navigation.chapters.rsvp"),
      },
      {
        id: "forever",
        index: "07",
        label: t("navigation.chapters.forever"),
      },
    ],
    [t],
  );

  const activeChapter = useActiveChapter(CHAPTER_IDS);
  const renderedChapters = isMobile ? [...chapters].reverse() : chapters;

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  const scrollToChapter = useCallback(
    (chapterId: ChapterId) => {
      const section = document.getElementById(chapterId);

      if (section) {
        section.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "start",
        });
      }

      setIsOpen(false);
    },
    [reduceMotion],
  );

  const getPosition = (chapter: Chapter, order: number): Position => {
    if (!isMobile) return DESKTOP_POSITIONS[chapter.id];

    return {
      x: 0,
      y: -(renderedChapters.length - order) * MOBILE_STEP,
    };
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && <FloatingChapterBackdrop onClose={() => setIsOpen(false)} />}
      </AnimatePresence>

      <nav aria-label={t("navigation.menu")} className={styles.root}>
        <div className={styles.constellation}>
          <AnimatePresence>
            {isOpen &&
              renderedChapters.map((chapter, order) => (
                <FloatingChapterButton
                  index={chapter.index}
                  isActive={activeChapter === chapter.id}
                  key={chapter.id}
                  label={chapter.label}
                  onSelect={() => scrollToChapter(chapter.id)}
                  order={order}
                  position={getPosition(chapter, order)}
                  reduceMotion={reduceMotion}
                />
              ))}
          </AnimatePresence>

          <motion.button
            aria-expanded={isOpen}
            aria-label={isOpen ? t("navigation.close") : t("navigation.open")}
            className={styles.centerButton}
            onClick={() => setIsOpen((current) => !current)}
            type="button"
            whileHover={reduceMotion ? undefined : { scale: 1.06 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          >
            <span aria-hidden="true" className={styles.centerGlyph} />
          </motion.button>
        </div>
      </nav>
    </>
  );
}
