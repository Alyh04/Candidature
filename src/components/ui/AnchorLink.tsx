"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

type AnchorLinkProps = {
  href: string;
  children: ReactNode;
  /** Value read by the custom cursor to pick its hover state. */
  cursor?: string;
  onNavigate?: () => void;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children">;

/**
 * Same-document anchor that routes through the smooth-scroll engine instead of
 * fighting it with the native jump. Modifier-clicks keep browser defaults.
 */
export function AnchorLink({
  href,
  children,
  cursor,
  onNavigate,
  ...rest
}: AnchorLinkProps) {
  const { scrollTo } = useSmoothScroll();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    event.preventDefault();

    /**
     * Order matters: closing surfaces (e.g. the mobile menu) also releases the
     * scroll lock, and the smooth-scroll engine must be running again before it
     * is asked to move.
     */
    onNavigate?.();
    scrollTo(href);
    window.history.replaceState(null, "", href);
  };

  return (
    <a href={href} onClick={handleClick} data-cursor={cursor} {...rest}>
      {children}
    </a>
  );
}
