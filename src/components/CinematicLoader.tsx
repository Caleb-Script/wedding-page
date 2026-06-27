"use client";

import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import { CINEMATIC_EASE } from "./CinematicMotion";

type CinematicLoaderProps = {
  onComplete: () => void;
};

export default function CinematicLoader({ onComplete }: CinematicLoaderProps) {
  const t = useTypedTranslations("wedding");
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const completedRef = useRef(false);

  useEffect(() => {
    const duration = reduceMotion ? 700 : 2200;
    const startedAt = performance.now();
    let animationFrame = 0;
    let completionTimeout = 0;

    const tick = (time: number) => {
      const nextProgress = Math.min(
        100,
        Math.max(0, ((time - startedAt) / duration) * 100),
      );
      setProgress(nextProgress);

      if (nextProgress < 100) {
        animationFrame = requestAnimationFrame(tick);
        return;
      }

      if (completedRef.current) return;

      completedRef.current = true;
      setProgress(100);
      cancelAnimationFrame(animationFrame);

      completionTimeout = window.setTimeout(
        () => {
          onComplete();
        },
        reduceMotion ? 150 : 450,
      );
    };

    animationFrame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.clearTimeout(completionTimeout);
    };
  }, [onComplete, reduceMotion]);

  return (
    <Backdrop
      aria-label={t("loader.preparing")}
      component="output"
      open
      sx={{
        bgcolor: "#030304",
        color: "#f1ece2",
        overflow: "hidden",
        zIndex: (theme) => theme.zIndex.modal + 100,
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          background:
            "radial-gradient(circle at 50% 48%, rgba(216,184,121,.12), transparent 34%), radial-gradient(circle at 20% 20%, rgba(112,126,145,.08), transparent 32%)",
          inset: 0,
          position: "absolute",
        }}
      />

      <Box
        aria-hidden="true"
        sx={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E\")",
          inset: 0,
          mixBlendMode: "soft-light",
          opacity: 0.08,
          position: "absolute",
        }}
      />

      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: "calc(100% - 40px)",
          position: "relative",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            display: "grid",
            height: { xs: 206, sm: 220 },
            mb: 2,
            placeItems: "center",
            position: "relative",
            width: { xs: 206, sm: 220 },
          }}
        >
          <CircularProgress
            aria-label={t("loader.preparing")}
            size={220}
            min={0}
            max={100}
            thickness={0.7}
            value={progress}
            variant="determinate"
            enableTrackSlot
            sx={{
              "& .MuiCircularProgress-track": {
                stroke: "rgba(255,255,255,.12)",
              },
              "& .MuiCircularProgress-circle": {
                stroke: "#d8b879",
              },
            }}
          />

          <Box
            sx={{
              display: "grid",
              inset: 0,
              placeItems: "center",
              pointerEvents: "none",
              position: "absolute",
              zIndex: 1,
            }}
          >
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
              transition={{
                duration: reduceMotion ? 0 : 1.1,
                ease: CINEMATIC_EASE,
              }}
            >
              <Typography
                component="div"
                sx={{
                  color: "#f4efe6",
                  fontFamily: "var(--font-serif)",
                  fontSize: { xs: "2.65rem", sm: "3.2rem" },
                  fontStyle: "italic",
                  fontWeight: 200,
                  letterSpacing: "-0.045em",
                  lineHeight: 1,
                }}
              >
                C{" "}
                <Box component="span" sx={{ color: "primary.main" }}>
                  ·
                </Box>{" "}
                R
              </Typography>
              <Typography
                sx={{
                  flexShrink: 0,
                  fontSize: "0.66rem",
                  fontWeight: 700,
                  mt: 0.5,
                  ml: 2.5,
                }}
              >
                #CALEBGETSRICH #HAPPILYEVERGYAMFI
              </Typography>
            </motion.div>
          </Box>
        </Box>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
          transition={{
            delay: reduceMotion ? 0 : 0.45,
            duration: reduceMotion ? 0 : 0.9,
            ease: CINEMATIC_EASE,
          }}
        >
          <Typography
            component="p"
            sx={{
              color: "rgba(255,255,255,.48)",
              fontFamily: "var(--font-sans)",
              fontSize: "0.66rem",
              fontWeight: 700,
              letterSpacing: "0.28em",
              lineHeight: 1.6,
              overflowWrap: "anywhere",
              textTransform: "uppercase",
            }}
          >
            {t("loader.preparing")}
          </Typography>
        </motion.div>
      </Box>
    </Backdrop>
  );
}
