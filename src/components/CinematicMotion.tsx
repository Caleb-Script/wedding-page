"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

export const CINEMATIC_EASE = [0.22, 1, 0.36, 1] as const;
export const CINEMATIC_REVEAL_EASE = [0.16, 1, 0.3, 1] as const;

type WordRevealProps = {
  children: string;
  className?: string;
  delay?: number;
};

export function WordReveal({
  children,
  className,
  delay = 0,
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
      : { opacity: 1, rotateX: -14, y: "0.16em" },
    visible: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: reduceMotion ? 0 : 1.05,
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
      viewport={{ amount: 0.35, once: true }}
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
            padding: "0.08em 0.02em 0.14em",
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
