"use client";

import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import { HiOutlineMapPin } from "react-icons/hi2";

const locations = [
  {
    title: "Ceremony",
    venue: "Katholisches Pfarramt Heilige Familie",
    address: "Dürllewangstraße 36, 70565 Stuttgart",
    description:
      "A beautiful church surrounded by nature in Stuttgart, providing a warm and intimate setting for the wedding ceremony.",
    mapQuery: "Heilige+Familie+Stuttgart",
  },
  {
    title: "Reception",
    venue: "White Event Palast",
    address: "Marie-Curie-Straße 3, 73230 Kirchheim unter Teck",
    description:
      "An elegant event palace with luxurious décor and a grand ballroom — the perfect place to celebrate the evening together.",
    mapQuery: "White+Event+Palast+Kirchheim+unter+Teck",
  },
];

export default function LocationSection() {
  const [tab, setTab] = useState(0);
  const location = locations[tab];

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 12, md: 18 },
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
          The Venues
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
          Locations
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
            label="Ceremony"
            sx={{
              fontFamily: "var(--font-serif)",
              textTransform: "none",
              fontSize: "1rem",
            }}
          />

          <Tab
            label="Reception"
            sx={{
              fontFamily: "var(--font-serif)",
              textTransform: "none",
              fontSize: "1rem",
            }}
          />
        </Tabs>

        {/* Card */}
        <motion.div
          key={location.title}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box
            sx={{
              maxWidth: 900,
              mx: "auto",
              overflow: "hidden",
              borderRadius: "14px",
              background: "rgba(255,255,255,0.75)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(0,0,0,0.06)",
              boxShadow: "0 10px 35px rgba(0,0,0,0.08)",
            }}
          >
            {/* map */}
            <Box sx={{ width: "100%", height: 350 }}>
              <iframe
                src={`https://www.google.com/maps?q=${location.mapQuery}&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                title={`Map of ${location.venue}`}
              />
            </Box>

            {/* content */}
            <Box sx={{ p: 6, textAlign: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: 2,
                  color: "#c89b3c",
                  "& svg": { fontSize: 30 },
                }}
              >
                <HiOutlineMapPin />
              </Box>

              <Typography
                sx={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.8rem",
                  fontWeight: 500,
                  mb: 1,
                }}
              >
                {location.title}
              </Typography>

              <Typography
                sx={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.2rem",
                  color: "#c89b3c",
                  mb: 1,
                }}
              >
                {location.venue}
              </Typography>

              <Typography
                sx={{
                  fontSize: "0.95rem",
                  color: "#777",
                  mb: 3,
                }}
              >
                {location.address}
              </Typography>

              <Typography
                sx={{
                  fontSize: "1rem",
                  color: "#555",
                  lineHeight: 1.6,
                  maxWidth: 600,
                  mx: "auto",
                }}
              >
                {location.description}
              </Typography>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
