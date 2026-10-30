"use client";

import Lenis from "lenis";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";

import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

type ScrollTarget = string | HTMLElement;

type SmoothScrollApi = {
  /** Native fallback used when smooth scrolling is unavailable or unwanted. */
  scrollTo: (target: ScrollTarget, offset?: number) => void;
  lock: () => void;
  unlock: () => void;
};

const SmoothScrollContext = createContext<SmoothScrollApi | null>(null);

/** Navigation offset so anchored sections clear the fixed header. */
export const SCROLL_OFFSET = -84;

/**
 * Owns the single Lenis instance and its rAF loop, and exposes an imperative
 * API so navigation (header links, mobile menu, back-to-top) can stay
 * declarative without fighting the smooth-scroll engine.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    lenisRef.current = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  const scrollTo = useCallback((target: ScrollTarget, offset = SCROLL_OFFSET) => {
    const lenis = lenisRef.current;

    if (lenis) {
      lenis.scrollTo(target, { offset, duration: 1.2 });
      return;
    }

    const element = typeof target === "string" ? document.querySelector(target) : target;
    if (!element) return;

    const top = element.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: "auto" });
  }, []);

  const lock = useCallback(() => lenisRef.current?.stop(), []);
  const unlock = useCallback(() => lenisRef.current?.start(), []);

  const api = useMemo<SmoothScrollApi>(
    () => ({ scrollTo, lock, unlock }),
    [scrollTo, lock, unlock],
  );

  return <SmoothScrollContext.Provider value={api}>{children}</SmoothScrollContext.Provider>;
}

export function useSmoothScroll(): SmoothScrollApi {
  const context = useContext(SmoothScrollContext);
  if (!context) {
    throw new Error("useSmoothScroll must be used inside <SmoothScrollProvider>.");
  }
  return context;
}
