"use client";

import { Box, Typography } from "@mui/material";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import type { ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";
import CinematicLoader from "./CinematicLoader";
import { CINEMATIC_EASE } from "./CinematicMotion";
import { HERO_MEDIA_READY_EVENT } from "./cinematicEvents";

const MotionBox = motion.create(Box);

const SCENE_IDS = [
  "arrival",
  "journey",
  "wedding-day",
  "destination",
  "guest-guide",
  "response",
  "forever",
] as const;

type CinematicExperienceProps = {
  children: ReactNode;
};

export default function CinematicExperience({
  children,
}: CinematicExperienceProps) {
  const [activeScene, setActiveScene] = useState(0);
  const [heroMediaReady, setHeroMediaReady] = useState(false);
  const [loaderComplete, setLoaderComplete] = useState(false);
  const reduceMotion = useReducedMotion();
  const ready = heroMediaReady && loaderComplete;
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    damping: 28,
    mass: 0.2,
    stiffness: 110,
  });
  const completeLoader = useCallback(() => setLoaderComplete(true), []);

  useEffect(() => {
    const markReady = () => setHeroMediaReady(true);
    window.addEventListener(HERO_MEDIA_READY_EVENT, markReady);
    const fallback = window.setTimeout(markReady, reduceMotion ? 1200 : 3000);

    return () => {
      window.removeEventListener(HERO_MEDIA_READY_EVENT, markReady);
      window.clearTimeout(fallback);
    };
  }, [reduceMotion]);

  useEffect(() => {
    document.body.classList.toggle("experience-loading", !ready);
    return () => {
      document.body.classList.remove("experience-loading");
    };
  }, [ready]);

  useEffect(() => {
    if (!ready) return;

    const sections = SCENE_IDS.map((id) => document.getElementById(id)).filter(
      (section): section is HTMLElement => Boolean(section),
    );
    let frame = 0;

    const updateActiveScene = () => {
      const anchor = window.innerHeight * 0.45;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= anchor && rect.bottom >= anchor) {
          closestIndex = index;
          closestDistance = 0;
          return;
        }

        const distance = Math.min(
          Math.abs(rect.top - anchor),
          Math.abs(rect.bottom - anchor),
        );
        if (distance < closestDistance) {
          closestIndex = index;
          closestDistance = distance;
        }
      });

      setActiveScene(closestIndex);
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateActiveScene);
    };

    updateActiveScene();
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("scroll", requestUpdate, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("scroll", requestUpdate);
    };
  }, [ready]);

  return (
    <MotionConfig reducedMotion="user">
      <Box
        component="main"
        sx={{
          bgcolor: "#050506",
          color: "#f1ece2",
          minHeight: "100vh",
          minWidth: 0,
          position: "relative",
          width: "100%",
        }}
      >
        <AnimatePresence>
          {!ready && (
            <motion.div
              exit={{ opacity: 0 }}
              key="cinematic-loader"
              transition={{ duration: 0.8, ease: CINEMATIC_EASE }}
            >
              <CinematicLoader onComplete={completeLoader} />
            </motion.div>
          )}
        </AnimatePresence>

        <MotionBox
          animate={{ opacity: ready ? 1 : 0 }}
          aria-hidden={!ready}
          inert={!ready}
          initial={{ opacity: 0 }}
          sx={{
            minWidth: 0,
            pointerEvents: ready ? "auto" : "none",
            width: "100%",
          }}
          transition={{ duration: 1.15, ease: CINEMATIC_EASE }}
        >
          {children}
        </MotionBox>

        <Box
          aria-hidden="true"
          sx={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")",
            inset: 0,
            mixBlendMode: "soft-light",
            opacity: 0.055,
            pointerEvents: "none",
            position: "fixed",
            zIndex: 1400,
          }}
        />

        <Box
          aria-hidden="true"
          sx={{
            alignItems: "center",
            display: { xs: "none", lg: "flex" },
            flexDirection: "column",
            gap: 1.5,
            position: "fixed",
            right: 24,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1300,
          }}
        >
          <Typography
            component="span"
            sx={{
              color: "rgba(255,255,255,.42)",
              fontFamily: "var(--font-sans)",
              fontSize: "0.48rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
            }}
          >
            {String(activeScene + 1).padStart(2, "0")}
          </Typography>
          <Box
            sx={{
              bgcolor: "rgba(255,255,255,.12)",
              height: 96,
              overflow: "hidden",
              position: "relative",
              width: "1px",
            }}
          >
            <MotionBox
              style={{ scaleY: progress }}
              sx={{
                bgcolor: "#d8b879",
                inset: 0,
                position: "absolute",
                transformOrigin: "top",
              }}
            />
          </Box>
          <Typography
            component="span"
            sx={{
              color: "rgba(255,255,255,.22)",
              fontFamily: "var(--font-sans)",
              fontSize: "0.48rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
            }}
          >
            {String(SCENE_IDS.length).padStart(2, "0")}
          </Typography>
        </Box>
      </Box>
    </MotionConfig>
  );
}
