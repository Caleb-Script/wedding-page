"use client";

import { Box, Typography } from "@mui/material";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import type { ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";
import CinematicLoader from "./CinematicLoader";
import { CINEMATIC_EASE } from "./CinematicMotion";

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
  const [ready, setReady] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    damping: 28,
    mass: 0.2,
    stiffness: 110,
  });
  const completeLoader = useCallback(() => setReady(true), []);

  useEffect(() => {
    if (ready) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [ready]);

  useEffect(() => {
    if (!ready) return;

    const sections = SCENE_IDS.map((id) => document.getElementById(id)).filter(
      (section): section is HTMLElement => Boolean(section),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!activeEntry) return;

        const index = SCENE_IDS.indexOf(
          activeEntry.target.id as (typeof SCENE_IDS)[number],
        );
        if (index >= 0) setActiveScene(index);
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: [0, 0.2, 0.5, 0.8] },
    );

    for (const section of sections) observer.observe(section);

    return () => observer.disconnect();
  }, [ready]);

  return (
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
  );
}
