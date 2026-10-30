"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";

import { PillLink } from "@/components/ui/PillLink";
import { SplitText } from "@/components/ui/SplitText";
import { useHasFinePointer } from "@/hooks/useMediaQuery";
import { HERO } from "@/content/site";

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "34%"]);
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[100svh] items-end overflow-hidden pt-36 pb-14 lg:pt-40 lg:pb-16"
    >
      <HeroBackdrop gridY={gridY} glowY={glowY} reducedMotion={Boolean(reducedMotion)} />

      <motion.div
        style={reducedMotion ? undefined : { y: copyY, opacity: copyOpacity }}
        className="shell relative w-full"
      >
        <div className="grid grid-cols-1 items-end gap-x-12 gap-y-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <motion.p
              data-reveal=""
              initial={{ opacity: 0, y: reducedMotion ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mono-label mb-8 flex items-center gap-3 text-muted"
            >
              <span className="inline-block size-1.5 rounded-full bg-acid-deep" />
              {HERO.eyebrow}
            </motion.p>

            <SplitText
              as="h1"
              text={HERO.title.join("\n")}
              playOnMount
              delay={0.35}
              stagger={0.08}
              className="text-display"
            />
          </div>

          <div className="flex flex-col gap-8 lg:items-end lg:pb-4">
            <motion.p
              data-reveal=""
              initial={{ opacity: 0, y: reducedMotion ? 0 : 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="text-lead max-w-[34ch] text-ink-soft"
            >
              {HERO.body}
            </motion.p>

            <motion.div
              data-reveal=""
              initial={{ opacity: 0, y: reducedMotion ? 0 : 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-6"
            >
              <PillLink href={HERO.cta.href}>{HERO.cta.label}</PillLink>
              <span className="mono-label text-muted">FR / EN</span>
            </motion.div>
          </div>
        </div>

        <motion.div
          data-reveal=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-14 flex items-center gap-4 lg:mt-20"
        >
          <span className="mono-label text-muted">Scroll</span>
          <span aria-hidden="true" className="relative block h-px w-24 overflow-hidden bg-line">
            <motion.span
              className="absolute inset-y-0 left-0 w-1/3 bg-ink"
              animate={reducedMotion ? undefined : { x: ["-100%", "300%"] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}

type HeroBackdropProps = {
  gridY: MotionValue<string>;
  glowY: MotionValue<string>;
  reducedMotion: boolean;
};

/**
 * Decorative layer: a soft acid bloom that follows the pointer, plus a hairline
 * editorial grid that drifts with the scroll.
 */
function HeroBackdrop({ gridY, glowY, reducedMotion }: HeroBackdropProps) {
  const hasFinePointer = useHasFinePointer();
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.4);
  const smoothX = useSpring(pointerX, { stiffness: 60, damping: 20 });
  const smoothY = useSpring(pointerY, { stiffness: 60, damping: 20 });

  const bloomX = useTransform(smoothX, [0, 1], ["-30%", "30%"]);
  const bloomY = useTransform(smoothY, [0, 1], ["-30%", "30%"]);

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || !hasFinePointer) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width);
    pointerY.set((event.clientY - rect.top) / rect.height);
  };

  return (
    <div
      aria-hidden="true"
      onPointerMove={onPointerMove}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <motion.div
        style={reducedMotion ? undefined : { y: glowY }}
        className="absolute -top-1/3 left-1/2 h-[70vh] w-[70vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,255,50,0.55),transparent_62%)] blur-3xl"
      />
      <motion.div
        style={reducedMotion ? undefined : { x: bloomX, y: bloomY }}
        className="absolute right-[6%] top-[28%] h-[38vh] w-[38vh] rounded-full bg-[radial-gradient(circle,rgba(201,255,50,0.4),transparent_65%)] blur-2xl"
      />
      <motion.div
        style={reducedMotion ? undefined : { y: gridY }}
        className="absolute inset-x-0 bottom-0 h-[70%] opacity-[0.55] [background-image:repeating-linear-gradient(to_right,var(--color-line)_0px,var(--color-line)_1px,transparent_1px,transparent_12.5%)] [mask-image:linear-gradient(to_top,black,transparent_78%)]"
      />
    </div>
  );
}
