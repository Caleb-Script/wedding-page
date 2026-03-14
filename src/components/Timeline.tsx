"use client";

import { Box, Container, Typography } from "@mui/material";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

import {
  HiOutlineBuildingOffice,
  HiOutlineCake,
  HiOutlineCamera,
  HiOutlineHeart,
  HiOutlineMusicalNote,
} from "react-icons/hi2";

const events = [
  { time: "14:00", title: "Ceremony begins", icon: HiOutlineHeart },
  { time: "15:30", title: "Congratulations & Photos", icon: HiOutlineCamera },
  {
    time: "17:30",
    title: "Arrival at Reception",
    icon: HiOutlineBuildingOffice,
  },
  { time: "18:00", title: "Dinner & Celebration", icon: HiOutlineCake },
  { time: "22:00", title: "Party", icon: HiOutlineMusicalNote },
];

export default function Timeline() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 12, md: 20 },
        px: 3,
        background:
          "linear-gradient(180deg,#faf7f2 0%,#f3efe8 50%,#faf7f2 100%)",
      }}
    >
      <Container maxWidth="lg">
        {/* subtitle */}
        <Typography
          sx={{
            textAlign: "center",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontSize: "0.75rem",
            color: "#777",
            mb: 2,
          }}
        >
          The Schedule
        </Typography>

        {/* title */}
        <Typography
          sx={{
            textAlign: "center",
            fontFamily: "var(--font-serif)",
            fontSize: { xs: "2.4rem", md: "3.5rem" },
            fontWeight: 500,
            mb: 2,
          }}
        >
          Our Timeline
        </Typography>

        {/* divider */}
        <Box
          sx={{
            width: 70,
            height: 2,
            mx: "auto",
            mb: 14,
            background: "linear-gradient(135deg,#c89b3c,#e5c275)",
          }}
        />

        {/* timeline wrapper */}
        <Box
          ref={ref}
          sx={{
            position: "relative",
            maxWidth: 800,
            mx: "auto",
          }}
        >
          {/* base line */}
          <Box
            sx={{
              position: "absolute",
              left: { xs: 24, md: "50%" },
              transform: { md: "translateX(-1px)" },
              top: 0,
              bottom: 0,
              width: 2,
              background: "#e6e2dc",
            }}
          />

          {/* animated progress line */}
          <motion.div
            style={{
              scaleY,
              transformOrigin: "top",
              position: "absolute",
              left: "50%",
              width: "2px",
              top: 0,
              bottom: 0,
              background: "linear-gradient(#c89b3c,#e5c275)",
            }}
          />

          {events.map((event, i) => {
            const Icon = event.icon;

            return (
              <motion.div
                key={event.time}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <Box
                  sx={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    mb: 10,
                    pl: { xs: 10, md: 0 },
                  }}
                >
                  {/* icon circle */}
                  <Box
                    sx={{
                      position: "absolute",
                      left: { xs: 16, md: "50%" },
                      transform: { md: "translateX(-50%)" },

                      width: 42,
                      height: 42,

                      borderRadius: "50%",

                      background: "linear-gradient(135deg,#c89b3c,#e5c275)",

                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",

                      boxShadow: "0 6px 20px rgba(200,155,60,0.35)",

                      zIndex: 3,
                    }}
                  >
                    <Icon
                      style={{
                        color: "white",
                        fontSize: 20,
                      }}
                    />
                  </Box>

                  {/* content */}
                  <Box
                    sx={{
                      width: { md: "45%" },

                      ml: {
                        md: i % 2 === 0 ? 0 : "auto",
                      },

                      pr: {
                        md: i % 2 === 0 ? 6 : 0,
                      },

                      pl: {
                        md: i % 2 !== 0 ? 6 : 0,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        background: "rgba(255,255,255,0.65)",
                        backdropFilter: "blur(12px)",
                        borderRadius: "14px",
                        px: 4,
                        py: 3,

                        border: "1px solid rgba(0,0,0,0.06)",

                        boxShadow: "0 10px 35px rgba(0,0,0,0.08)",

                        transition: "all .35s ease",

                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: "0 14px 45px rgba(0,0,0,0.12)",
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "0.8rem",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "#c89b3c",
                          fontWeight: 700,
                          mb: 1,
                        }}
                      >
                        {event.time}
                      </Typography>

                      <Typography
                        sx={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "1.15rem",
                        }}
                      >
                        {event.title}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
