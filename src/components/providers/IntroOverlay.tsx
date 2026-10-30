"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { SITE } from "@/content/site";

const SESSION_KEY = "gertix:intro-seen";
const DURATION_MS = 1150;
/** Failsafe: the page can never stay scroll-locked behind the curtain. */
const MAX_LOCK_MS = DURATION_MS + 4000;

/**
 * One-shot intro curtain. Plays at most once per browser session and never for
 * reduced-motion visitors. State is committed after the first paint so the
 * server-rendered markup stays deterministic.
 */
export function IntroOverlay() {
  const reducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    if (window.sessionStorage.getItem(SESSION_KEY) === "1") return;
    window.sessionStorage.setItem(SESSION_KEY, "1");

    let startedAt = 0;
    let showFrame = 0;
    let tickFrame = 0;

    const tick = (now: number) => {
      const ratio = Math.min((now - startedAt) / DURATION_MS, 1);
      setProgress(Math.round(ratio * 100));

      if (ratio < 1) {
        tickFrame = requestAnimationFrame(tick);
      } else {
        setVisible(false);
      }
    };

    showFrame = requestAnimationFrame(() => {
      setVisible(true);
      document.body.style.overflow = "hidden";
      startedAt = performance.now();
      tickFrame = requestAnimationFrame(tick);
    });

    const failsafe = window.setTimeout(() => {
      document.body.style.overflow = "";
      setVisible(false);
    }, MAX_LOCK_MS);

    return () => {
      cancelAnimationFrame(showFrame);
      cancelAnimationFrame(tickFrame);
      window.clearTimeout(failsafe);
    };
  }, [reducedMotion]);

  const releaseScroll = () => {
    document.body.style.overflow = "";
  };

  if (reducedMotion) return null;

  return (
    <AnimatePresence onExitComplete={releaseScroll}>
      {visible ? (
        <motion.div
          key="intro"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[400] flex flex-col justify-between bg-acid px-[var(--spacing-gutter)] py-8"
          aria-hidden="true"
        >
          <div className="flex items-center justify-between">
            <span className="mono-label text-ink/60">{SITE.tagline}</span>
            <span className="mono-label text-ink/60">2026</span>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.6rem,11vw,8.5rem)] font-black leading-[0.82] tracking-[-0.075em] text-ink"
          >
            {SITE.display.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </motion.p>

          <div className="flex items-center gap-5">
            <span className="relative block h-px flex-1 overflow-hidden bg-ink/25">
              <motion.span
                className="absolute inset-y-0 left-0 block bg-ink"
                style={{ width: `${progress}%` }}
              />
            </span>
            <span className="mono-label w-10 text-right tabular-nums text-ink">{progress}</span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
