"use client";

import { useEffect, useState } from "react";

/**
 * Highlights the nav entry matching the section currently in view.
 * `rootMargin` biases detection toward the upper third of the viewport.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
          else visible.delete(entry.target.id);
        }

        if (visible.size === 0) return;

        const [topMost] = [...visible.entries()].sort((a, b) => {
          const first = document.getElementById(a[0]);
          const second = document.getElementById(b[0]);
          return (
            (first?.getBoundingClientRect().top ?? 0) -
            (second?.getBoundingClientRect().top ?? 0)
          );
        });

        if (topMost) setActive(topMost[0]);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

/** True once the window has scrolled past `offset` pixels. */
export function useScrolledPast(offset = 24): boolean {
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setPassed(window.scrollY > offset);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [offset]);

  return passed;
}
