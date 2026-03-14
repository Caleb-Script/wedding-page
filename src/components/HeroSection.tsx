"use client";

import { Box, Container, keyframes, Typography } from "@mui/material";
import { format } from "date-fns";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HiChevronDown } from "react-icons/hi2";

const weddingDate = new Date(2026, 10, 21);

const bounce = keyframes`
0%,100% { transform: translateY(0); }
50% { transform: translateY(8px); }
`;

const zoom = keyframes`
0% { transform: scale(1); }
100% { transform: scale(1.08); }
`;

function useCountdown() {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const distance = weddingDate.getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTime({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return time;
}

export default function Page() {
  const { days, hours, minutes, seconds } = useCountdown();

  return (
    <Box>
      {/* HERO */}
      <Box
        component="section"
        sx={{
          position: "relative",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Background Image */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            animation: `${zoom} 30s ease-in-out infinite alternate`,
          }}
        >
          <Image
            src="/hero-bg.jpg"
            alt="Wedding background"
            fill
            priority
            style={{
              objectFit: "cover",
            }}
          />
        </Box>

        {/* Overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.65))",
            zIndex: 1,
          }}
        />

        {/* Content */}
        <Container
          maxWidth="md"
          sx={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Typography
              sx={{
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                fontSize: "0.8rem",
                color: "rgba(255,255,255,0.8)",
              }}
            >
              We're getting married
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <Typography
              variant="h1"
              sx={{
                fontFamily: "Playfair Display",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                fontSize: {
                  xs: "3rem",
                  md: "5rem",
                  lg: "7rem",
                },
                color: "#F9F7F3",
                textShadow: "0 4px 40px rgba(0,0,0,0.35)",
                mt: 2,
              }}
            >
              Caleb & Rachel
            </Typography>
          </motion.div>

          {/* Divider */}
          <Box
            sx={{
              width: 100,
              height: 1,
              mx: "auto",
              my: 3,
              background: "linear-gradient(90deg, #d4af37, #f5d76e, #d4af37)",
            }}
          />

          {/* Quote */}
          <Typography
            sx={{
              fontFamily: "Playfair Display",
              fontStyle: "italic",
              fontSize: {
                xs: "1.2rem",
                md: "1.6rem",
              },
              color: "rgba(255,255,255,0.7)",
              mb: 4,
            }}
          >
            "We found love that feels like home."
          </Typography>

          {/* Date */}
          <Typography
            sx={{
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#d4af37",
              mb: 5,
            }}
          >
            {format(weddingDate, "d MMMM yyyy")}
          </Typography>

          {/* Countdown */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 4,
              mt: 2,
            }}
          >
            {[
              { label: "Days", value: days },
              { label: "Hours", value: hours },
              { label: "Minutes", value: minutes },
              { label: "Seconds", value: seconds },
            ].map((item) => {
              return (
                <Box key={item.label}>
                  <Typography
                    sx={{
                      fontFamily: "Playfair Display",
                      fontSize: "2rem",
                      color: "#fff",
                    }}
                  >
                    {item.value}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "0.7rem",
                      letterSpacing: "0.2em",
                      color: "rgba(255,255,255,0.6)",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Container>

        {/* Scroll Indicator */}
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          sx={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            Scroll
          </Typography>

          <HiChevronDown
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: 24,
              animation: `${bounce} 2s infinite`,
            }}
          />
        </Box>
      </Box>

      {/* INFO SECTION */}
      {/* <Box
        sx={{
          py: 16,
          background: "#f7f3ec",
          textAlign: "center",
        }}
      >
        <Container maxWidth="sm">
          <Typography
            variant="h3"
            sx={{
              fontFamily: "Playfair Display",
              mb: 3,
            }}
          >
            Our Wedding
          </Typography>

          <Typography
            sx={{
              fontFamily: "Lato",
              color: "#555",
              lineHeight: 1.8,
            }}
          >
            Join us as we celebrate our love and begin our journey together. We
            would be honored to have you with us on this special day.
          </Typography>
        </Container>
      </Box> */}
    </Box>
  );
}
