"use client";

import { Box, Container, Fab, keyframes, Typography } from "@mui/material";
import { format } from "date-fns";
import { de, enUS } from "date-fns/locale";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { HiChevronDown } from "react-icons/hi2";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";

const weddingDate = new Date(2026, 10, 21);

const bounce = keyframes`
0%,100% { transform: translateY(0); }
50% { transform: translateY(8px); }
`;

const zoom = keyframes`
0% { transform: scale(1); }
100% { transform: scale(1.08); }
`;

const float = keyframes`
0% { transform: translateY(0px); }
50% { transform: translateY(-4px); }
100% { transform: translateY(0px); }
`;

function useCountdown() {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const distance = weddingDate.getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTime({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return time;
}

export default function Page() {
  const locale = useLocale();

  const dateLocale = locale === "de" ? de : enUS;
  const t = useTypedTranslations("wedding");
  const { days, hours, minutes, seconds } = useCountdown();

  return (
    <Box>
      <Fab
        aria-label="language"
        sx={{
          position: "fixed",
          top: {
            xs: "calc(env(safe-area-inset-top) + 16px)",
            md: 32,
          },
          right: {
            xs: 16,
            md: 32,
          },
          zIndex: 3000,

          px: 2,

          background:
            "linear-gradient(135deg, rgba(212,175,55,0.9), rgba(245,215,110,0.9))",

          color: "#1a1a1a",

          backdropFilter: "blur(16px) saturate(160%)",
          WebkitBackdropFilter: "blur(16px) saturate(160%)",

          border: "1px solid rgba(255,255,255,0.25)",

          boxShadow: `
      0 10px 30px rgba(0,0,0,0.35),
      0 0 20px rgba(212,175,55,0.45)
    `,

          animation: `${float} 6s ease-in-out infinite`,

          transition: "all .35s cubic-bezier(.4,0,.2,1)",

          "&:hover": {
            transform: "translateY(-3px) scale(1.03)",

            background:
              "linear-gradient(135deg, rgba(245,215,110,1), rgba(212,175,55,1))",

            boxShadow: `
        0 14px 40px rgba(0,0,0,0.45),
        0 0 30px rgba(212,175,55,0.7)
      `,
          },
        }}
      >
        <LanguageSwitcher />
      </Fab>

      {/* HERO */}
      <Box
        component="section"
        sx={{
          position: "relative",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Background Image */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            animation: `${zoom} 30s ease-in-out infinite alternate`,
          }}
        >
          <Image
            src="/hero-bg.jpg"
            alt={t("hero.backgroundAlt")}
            fill
            priority
            style={{
              objectFit: "cover",
            }}
          />
        </Box>

        {/* Overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.65))",
            zIndex: 1,
          }}
        />

        {/* Content */}
        <Container
          maxWidth="md"
          sx={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Typography
              sx={{
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                fontSize: "0.8rem",
                color: "rgba(255,255,255,0.8)",
              }}
            >
              {t("hero.subtitle")}
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <Typography
              variant="h1"
              sx={{
                fontFamily: "Playfair Display",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                fontSize: {
                  xs: "3rem",
                  md: "5rem",
                  lg: "7rem",
                },
                color: "#F9F7F3",
                textShadow: "0 4px 40px rgba(0,0,0,0.35)",
                mt: 2,
              }}
            >
              Caleb & Rachel
            </Typography>
          </motion.div>

          {/* Divider */}
          <Box
            sx={{
              width: 100,
              height: 1,
              mx: "auto",
              my: 3,
              background: "linear-gradient(90deg, #d4af37, #f5d76e, #d4af37)",
            }}
          />

          {/* Quote */}
          <Typography
            sx={{
              fontFamily: "Playfair Display",
              fontStyle: "italic",
              fontSize: {
                xs: "1.2rem",
                md: "1.6rem",
              },
              color: "rgba(255,255,255,0.7)",
              mb: 4,
            }}
          >
            {t("hero.quote")}
          </Typography>

          {/* Date */}
          <Typography
            sx={{
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#d4af37",
              mb: 5,
            }}
          >
            {format(weddingDate, "d MMMM yyyy", { locale: dateLocale })}
          </Typography>

          {/* Countdown */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 4,
              mt: 2,
            }}
          >
            {[
              { label: t("hero.countdown.days"), value: days },
              { label: t("hero.countdown.hours"), value: hours },
              { label: t("hero.countdown.minutes"), value: minutes },
              { label: t("hero.countdown.seconds"), value: seconds },
            ].map((item) => {
              return (
                <Box key={item.label}>
                  <Typography
                    sx={{
                      fontFamily: "Playfair Display",
                      fontSize: "2rem",
                      color: "#fff",
                    }}
                  >
                    {item.value}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "0.7rem",
                      letterSpacing: "0.2em",
                      color: "rgba(255,255,255,0.6)",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Container>

        {/* Scroll Indicator */}
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          sx={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            {t("hero.scroll")}
          </Typography>

          <HiChevronDown
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: 24,
              animation: `${bounce} 2s infinite`,
            }}
          />
        </Box>
      </Box>

      {/* INFO SECTION */}
      <Box
        sx={{
          py: 16,
          background: "#f7f3ec",
          textAlign: "center",
        }}
      >
        <Container maxWidth="sm">
          <Typography
            variant="h3"
            sx={{
              fontFamily: "Playfair Display",
              mb: 3,
            }}
          >
            {t("hero.infoTitle")}
          </Typography>

          <Typography
            sx={{
              fontFamily: "Lato",
              color: "#555",
              lineHeight: 1.8,
            }}
          >
            {t("hero.infoText")}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
