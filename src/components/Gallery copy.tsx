"use client";

import { Box, Container, IconButton, Typography } from "@mui/material";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCallback } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";

const images = [
  { key: 1, image: "/gallery-1.jpg" },
  { key: 2, image: "/gallery-2.jpg" },
  { key: 3, image: "/gallery-3.jpg" },
  { key: 4, image: "/gallery-4.jpg" },
];

export default function Gallery() {
  const t = useTypedTranslations("wedding");
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 14, md: 20 },
        px: 3,
        background: "linear-gradient(180deg,#faf7f2 0%,#f3efe8 100%)",
      }}
    >
      <Container maxWidth="lg">
        {/* subtitle */}
        <Typography
          sx={{
            textAlign: "center",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontSize: "0.75rem",
            color: "#777",
            mb: 2,
          }}
        >
          {t("gallery.subtitle")}
        </Typography>

        {/* title */}
        <Typography
          sx={{
            textAlign: "center",
            fontFamily: "var(--font-serif)",
            fontSize: { xs: "2.4rem", md: "3.5rem" },
            fontWeight: 500,
            mb: 2,
          }}
        >
          {t("gallery.title")}
        </Typography>

        {/* divider */}
        <Box
          sx={{
            width: 70,
            height: 2,
            mx: "auto",
            mb: 10,
            background: "linear-gradient(135deg,#c89b3c,#e5c275)",
          }}
        />

        {/* carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ position: "relative" }}>
            {/* Embla viewport */}
            <Box
              ref={emblaRef}
              sx={{
                overflow: "hidden",
                borderRadius: "14px",
              }}
            >
              <Box sx={{ display: "flex" }}>
                {images.map((image) => (
                  <Box
                    key={image.key}
                    sx={{
                      flex: {
                        xs: "0 0 85%",
                        md: "0 0 60%",
                      },
                      px: 2,
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        height: { xs: 280, md: 500 },
                        borderRadius: "14px",
                        overflow: "hidden",
                        boxShadow: "0 12px 35px rgba(0,0,0,0.12)",
                      }}
                    >
                      <Image
                        src={image.image}
                        alt={t("gallery.imageAlt", { index: image.key })}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* left button */}
            <IconButton
              onClick={scrollPrev}
              aria-label={t("gallery.prev")}
              sx={{
                position: "absolute",
                left: 10,
                top: "50%",
                transform: "translateY(-50%)",

                width: 44,
                height: 44,

                backdropFilter: "blur(10px)",
                background: "rgba(255,255,255,0.7)",

                border: "1px solid rgba(0,0,0,0.08)",

                "&:hover": {
                  background: "rgba(255,255,255,0.95)",
                },
              }}
            >
              <HiChevronLeft />
            </IconButton>

            {/* right button */}
            <IconButton
              onClick={scrollNext}
              aria-label={t("gallery.next")}
              sx={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",

                width: 44,
                height: 44,

                backdropFilter: "blur(10px)",
                background: "rgba(255,255,255,0.7)",

                border: "1px solid rgba(0,0,0,0.08)",

                "&:hover": {
                  background: "rgba(255,255,255,0.95)",
                },
              }}
            >
              <HiChevronRight />
            </IconButton>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
