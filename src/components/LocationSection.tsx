"use client";

import { Box, Container, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { HiOutlineMapPin } from "react-icons/hi2";

const locations = [
  {
    title: "Ceremony",
    venue: "Gesamtkirchengemeinde Heilige Familie",
    address: "Dürllewangstraße 36, 70565 Stuttgart",
    description:
      "A beautiful church surrounded by nature in Stuttgart, providing a warm and intimate setting for the wedding ceremony.",
    mapQuery: "Gesamtkirchengemeinde+Heilige+Familie+Stuttgart",
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
            mb: 2,
          }}
        >
          Locations
        </Typography>

        {/* divider */}
        <Box
          sx={{
            width: 70,
            height: 2,
            mx: "auto",
            mb: 12,
            background: "linear-gradient(135deg,#c89b3c,#e5c275)",
          }}
        />

        <Grid container spacing={6} justifyContent="center">
          {locations.map((loc, i) => (
            <Grid sx={{ xs: 12, md: 6 }} key={loc.title}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
              >
                <Box
                  sx={{
                    overflow: "hidden",
                    borderRadius: "14px",

                    background: "rgba(255,255,255,0.75)",
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
                  {/* map */}
                  <Box sx={{ width: "100%", height: 260 }}>
                    <iframe
                      src={`https://www.google.com/maps?q=${loc.mapQuery}&output=embed`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      title={`Map of ${loc.venue}`}
                    />
                  </Box>

                  {/* content */}
                  <Box sx={{ p: 5, textAlign: "center" }}>
                    {/* icon */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        mb: 2,
                        color: "#c89b3c",
                        "& svg": {
                          fontSize: 28,
                        },
                      }}
                    >
                      <HiOutlineMapPin />
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
                      {loc.title}
                    </Typography>

                    {/* venue */}
                    <Typography
                      sx={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.1rem",
                        color: "#c89b3c",
                        mb: 1,
                      }}
                    >
                      {loc.venue}
                    </Typography>

                    {/* address */}
                    <Typography
                      sx={{
                        fontSize: "0.9rem",
                        color: "#777",
                        mb: 3,
                      }}
                    >
                      {loc.address}
                    </Typography>

                    {/* description */}
                    <Typography
                      sx={{
                        fontSize: "0.95rem",
                        color: "#555",
                        lineHeight: 1.6,
                      }}
                    >
                      {loc.description}
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
