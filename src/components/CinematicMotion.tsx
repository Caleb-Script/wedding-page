"use client";

import {
  motion,
  type TargetAndTransition,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import type { ReactNode } from "react";

export const CINEMATIC_EASE = [0.22, 1, 0.36, 1] as const;
export const CINEMATIC_REVEAL_EASE = [0.16, 1, 0.3, 1] as const;

type WordRevealProps = {
  children: string;
  className?: string;
  delay?: number;
  direction?: "up" | "down";
  once?: boolean;
};

export function WordReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
}: WordRevealProps) {
  const reduceMotion = useReducedMotion();
  const words = children.split(" ");
  const occurrences = new Map<string, number>();
  const keyedWords = words.map((item) => {
    const occurrence = (occurrences.get(item) ?? 0) + 1;
    occurrences.set(item, occurrence);

    return { item, key: `${item}-${occurrence}` };
  });

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: reduceMotion ? 0 : delay,
        staggerChildren: reduceMotion ? 0 : 0.055,
      },
    },
  };
  const word: Variants = {
    hidden: reduceMotion
      ? { opacity: 1 }
      : {
          filter: "blur(2px)",
          opacity: 0.34,
          rotateX: direction === "up" ? -28 : 28,
          scale: 0.985,
          y: direction === "up" ? "0.48em" : "-0.48em",
        },
    visible: {
      filter: "blur(0px)",
      opacity: 1,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: reduceMotion ? 0 : 1.15,
        ease: CINEMATIC_REVEAL_EASE,
      },
      y: "0%",
    },
  };

  return (
    <motion.span
      className={className}
      initial="hidden"
      variants={container}
      viewport={{ amount: 0.3, margin: "0px 0px -8% 0px", once }}
      whileInView="visible"
    >
      {keyedWords.map(({ item, key }, index) => (
        <span
          key={key}
          style={{
            display: "inline-block",
            marginRight: index === keyedWords.length - 1 ? 0 : "0.24em",
            maxWidth: "100%",
            overflowWrap: "anywhere",
            padding: "0.12em 0.025em 0.18em",
            perspective: "900px",
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
            variants={word}
          >
            {item}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

type EditorialRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
};

export function EditorialReveal({
  children,
  className,
  delay = 0,
  distance = 22,
}: EditorialRevealProps) {
  const reduceMotion = useReducedMotion();
  const initial: TargetAndTransition = reduceMotion
    ? { opacity: 1 }
    : {
        filter: "blur(2px)",
        opacity: 0.34,
        scale: 0.99,
        y: distance,
      };

  return (
    <motion.span
      className={className}
      initial={initial}
      style={{
        display: "block",
        maxWidth: "100%",
        overflowWrap: "anywhere",
      }}
      transition={{
        delay: reduceMotion ? 0 : delay,
        duration: reduceMotion ? 0 : 1.05,
        ease: CINEMATIC_REVEAL_EASE,
      }}
      viewport={{ amount: 0.35, margin: "0px 0px -8% 0px", once: true }}
      whileInView={{
        filter: "blur(0px)",
        opacity: 1,
        scale: 1,
        y: 0,
      }}
    >
      {children}
    </motion.span>
  );
}
