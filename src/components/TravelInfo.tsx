"use client";

import { Box, Container, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";

import {
  HiOutlineSquare3Stack3D,
  HiOutlineTicket,
  HiOutlineTruck,
} from "react-icons/hi2";

const travelOptions = [
  {
    icon: HiOutlineTruck,
    title: "By Car",
    details:
      "The ceremony location in Stuttgart-Vaihingen can be reached via the A8 motorway. Follow signs towards Stuttgart-Vaihingen. Parking is available near the church.",
  },
  {
    icon: HiOutlineTicket,
    title: "By Train",
    details:
      "Stuttgart Hauptbahnhof connects to S-Bahn lines S1–S3. From Stuttgart-Vaihingen station the church is just a short taxi ride away.",
  },
  {
    icon: HiOutlineSquare3Stack3D,
    title: "Parking",
    details:
      "Parking is available near the ceremony church and at the White Event Palast in Kirchheim unter Teck. Additional street parking is available nearby.",
  },
];

export default function TravelInfo() {
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
          Getting There
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
          How To Get There
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

                        "& svg": {
                          fontSize: 34,
                        },
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
