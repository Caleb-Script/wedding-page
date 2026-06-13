import { motion, useInView } from "framer-motion";
import { Box } from "@mui/material";
import { useRef, type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right";

export function SplitReveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: {
  children: string;
  className?: string;
  delay?: number;
  direction?: Direction;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const inView = useInView(ref, {
    once: true,
    amount: 0.3,
  });

  const words = children.split(" ");

  const initial = {
    opacity: 0,
    rotateX: direction === "up" || direction === "down" ? -40 : 0,
    x:
      direction === "left"
        ? "-110%"
        : direction === "right"
          ? "110%"
          : 0,
    y:
      direction === "up"
        ? "110%"
        : direction === "down"
          ? "-110%"
          : 0,
  };

  return (
    <Box
      ref={ref}
      className={className}
      sx={{
        perspective: 800,
      }}
    >
      {words.map((word, index) => (
        <Box
          key={index}
          component="span"
          sx={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "bottom",
            mr: "0.25em",
          }}
        >
          <motion.span
            style={{
              display: "inline-block",
            }}
            initial={initial}
            animate={
              inView
                ? {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    rotateX: 0,
                  }
                : {}
            }
            transition={{
              duration: 1.1,
              delay: delay + index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </Box>
      ))}
    </Box>
  );
}

export function FadeIn({
  children,
  delay = 0,
  direction = "up",
}: {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const inView = useInView(ref, {
    once: true,
    amount: 0.3,
  });

  const initial = {
    opacity: 0,
    x:
      direction === "left"
        ? -40
        : direction === "right"
          ? 40
          : 0,
    y:
      direction === "up"
        ? 40
        : direction === "down"
          ? -40
          : 0,
  };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={
        inView
          ? {
              opacity: 1,
              x: 0,
              y: 0,
            }
          : {}
      }
      transition={{
        duration: 1,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}