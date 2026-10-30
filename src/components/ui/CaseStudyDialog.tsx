"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef } from "react";

import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import type { CaseStudy } from "@/content/site";
import { cn } from "@/lib/utils";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

type CaseStudyDialogProps = {
  study: CaseStudy | null;
  onClose: () => void;
};

/**
 * Accessible case-study overlay: focus is trapped inside, Escape and the
 * backdrop both dismiss, body scroll is locked, and focus returns to the
 * trigger on close.
 */
export function CaseStudyDialog({ study, onClose }: CaseStudyDialogProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const { lock, unlock } = useSmoothScroll();
  const reducedMotion = useReducedMotion();
  const isOpen = study !== null;

  useEffect(() => {
    if (!isOpen) return;

    triggerRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    lock();

    const focusables = () =>
      Array.from(panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);

    const timer = window.setTimeout(() => focusables()[0]?.focus(), 40);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const items = focusables();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      unlock();
      triggerRef.current?.focus?.();
    };
  }, [isOpen, lock, onClose, unlock]);

  const onBackdropClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) onClose();
    },
    [onClose],
  );

  return (
    <AnimatePresence>
      {study ? (
        <motion.div
          key="backdrop"
          role="presentation"
          onClick={onBackdropClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.28 }}
          className="fixed inset-0 z-[150] flex items-end justify-center bg-ink/70 p-0 backdrop-blur-md sm:items-center sm:p-6"
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
            tabIndex={-1}
            data-lenis-prevent
            initial={{ opacity: 0, y: reducedMotion ? 0 : 48, scale: reducedMotion ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : 32, scale: reducedMotion ? 1 : 0.99 }}
            transition={{ duration: reducedMotion ? 0.15 : 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "relative max-h-[92dvh] w-full max-w-[min(880px,100%)] overflow-y-auto",
              "rounded-t-[28px] bg-paper p-7 shadow-2xl outline-none sm:rounded-[28px] sm:p-10",
            )}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer"
              className="absolute right-5 top-5 grid size-10 place-items-center rounded-full border border-line text-xl leading-none transition-colors duration-300 hover:bg-ink hover:text-white"
            >
              ✕
            </button>

            <p className="mono-label text-muted">
              Étude de cas / {study.number}
            </p>

            <h3
              id="case-study-title"
              className="mt-6 max-w-[18ch] text-[clamp(2rem,4.4vw,3.4rem)] font-extrabold leading-[0.95] tracking-[-0.055em]"
            >
              {study.title}
            </h3>

            <p className="mt-5 max-w-[62ch] text-[1.02rem] leading-relaxed text-ink-soft">
              {study.context}
            </p>

            <div className="mt-10 grid grid-cols-1 gap-10 border-t border-line pt-8 sm:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="mono-label text-muted">Actions menées</p>
                <ul className="mt-5 space-y-3">
                  {study.actions.map((action) => (
                    <li key={action} className="flex gap-3 text-[0.98rem] leading-relaxed text-ink-soft">
                      <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-acid-deep" />
                      {action}
                    </li>
                  ))}
                </ul>

                <p className="mono-label mt-9 text-muted">Outils</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {study.tools.map((tool) => (
                    <li
                      key={tool}
                      className="mono-label rounded-pill border border-line px-3 py-1.5 text-ink"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="mono-label text-muted">Résultats</p>
                <div className="mt-5 space-y-5">
                  {study.metrics.map((metric) => (
                    <div key={metric.label} className="border-t border-line pt-4">
                      <span className="mono-label block text-muted">{metric.label}</span>
                      <strong className="mt-2 block text-[clamp(1.6rem,3vw,2.2rem)] font-extrabold tracking-[-0.05em]">
                        {metric.value}
                      </strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 flex justify-end border-t border-line pt-6">
              <button
                type="button"
                onClick={onClose}
                className="rounded-pill bg-ink px-6 py-3 text-[0.9rem] font-medium text-white transition-colors duration-300 hover:bg-acid hover:text-ink"
              >
                Fermer
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
