"use client";

import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";
import { motion } from "framer-motion";
import { Box, Container, Typography, Button } from "@mui/material";
import Link from "next/link";
import { HiHeart } from "react-icons/hi2";

export default function RSVPSuccess() {
  const [width, height] = useWindowSize();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(180deg,#faf7f2 0%,#f3efe8 100%)",
        position: "relative",
        textAlign: "center",
        px: 3,
      }}
    >
      {/* Gold Confetti */}
      <Confetti
        width={width}
        height={height}
        numberOfPieces={1000}
        recycle={false}
        colors={["#c89b3c", "#e5c275", "#ffffff", "#f5f0e6"]}
      />

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
            Thank You
          </Typography>

          {/* Divider */}
          <Box
            sx={{
              width: 70,
              height: 2,
              mx: "auto",
              mb: 6,
              background:
                "linear-gradient(135deg,#c89b3c,#e5c275)",
            }}
          />

          {/* Message */}
          <Typography
            sx={{
              fontSize: "1.15rem",
              color: "#555",
              mb: 7,
              lineHeight: 1.7,
            }}
          >
            Your RSVP has been received.
            <br />
            We are so excited to celebrate this special day with you.
          </Typography>

          {/* Names */}
          <Typography
            sx={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.5rem",
              mb: 4,
              color: "#2f2925",
            }}
          >
            Caleb & Rachel
          </Typography>

          {/* Button */}
          <Button
            component={Link}
            href="/"
            sx={{
              px: 6,
              py: 1.6,
              color: "white",
              background:
                "linear-gradient(135deg,#c89b3c,#e5c275)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              borderRadius: "4px",

              "&:hover": {
                background:
                  "linear-gradient(135deg,#b8892e,#d8b25f)",
              },
            }}
          >
            Back to Website
          </Button>

        </motion.div>

      </Container>
    </Box>
  );
}