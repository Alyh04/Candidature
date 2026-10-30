"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { useScrolledPast } from "@/hooks/useScroll";

const RADIUS = 21;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Back-to-top control whose ring doubles as a page-read progress indicator.
 */
export function BackToTop() {
  const visible = useScrolledPast(900);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 28 });
  const { scrollTo } = useSmoothScroll();
  const reducedMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      aria-label="Retour en haut"
      onClick={() => scrollTo("#home", 0)}
      initial={false}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.7 }}
      transition={{ duration: reducedMotion ? 0.15 : 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
      className="group fixed bottom-5 right-5 z-[130] grid size-14 place-items-center rounded-full bg-ink text-white shadow-[0_18px_40px_-18px_rgba(0,0,0,0.7)] transition-colors duration-300 hover:bg-acid hover:text-ink lg:bottom-8 lg:right-8"
    >
      <svg viewBox="0 0 48 48" aria-hidden="true" className="absolute inset-0 -rotate-90">
        <circle
          cx="24"
          cy="24"
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeWidth="1.5"
        />
        <motion.circle
          cx="24"
          cy="24"
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          style={{ pathLength: progress }}
        />
      </svg>
      <span
        aria-hidden="true"
        className="text-lg transition-transform duration-500 ease-expo group-hover:-translate-y-0.5"
      >
        ↑
      </span>
    </motion.button>
  );
}
