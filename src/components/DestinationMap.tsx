"use client";

import { Box, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { EditorialReveal, WordReveal } from "@/components/CinematicMotion";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import styles from "./DestinationMap.module.css";

const DestinationMapCanvas = dynamic(() => import("./DestinationMapCanvas"), {
  ssr: false,
});

export default function DestinationMap() {
  const t = useTypedTranslations("wedding");
  const containerRef = useRef<HTMLElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "500px 0px" },
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      aria-labelledby="destination-map-title"
      className={styles.mapSection}
      component="section"
      ref={containerRef}
    >
      <Box className={styles.mapEditorialHeader} component="header">
        <Typography className={styles.mapEyebrow} component="p">
          {t("accommodation.mapView.eyebrow")}
        </Typography>
        <Typography
          className={styles.mapTitle}
          component="h3"
          id="destination-map-title"
        >
          <WordReveal>{t("accommodation.mapView.title")}</WordReveal>
        </Typography>
        <Typography className={styles.mapDescription} component="p">
          <EditorialReveal delay={0.14}>
            {t("accommodation.mapView.description")}
          </EditorialReveal>
        </Typography>
      </Box>

      <Box className={styles.mapCanvasFrame}>
        {shouldLoad ? (
          <DestinationMapCanvas />
        ) : (
          <Box
            aria-live="polite"
            className={styles.mapLoading}
            component="output"
          >
            <span />
            <Typography component="p">
              {t("accommodation.mapView.loading")}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
