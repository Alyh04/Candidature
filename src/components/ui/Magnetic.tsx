"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useCallback, useRef, type ReactNode } from "react";

type MagneticProps = {
  children: ReactNode;
  /** How far the element is allowed to drift, as a fraction of the offset. */
  strength?: number;
  className?: string;
};

/**
 * Magnetic hover: the element leans toward the cursor with a spring, then
 * springs back. Pointer-coarse and reduced-motion visitors get a static button.
 */
export function Magnetic({ children, strength = 0.32, className }: MagneticProps) {
  const reducedMotion = useReducedMotion();
  const hostRef = useRef<HTMLSpanElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 20, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 260, damping: 20, mass: 0.35 });

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLSpanElement>) => {
      if (reducedMotion) return;
      const rect = hostRef.current?.getBoundingClientRect();
      if (!rect) return;

      x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
      y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
    },
    [reducedMotion, strength, x, y],
  );

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.span
      ref={hostRef}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
      style={reducedMotion ? undefined : { x: springX, y: springY }}
      className={className ?? "inline-block"}
    >
      {children}
    </motion.span>
  );
}
