"use client";

import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";

export default function QuoteSection() {
  const t = useTypedTranslations("wedding");

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 14, md: 22 },
        px: 3,
        backgroundColor: "#f8f6f2",
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <Box
              sx={{
                width: 64,
                height: "1.5px",
                mx: "auto",
                mb: { xs: 6, md: 7 },
                background: "linear-gradient(135deg,#c89b3c,#e5c275)",
              }}
            />

            <Typography
              component="blockquote"
              sx={{
                m: 0,
                px: { xs: 1, md: 2 },
                fontFamily: "font-serif",
                fontStyle: "italic",
                fontWeight: 200,
                fontSize: { xs: "2.1rem", md: "3rem" },
                lineHeight: { xs: 1.25, md: 1.12 },
                letterSpacing: "-0.02em",
                color: "#2f2925",
                textAlign: "center",
                textWrap: "balance",
                maxWidth: "980px",
                mx: "auto",
                mb: { xs: 6, md: 7 },
              }}
            >
              {/* {t("text").split("\n").map((line, i) => (
  <span key={i}>
    {line}
    <br />
  </span>
))} */}
              {t("quote.line1")}
              <br />
              {t("quote.line2")}
            </Typography>

            <Box
              sx={{
                width: 64,
                height: "1.5px",
                mx: "auto",
                background: "linear-gradient(135deg,#c89b3c,#e5c275)",
              }}
            />
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}
