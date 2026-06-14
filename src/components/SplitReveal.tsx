import {
  motion,
  type TargetAndTransition,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import type { ReactNode } from "react";
import { CINEMATIC_REVEAL_EASE, EditorialReveal } from "./CinematicMotion";

export type SplitRevealDirection = "up" | "down" | "left" | "right";

export type SplitRevealEffect =
  | "blurIn"
  | "blurOut"
  | "cinematic"
  | "fadeIn"
  | "fadeOut"
  | "scaleIn"
  | "slideIn"
  | "slideOut";

type SplitRevealProps = {
  children: string;
  className?: string;
  delay?: number;
  direction?: SplitRevealDirection;
  distance?: number | string;
  duration?: number;
  effect?: SplitRevealEffect;
  once?: boolean;
  stagger?: number;
};

const restingState: TargetAndTransition = {
  filter: "blur(0px)",
  opacity: 1,
  rotateX: 0,
  scale: 1,
  x: 0,
  y: 0,
};

function getDirectionalOffset(
  direction: SplitRevealDirection,
  distance: number | string,
): TargetAndTransition {
  const negativeDistance =
    typeof distance === "number"
      ? -distance
      : distance.startsWith("-")
        ? distance.slice(1)
        : `-${distance}`;

  return {
    x:
      direction === "left"
        ? negativeDistance
        : direction === "right"
          ? distance
          : 0,
    y:
      direction === "up"
        ? distance
        : direction === "down"
          ? negativeDistance
          : 0,
  };
}

function getEffectStates(
  effect: SplitRevealEffect,
  direction: SplitRevealDirection,
  distance: number | string,
): {
  hidden: TargetAndTransition;
  visible: TargetAndTransition;
} {
  const directionalOffset = getDirectionalOffset(direction, distance);

  switch (effect) {
    case "slideIn":
      return {
        hidden: { ...restingState, ...directionalOffset },
        visible: restingState,
      };
    case "fadeIn":
      return {
        hidden: { ...restingState, opacity: 0 },
        visible: restingState,
      };
    case "blurIn":
      return {
        hidden: { ...restingState, filter: "blur(14px)", opacity: 0.18 },
        visible: restingState,
      };
    case "scaleIn":
      return {
        hidden: { ...restingState, opacity: 0.2, scale: 0.9 },
        visible: restingState,
      };
    case "slideOut":
      return {
        hidden: restingState,
        visible: { ...restingState, ...directionalOffset },
      };
    case "fadeOut":
      return {
        hidden: restingState,
        visible: { ...restingState, opacity: 0 },
      };
    case "blurOut":
      return {
        hidden: restingState,
        visible: { ...restingState, filter: "blur(14px)", opacity: 0.18 },
      };
    case "cinematic":
      return {
        hidden: {
          ...restingState,
          ...directionalOffset,
          filter: "blur(2px)",
          opacity: 0.32,
          rotateX: direction === "up" ? -34 : direction === "down" ? 34 : 0,
        },
        visible: restingState,
      };
  }
}

export function SplitReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 24,
  duration = 1.15,
  effect = "cinematic",
  once = true,
  stagger = 0.075,
}: SplitRevealProps) {
  const reduceMotion = useReducedMotion();
  const words = children.split(" ");
  const effectStates = getEffectStates(effect, direction, distance);
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
        staggerChildren: reduceMotion ? 0 : stagger,
      },
    },
  };
  const wordVariants: Variants = {
    hidden: reduceMotion ? restingState : effectStates.hidden,
    visible: {
      ...(reduceMotion ? restingState : effectStates.visible),
      transition: {
        duration: reduceMotion ? 0 : duration,
        ease: CINEMATIC_REVEAL_EASE,
      },
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
      viewport={{ amount: 0.3, margin: "0px 0px -8% 0px", once }}
      whileInView="visible"
    >
      {keyedWords.map(({ key, word }, index) => (
        <span
          key={key}
          style={{
            display: "inline-block",
            marginRight: index === keyedWords.length - 1 ? 0 : "0.24em",
            maxWidth: "100%",
            overflow:
              effect === "slideIn" || effect === "slideOut"
                ? "hidden"
                : "visible",
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
  direction?: SplitRevealDirection;
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
