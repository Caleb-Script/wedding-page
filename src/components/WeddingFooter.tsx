"use client";

import { Box, Container, Typography } from "@mui/material";
import { format } from "date-fns";
import { de, enUS } from "date-fns/locale";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";

const weddingDate = new Date(2026, 10, 21);

export default function WeddingFooter() {
  const t = useTypedTranslations("wedding");
  const locale = useLocale();

  const dateLocale = locale === "de" ? de : enUS;

  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 12, md: 16 },
        px: 3,
        textAlign: "center",
        background: "linear-gradient(180deg,#f3efe8 0%,#ede9e2 100%)",
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
            {format(weddingDate, "d MMMM yyyy", { locale: dateLocale })}
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
            {t("footer.message")}
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
}
