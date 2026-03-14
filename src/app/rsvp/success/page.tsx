"use client";

import { Box, Button, Container, Typography } from "@mui/material";
import { useWindowSize } from "@react-hook/window-size";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { HiChatBubbleLeftRight, HiEnvelope, HiHeart } from "react-icons/hi2";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";

export default function RSVPSuccess() {
  const t = useTypedTranslations("wedding");
  const [width, height] = useWindowSize();
  const [runConfetti, setRunConfetti] = useState(true);

  // stop confetti after 7 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setRunConfetti(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(180deg,#faf7f2 0%,#f3efe8 100%)",
        position: "relative",
        textAlign: "center",
        px: 3,
      }}
    >
      {/* Confetti */}
      {runConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={350}
          recycle={false}
          gravity={0.15}
          colors={["#c89b3c", "#e5c275", "#ffffff", "#f5f0e6", "#d9b46a"]}
        />
      )}

      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
        >
          {/* Floating heart */}
          <motion.div
            animate={{ y: [-6, 6, -6] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <HiHeart
              style={{
                fontSize: 42,
                color: "#c89b3c",
                marginBottom: 20,
              }}
            />
          </motion.div>

          {/* Title */}
          <Typography
            sx={{
              fontFamily: "var(--font-serif)",
              fontSize: { xs: "2.6rem", md: "3.8rem" },
              mb: 2,
              color: "#2f2925",
            }}
          >
            {t("rsvpSuccess.title")}
          </Typography>

          {/* Divider */}
          <Box
            sx={{
              width: 70,
              height: 2,
              mx: "auto",
              mb: 6,
              background: "linear-gradient(135deg,#c89b3c,#e5c275)",
            }}
          />

          {/* Message */}
          <Typography
            sx={{
              fontSize: "1.15rem",
              color: "#555",
              mb: 3,
              lineHeight: 1.7,
            }}
          >
            {t("rsvpSuccess.message1")}
          </Typography>

          <Typography
            sx={{
              fontSize: "1.05rem",
              color: "#666",
              mb: 7,
              lineHeight: 1.7,
            }}
          >
            {t("rsvpSuccess.message2")}
            <br />
            {/* Once everything has been finalized, you will receive an email
            with the next steps and further details.
            <br /> */}
            <br />
            {t("rsvpSuccess.message3")}
          </Typography>

          {/* Names */}
          <Typography
            sx={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.5rem",
              mb: 6,
              color: "#2f2925",
            }}
          >
            Caleb & Rachel
          </Typography>

          {/* Contact Section */}
          <Box sx={{ mb: 6 }}>
            <Typography
              sx={{
                fontSize: "0.95rem",
                color: "#777",
                mb: 2,
              }}
            >
              {t("rsvpSuccess.contactText")}
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 4,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {/* Email */}
              <Box
                component="a"
                href="mailto:your@email.com"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "#555",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                }}
              >
                <HiEnvelope />
                caleb_g@outlook.de
              </Box>

              {/* WhatsApp */}
              <Box
                component="a"
                href="https://wa.me/4915111951223"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "#555",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                }}
              >
                <HiChatBubbleLeftRight />
                WhatsApp
              </Box>
            </Box>
          </Box>

          {/* Button */}
          <Button
            component={Link}
            href="/"
            sx={{
              px: 6,
              py: 1.6,
              color: "white",
              background: "linear-gradient(135deg,#c89b3c,#e5c275)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              borderRadius: "4px",

              "&:hover": {
                background: "linear-gradient(135deg,#b8892e,#d8b25f)",
              },
            }}
          >
            {t("rsvpSuccess.back")}
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
}
