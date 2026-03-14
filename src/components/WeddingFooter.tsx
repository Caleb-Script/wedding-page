"use client";

import { motion } from "framer-motion";
import { Box, Container, Typography } from "@mui/material";

export default function WeddingFooter() {
  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 12, md: 16 },
        px: 3,
        textAlign: "center",
        background:
          "linear-gradient(180deg,#f3efe8 0%,#ede9e2 100%)",
      }}
    >
      <Container maxWidth="sm">

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {/* divider */}
          <Box
            sx={{
              width: 70,
              height: 2,
              mx: "auto",
              mb: 8,
              background: "linear-gradient(135deg,#c89b3c,#e5c275)",
            }}
          />

          {/* names */}
          <Typography
            sx={{
              fontFamily: "var(--font-serif)",
              fontSize: { xs: "2rem", md: "2.6rem" },
              fontWeight: 500,
              mb: 2,
              color: "#2f2925",
            }}
          >
            Caleb & Rachel
          </Typography>

          {/* date */}
          <Typography
            sx={{
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontSize: "0.8rem",
              color: "#777",
              mb: 4,
            }}
          >
            21 November 2026
          </Typography>

          {/* message */}
          <Typography
            sx={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "1.1rem",
              color: "#555",
            }}
          >
            Thank you for celebrating with us.
          </Typography>

        </motion.div>
      </Container>
    </Box>
  );
}