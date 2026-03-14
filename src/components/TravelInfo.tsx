"use client";

import { Box, Container, Grid, Tab, Tabs, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  HiOutlineSquare3Stack3D,
  HiOutlineTicket,
  HiOutlineTruck,
} from "react-icons/hi2";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";

export default function TravelInfo() {
  const t = useTypedTranslations("wedding");

  const [tab, setTab] = useState(0);

  const ceremonyTravel = [
    {
      icon: HiOutlineTruck,
      title: t("travel.ceremony.car.title"),
      details: t("travel.ceremony.car.details"),
    },
    {
      icon: HiOutlineTicket,
      title: t("travel.ceremony.train.title"),
      details: t("travel.ceremony.train.details"),
    },
    {
      icon: HiOutlineSquare3Stack3D,
      title: t("travel.ceremony.parking.title"),
      details: t("travel.ceremony.parking.details"),
    },
  ];

  const receptionTravel = [
    {
      icon: HiOutlineTruck,
      title: t("travel.reception.car.title"),
      details: t("travel.reception.car.details"),
    },
    {
      icon: HiOutlineTicket,
      title: t("travel.reception.train.title"),
      details: t("travel.reception.train.details"),
    },
    {
      icon: HiOutlineSquare3Stack3D,
      title: t("travel.reception.parking.title"),
      details: t("travel.reception.parking.details"),
    },
  ];

  const travelOptions = tab === 0 ? ceremonyTravel : receptionTravel;

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 12, md: 18 },
        px: 3,
        background: "linear-gradient(180deg,#f3efe8 0%,#ede9e2 100%)",
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
          {t("travel.subtitle")}
        </Typography>

        {/* title */}
        <Typography
          sx={{
            textAlign: "center",
            fontFamily: "var(--font-serif)",
            fontSize: { xs: "2.4rem", md: "3.5rem" },
            fontWeight: 500,
            mb: 4,
          }}
        >
          {t("travel.title")}
        </Typography>

        {/* Tabs */}
        <Tabs
          value={tab}
          onChange={(_e, v) => setTab(v)}
          centered
          sx={{
            mb: 10,
            "& .MuiTabs-indicator": {
              background: "linear-gradient(135deg,#c89b3c,#e5c275)",
              height: 2,
            },
          }}
        >
          <Tab
            label={t("travel.tabs.ceremony")}
            sx={{
              fontFamily: "var(--font-serif)",
              textTransform: "none",
              fontSize: "1rem",
            }}
          />

          <Tab
            label={t("travel.tabs.reception")}
            sx={{
              fontFamily: "var(--font-serif)",
              textTransform: "none",
              fontSize: "1rem",
            }}
          />
        </Tabs>

        {/* cards */}
        <Grid container spacing={6} justifyContent="center">
          {travelOptions.map((opt, i) => {
            const Icon = opt.icon;

            return (
              <Grid sx={{ xs: 12, md: 4 }} key={opt.title}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                >
                  <Box
                    sx={{
                      textAlign: "center",
                      borderRadius: "14px",
                      px: 5,
                      py: 5,
                      background: "rgba(255,255,255,0.7)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(0,0,0,0.06)",
                      boxShadow: "0 10px 35px rgba(0,0,0,0.08)",
                      transition: "all .35s ease",
                      "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow: "0 14px 45px rgba(0,0,0,0.12)",
                      },
                    }}
                  >
                    {/* icon */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        mb: 3,
                        color: "#c89b3c",
                        "& svg": { fontSize: 34 },
                      }}
                    >
                      <Icon />
                    </Box>

                    {/* title */}
                    <Typography
                      sx={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.35rem",
                        fontWeight: 500,
                        mb: 2,
                      }}
                    >
                      {opt.title}
                    </Typography>

                    {/* details */}
                    <Typography
                      sx={{
                        fontSize: "0.95rem",
                        color: "#555",
                        lineHeight: 1.7,
                      }}
                    >
                      {opt.details}
                    </Typography>
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
