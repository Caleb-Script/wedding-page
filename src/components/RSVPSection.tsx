"use client";

import { Box, Button, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";

export default function RSVPSection() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 12, md: 20 },
        px: 3,
        background: "linear-gradient(180deg,#faf7f2 0%,#f3efe8 100%)",
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Box
            sx={{
              textAlign: "center",

              px: { xs: 5, md: 8 },
              py: { xs: 8, md: 10 },

              borderRadius: "16px",

              background: "rgba(255,255,255,0.75)",
              backdropFilter: "blur(14px)",

              border: "1px solid rgba(0,0,0,0.06)",

              boxShadow: "0 15px 45px rgba(0,0,0,0.08)",
            }}
          >
            {/* subtitle */}
            <Typography
              sx={{
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                fontSize: "0.75rem",
                color: "#777",
                mb: 2,
              }}
            >
              Join Us
            </Typography>

            {/* title */}
            <Typography
              sx={{
                fontFamily: "var(--font-serif)",
                fontSize: { xs: "2.4rem", md: "3rem" },
                fontWeight: 500,
                mb: 2,
              }}
            >
              RSVP
            </Typography>

            {/* divider */}
            <Box
              sx={{
                width: 70,
                height: 2,
                mx: "auto",
                mb: 6,
                background: "linear-gradient(135deg,#c89b3c,#e5c275)",
              }}
            />

            {/* quote */}
            <Typography
              sx={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "1.2rem",
                color: "#555",
                maxWidth: 420,
                mx: "auto",
                mb: 6,
              }}
            >
              "We would be honored to celebrate this special day with you."
            </Typography>

            {/* button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button
                component={Link}
                href="/rsvp"
                sx={{
                  px: 6,
                  py: 1.8,

                  fontSize: "0.8rem",
                  letterSpacing: "0.2em",

                  textTransform: "uppercase",

                  color: "white",

                  background: "linear-gradient(135deg,#c89b3c,#e5c275)",

                  borderRadius: "4px",

                  transition: "all .35s ease",

                  "&:hover": {
                    background: "linear-gradient(135deg,#b8892e,#d8b25f)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(200,155,60,0.35)",
                  },
                }}
              >
                RSVP Now
              </Button>
            </motion.div>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
