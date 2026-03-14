"use client";

import { Box, Container, Grid, Typography } from "@mui/material";
import { format } from "date-fns";
import { de, enUS } from "date-fns/locale";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import {
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineMapPin,
} from "react-icons/hi2";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";

const weddingDate = new Date(2026, 10, 21);

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.2 },
  }),
};

export default function WeddingInfo() {
  const t = useTypedTranslations("wedding");
  const locale = useLocale();

  const dateLocale = locale === "de" ? de : enUS;
  const date = format(weddingDate, "d MMMM yyyy", { locale: dateLocale });

  const cards = [
    {
      title: t("weddingInfo.ceremony.title"),
      venue: t("weddingInfo.ceremony.venue"),
      address: t("weddingInfo.ceremony.address"),
      time: "14:00",
      icon: HiOutlineMapPin,
    },
    {
      title: t("weddingInfo.reception.title"),
      venue: t("weddingInfo.reception.venue"),
      address: t("weddingInfo.reception.address"),
      time: "18:00",
      icon: HiOutlineClock,
    },
  ];

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 12, md: 18 },
        px: 3,
        background: "linear-gradient(180deg, #faf7f2 0%, #f3efe8 100%)",
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
          {t("weddingInfo.subtitle")}
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
          {t("weddingInfo.title")}
        </Typography>

        {/* divider */}
        <Box
          sx={{
            width: 70,
            height: 2,
            mx: "auto",
            mb: 10,
            background: "linear-gradient(135deg, #c89b3c, #e5c275)",
          }}
        />

        {/* cards */}
        <Grid
          container
          spacing={6}
          justifyContent="center"
          alignItems="stretch"
        >
          {cards.map((card, i) => {
            const Icon = card.icon;

            return (
              <Grid sx={{ xs: 12, md: 6 }} key={card.title}>
                <motion.div
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                >
                  <Box
                    sx={{
                      textAlign: "center",
                      background: "#f8f6f2",
                      borderRadius: "14px",
                      p: { xs: 4, md: 5 },

                      border: "1px solid rgba(0,0,0,0.08)",

                      boxShadow: "0 4px 30px rgba(0,0,0,0.06)",

                      transition: "all .35s ease",

                      "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
                      },
                    }}
                  >
                    {/* icon */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        mb: 2,
                        color: "#c89b3c",
                        "& svg": {
                          width: "30px",
                          height: "30px",
                        },
                      }}
                    >
                      <Icon />
                    </Box>

                    {/* title */}
                    <Typography
                      sx={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.6rem",
                        fontWeight: 500,
                        mb: 1,
                      }}
                    >
                      {card.title}
                    </Typography>

                    {/* venue */}
                    <Typography
                      sx={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.1rem",
                        mb: 0.5,
                      }}
                    >
                      {card.venue}
                    </Typography>

                    {/* address */}
                    <Typography
                      sx={{
                        fontSize: "0.9rem",
                        color: "#777",
                        mb: 3,
                      }}
                    >
                      {card.address}
                    </Typography>

                    {/* date + time */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 4,
                        color: "#666",
                        fontSize: "0.9rem",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <HiOutlineCalendar />
                        {date}
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <HiOutlineClock />
                        {card.time}
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
