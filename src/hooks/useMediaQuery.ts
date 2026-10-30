"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Reactive `matchMedia` built on `useSyncExternalStore`, so the value is read
 * from the browser store instead of being pushed through an effect. The server
 * snapshot is always `false`, which keeps the first client paint consistent.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onStoreChange);
      return () => list.removeEventListener("change", onStoreChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** True when the user has asked the system for reduced motion. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** True on devices with a precise pointer (mouse or trackpad). */
export function useHasFinePointer(): boolean {
  return useMediaQuery("(pointer: fine)");
}
