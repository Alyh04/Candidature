"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

import { useHasFinePointer } from "@/hooks/useMediaQuery";

const INTERACTIVE = 'a, button, [data-cursor="link"], input, textarea, select, [role="button"]';

/**
 * Two-part cursor: an instant dot and a lagging ring, both spring-driven.
 * Auto-disabled on touch/coarse pointers and for reduced-motion visitors.
 */
export function Cursor() {
  const hasFinePointer = useHasFinePointer();
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);

  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);
  const ringX = useMotionValue(0);
  const ringY = useMotionValue(0);

  const dotSpringX = useSpring(dotX, { stiffness: 1400, damping: 60, mass: 0.15 });
  const dotSpringY = useSpring(dotY, { stiffness: 1400, damping: 60, mass: 0.15 });
  const ringSpringX = useSpring(ringX, { stiffness: 220, damping: 24, mass: 0.5 });
  const ringSpringY = useSpring(ringY, { stiffness: 220, damping: 24, mass: 0.5 });

  useEffect(() => {
    if (!hasFinePointer) return;

    document.documentElement.style.cursor = "none";

    const onMove = (event: PointerEvent) => {
      dotX.set(event.clientX);
      dotY.set(event.clientY);
      ringX.set(event.clientX);
      ringY.set(event.clientY);
      if (!visible) setVisible(true);
    };

    const onOver = (event: Event) => {
      const target = event.target;
      setActive(target instanceof Element && target.closest(INTERACTIVE) !== null);
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [dotX, dotY, ringX, ringY, visible, hasFinePointer]);

  if (!hasFinePointer) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[300] hidden lg:block">
      <motion.div
        className="absolute size-2 rounded-full bg-ink mix-blend-difference"
        style={{ x: dotSpringX, y: dotSpringY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="absolute rounded-full border border-ink/40 mix-blend-difference"
        style={{ x: ringSpringX, y: ringSpringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: active ? 64 : 34,
          height: active ? 64 : 34,
          opacity: visible ? 1 : 0,
          backgroundColor: active ? "rgba(201,255,50,0.9)" : "rgba(0,0,0,0)",
          borderColor: active ? "rgba(201,255,50,1)" : "rgba(17,17,17,0.4)",
        }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
      />
    </div>
  );
}
