"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";

const SECTION_KEYS = [
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
        color: "#6d531f",
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
              color: "#af8126",
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
              color: "#af8126",
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
            {/* Controller */}
            <Box sx={{ mb: 5 }}>
              <Typography
                sx={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.2rem",
                  mb: 1.5,
                  color: "#af8126",
                }}
              >
                {t("privacy.sections.controller.title")}
              </Typography>

              <Typography
                variant="body2"
                color="#af8126"
                sx={{ lineHeight: 1.7, mb: 2 }}
              >
                {t("privacy.sections.controller.intro")}
              </Typography>

              <Box
                component="address"
                sx={{
                  m: 0,
                  mb: 2,
                  fontStyle: "normal",
                  color: "#af8126",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    lineHeight: 1.7,
                    fontWeight: 600,
                    color: "#6d531f",
                  }}
                >
                  {t("privacy.sections.controller.company")}
                </Typography>

                <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                  {t("privacy.sections.controller.address.street")}
                </Typography>

                <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                  {t("privacy.sections.controller.address.postalCode")}{" "}
                  {t("privacy.sections.controller.address.city")}
                </Typography>

                <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                  {t("privacy.sections.controller.address.state")}
                </Typography>

                <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                  {t("privacy.sections.controller.address.country")}
                </Typography>

                <Link
                  href={`mailto:${t("privacy.sections.controller.email")}`}
                  underline="hover"
                  sx={{
                    display: "inline-block",
                    mt: 1,
                    fontSize: "0.875rem",
                    color: "#af8126",
                  }}
                >
                  {t("privacy.sections.controller.email")}
                </Link>
              </Box>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ lineHeight: 1.7 }}
              >
                {t("privacy.sections.controller.text")}
              </Typography>
            </Box>

            {/* Remaining sections */}
            {SECTION_KEYS.map((section) => (
              <Box
                key={section}
                component="section"
                sx={{
                  mb: 4,
                  "&:last-child": {
                    mb: 0,
                  },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.2rem",
                    mb: 1,
                    color: "#af8126",
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