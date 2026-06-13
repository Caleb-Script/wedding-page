import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { CINEMATIC_REVEAL_EASE, EditorialReveal } from "./CinematicMotion";

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
  const reduceMotion = useReducedMotion();
  const words = children.split(" ");
  const occurrences = new Map<string, number>();
  const keyedWords = words.map((word) => {
    const occurrence = (occurrences.get(word) ?? 0) + 1;
    occurrences.set(word, occurrence);
    return { key: `${word}-${occurrence}`, word };
  });
  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: reduceMotion ? 0 : delay,
        staggerChildren: reduceMotion ? 0 : 0.075,
      },
    },
  };
  const wordVariants: Variants = {
    hidden: reduceMotion
      ? { opacity: 1 }
      : {
          filter: "blur(2px)",
          opacity: 0.32,
          rotateX: direction === "up" ? -34 : direction === "down" ? 34 : 0,
          x: direction === "left" ? -24 : direction === "right" ? 24 : 0,
          y: direction === "up" ? 24 : direction === "down" ? -24 : 0,
        },
    visible: {
      filter: "blur(0px)",
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: reduceMotion ? 0 : 1.15,
        ease: CINEMATIC_REVEAL_EASE,
      },
      x: 0,
      y: 0,
    },
  };

  return (
    <motion.span
      className={className}
      initial="hidden"
      style={{
        display: "block",
        maxWidth: "100%",
        overflowWrap: "anywhere",
        perspective: 900,
      }}
      variants={container}
      viewport={{ amount: 0.3, margin: "0px 0px -8% 0px", once: true }}
      whileInView="visible"
    >
      {keyedWords.map(({ key, word }, index) => (
        <span
          key={key}
          style={{
            display: "inline-block",
            marginRight: index === keyedWords.length - 1 ? 0 : "0.24em",
            maxWidth: "100%",
            overflowWrap: "anywhere",
            padding: "0.12em 0.025em 0.18em",
            verticalAlign: "bottom",
            whiteSpace: "normal",
          }}
        >
          <motion.span
            style={{
              display: "inline-block",
              maxWidth: "100%",
              overflowWrap: "anywhere",
              whiteSpace: "normal",
            }}
            variants={wordVariants}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
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
  return (
    <EditorialReveal
      delay={delay}
      distance={direction === "down" ? -28 : direction === "up" ? 28 : 0}
    >
      {children}
    </EditorialReveal>
  );
}
