"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, type ComponentPropsWithoutRef, type ElementType, type ReactNode } from "react";

import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

type SplitTextProps = {
  /** Plain text. Use `\n` to force a line break. */
  text: string;
  as?: ElementType;
  className?: string;
  /** Play as soon as it mounts (hero) instead of waiting for the viewport. */
  playOnMount?: boolean;
  delay?: number;
  stagger?: number;
  duration?: number;
};

type HostProps = {
  ref?: React.Ref<HTMLElement>;
  className?: string;
  "aria-label"?: string;
  children?: ReactNode;
};

type WordToken = {
  word: string;
  /** Position in the flattened word sequence, used for the stagger delay. */
  index: number;
  isLast: boolean;
};

function tokenize(text: string): WordToken[][] {
  const lines = text.split("\n").map((line) => line.split(/\s+/).filter(Boolean));
  const total = lines.reduce((sum, line) => sum + line.length, 0);

  let index = -1;

  return lines.map((words) =>
    words.map((word) => {
      index += 1;
      return { word, index, isLast: index === total - 1 };
    }),
  );
}

/**
 * Editorial mask reveal: each word rides up from behind a clipped line, the
 * closest DOM equivalent of a studio kinetic-type animation.
 *
 * Accessibility: the accessible name lives on the wrapper via `aria-label` and
 * the per-word spans are `aria-hidden`, so the text is never announced word by
 * word by a screen reader.
 */
export function SplitText({
  text,
  as = "span",
  className,
  playOnMount = false,
  delay = 0,
  stagger = 0.055,
  duration = 1.05,
}: SplitTextProps) {
  const hostRef = useRef<HTMLElement | null>(null);
  const inView = useInView(hostRef, { once: true, amount: 0.35 });
  const reducedMotion = useReducedMotion();
  const lines = tokenize(text);
  const playing = playOnMount || reducedMotion || inView;

  const Host = as as ElementType<ComponentPropsWithoutRef<"div"> & HostProps>;

  return (
    <Host ref={hostRef} className={cn(className)} aria-label={text.replace(/\n/g, " ")}>
      {lines.map((tokens, lineIndex) => (
        <span key={lineIndex} className="block">
          {tokens.map(({ word, index, isLast }) => (
            <span key={`${word}-${index}`} className="contents">
              <span
                aria-hidden="true"
                className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom"
              >
                <motion.span
                  data-reveal=""
                  className="inline-block will-change-transform"
                  initial={{ y: reducedMotion ? 0 : "115%" }}
                  animate={{ y: playing ? 0 : "115%" }}
                  transition={{ duration, delay: delay + index * stagger, ease: EASE }}
                >
                  {word}
                </motion.span>
              </span>
              {isLast ? null : " "}
            </span>
          ))}
        </span>
      ))}
    </Host>
  );
}
