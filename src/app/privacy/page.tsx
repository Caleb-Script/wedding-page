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
        py: { xs: 12, md: 20 },
        px: 0,
        background:
          "radial-gradient(circle at 78% 24%, rgba(216,184,121,0.07), transparent 30%), #050506",
        color: "text.primary",
      }}
    >
      <Container maxWidth="md" disableGutters>
        <Box sx={{ maxWidth: 720, mx: "auto", px: { xs: 2.5, md: 0 } }}>
          <Typography
            sx={{
              textAlign: "center",
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.6rem, 8vw, 4rem)",
              lineHeight: 0.96,
              letterSpacing: "-0.045em",
              mb: 2,
              color: "text.primary",
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
              background: "rgba(216,184,121,0.6)",
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
              px: { xs: 2.5, md: 6 },
              py: { xs: 4, md: 6 },
              borderRadius: 2,
              background: "background.paper",
              border: "1px solid rgba(216,184,121,0.12)",
            }}
          >
            {/* Controller */}
            <Box sx={{ mb: 5 }}>
              <Typography
                sx={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.2rem",
                  mb: 1.5,
                  color: "primary.main",
                }}
              >
                {t("privacy.sections.controller.title")}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ lineHeight: 1.85, mb: 2 }}
              >
                {t("privacy.sections.controller.intro")}
              </Typography>

              <Box
                component="address"
                sx={{
                  m: 0,
                  mb: 2,
                  fontStyle: "normal",
                  color: "text.secondary",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    lineHeight: 1.85,
                    fontWeight: 600,
                    color: "text.primary",
                  }}
                >
                  {t("privacy.sections.controller.company")}
                </Typography>

                <Typography variant="body2" sx={{ lineHeight: 1.85 }}>
                  {t("privacy.sections.controller.address.street")}
                </Typography>

                <Typography variant="body2" sx={{ lineHeight: 1.85 }}>
                  {t("privacy.sections.controller.address.postalCode")}{" "}
                  {t("privacy.sections.controller.address.city")}
                </Typography>

                <Typography variant="body2" sx={{ lineHeight: 1.85 }}>
                  {t("privacy.sections.controller.address.state")}
                </Typography>

                <Typography variant="body2" sx={{ lineHeight: 1.85 }}>
                  {t("privacy.sections.controller.address.country")}
                </Typography>

                <Link
                  href={`mailto:${t("privacy.sections.controller.email")}`}
                  underline="hover"
                  sx={{
                    display: "inline-block",
                    mt: 1,
                    fontSize: "0.875rem",
                    color: "primary.main",
                  }}
                >
                  {t("privacy.sections.controller.email")}
                </Link>
              </Box>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ lineHeight: 1.85 }}
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
                    color: "primary.main",
                  }}
                >
                  {t(`privacy.sections.${section}.title`)}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ lineHeight: 1.85 }}
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
