"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: ReactNode;
  /** Seconds to wait before the reveal starts. */
  delay?: number;
  /** Vertical offset in px the element travels from. */
  y?: number;
  duration?: number;
  once?: boolean;
} & Omit<HTMLMotionProps<"div">, "children" | "ref">;

/**
 * Scroll-triggered entrance. Collapses to a pure fade when the visitor asks
 * for reduced motion, and never re-animates once revealed.
 */
export function Reveal({
  children,
  delay = 0,
  y = 30,
  duration = 0.9,
  once = true,
  className,
  ...rest
}: RevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      data-reveal=""
      initial={{ opacity: 0, y: reducedMotion ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.25, margin: "0px 0px -8% 0px" }}
      transition={{ duration: reducedMotion ? 0.3 : duration, delay, ease: EASE }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Staggered variant helper for lists of children. */
export function staggerContainer(stagger = 0.08, delayChildren = 0) {
  return {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren } },
  };
}

export const riseItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  once?: boolean;
};

/**
 * Parent that orchestrates staggered children via variants, keeping the
 * sequencing declarative instead of hand-written delays.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0,
  once = true,
}: RevealGroupProps) {
  return (
    <motion.div
      variants={staggerContainer(stagger, delayChildren)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.2, margin: "0px 0px -8% 0px" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

type RevealItemProps = {
  children: ReactNode;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "children" | "ref">;

export function RevealItem({ children, className, ...rest }: RevealItemProps) {
  return (
    <motion.div variants={riseItem} className={cn(className)} {...rest}>
      {children}
    </motion.div>
  );
}
