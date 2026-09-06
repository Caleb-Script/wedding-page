"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";

const SECTION_KEYS = [
  "controller",
  "collected",
  "analytics",
  "cookies",
  "storage",
  "legalBasis",
  "rights",
  "contact",
] as const;

export default function PrivacyPage() {
  const t = useTypedTranslations("wedding");

  return (
    <Box
      component="main"
      sx={{
        width: "100%",
        minHeight: "100vh",
        m: 0,
        py: { xs: 14, md: 20 },
        px: 3,
        background: "linear-gradient(180deg,#faf7f2 0%,#f3efe8 100%)",
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ maxWidth: 720, mx: "auto" }}>
          <Typography
            sx={{
              textAlign: "center",
              fontFamily: "var(--font-serif)",
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              mb: 2,
            }}
          >
            {t("privacy.title")}
          </Typography>

          <Box
            sx={{
              width: 70,
              height: 2,
              mx: "auto",
              mb: 6,
              background: "linear-gradient(135deg,#c89b3c,#e5c275)",
            }}
          />

          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              color: "text.secondary",
              mb: 2,
            }}
          >
            {t("privacy.intro")}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              display: "block",
              textAlign: "center",
              color: "text.secondary",
              mb: 8,
            }}
          >
            {t("privacy.lastUpdated")}
          </Typography>

          <Box
            sx={{
              px: { xs: 3, md: 6 },
              py: 6,
              borderRadius: "16px",
              background: "rgba(255,255,255,0.8)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(0,0,0,0.05)",
              boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
            }}
          >
            {SECTION_KEYS.map((section) => (
              <Box key={section} sx={{ mb: 4 }}>
                <Typography
                  sx={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.2rem",
                    mb: 1,
                  }}
                >
                  {t(`privacy.sections.${section}.title`)}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ lineHeight: 1.7 }}
                >
                  {t(`privacy.sections.${section}.text`)}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
