"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useState } from "react";

import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { AnchorLink } from "@/components/ui/AnchorLink";
import { useActiveSection, useScrolledPast } from "@/hooks/useScroll";
import { NAV_ITEMS, SIGNATURE, SITE } from "@/content/site";
import { cn } from "@/lib/utils";

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);
  const condensed = useScrolledPast(40);
  const { lock, unlock } = useSmoothScroll();
  const reducedMotion = useReducedMotion();
  const menuId = useId();

  /**
   * Closes the mobile menu and releases the scroll lock synchronously, so an
   * anchor clicked inside the menu can still drive the smooth scroll.
   */
  const closeMenu = () => {
    setMenuOpen(false);
    unlock();
  };

  useEffect(() => {
    if (!menuOpen) return;

    document.body.style.overflow = "hidden";
    lock();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      unlock();
    };
  }, [menuOpen, lock, unlock]);

  return (
    <>
      <motion.header
        data-reveal=""
        initial={{ y: reducedMotion ? 0 : -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: reducedMotion ? 0.2 : 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-[120] px-[var(--spacing-gutter)] pt-4"
      >
        <div
          className={cn(
            "shell flex items-center justify-between gap-6 rounded-pill px-5 transition-[background-color,border-color,box-shadow,padding] duration-500 ease-expo lg:px-7",
            condensed
              ? "border border-line/80 bg-paper/85 py-2.5 shadow-[0_10px_40px_-24px_rgba(0,0,0,0.5)] backdrop-blur-xl"
              : "border border-transparent bg-transparent py-3.5",
          )}
        >
          <AnchorLink
            href="#home"
            className="shrink-0 text-[1.02rem] font-extrabold tracking-[-0.045em] lg:text-[1.12rem]"
            aria-label={`${SITE.name} — retour en haut`}
          >
            community<span className="text-muted"> manager</span>
          </AnchorLink>

          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;

                return (
                  <li key={item.id}>
                    <AnchorLink
                      href={item.href}
                      className="mono-label group relative flex items-center gap-1.5 py-2 transition-colors duration-300"
                    >
                      <span className={cn(isActive ? "text-ink" : "text-muted")}>
                        {item.index}
                      </span>
                      <span
                        className={cn(
                          "relative transition-colors duration-300",
                          isActive ? "text-ink" : "text-ink-soft group-hover:text-ink",
                        )}
                      >
                        {item.label}
                        <span
                          aria-hidden="true"
                          className={cn(
                            "absolute -bottom-1 left-0 h-px w-full origin-left bg-acid-deep transition-transform duration-500 ease-expo",
                            isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                          )}
                        />
                      </span>
                    </AnchorLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <a
              href={SIGNATURE.emailHref}
              data-cursor="link"
              className="link-underline mono-label text-muted transition-colors hover:text-ink"
            >
              Contact
            </a>
            <AnchorLink
              href="#contact"
              className="group inline-flex items-center gap-3 rounded-pill bg-ink px-5 py-2.5 text-[0.82rem] font-medium tracking-[-0.02em] text-white transition-colors duration-300 hover:bg-acid hover:text-ink"
            >
              Démarrer un projet
              <span
                aria-hidden="true"
                className="transition-transform duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                ↗
              </span>
            </AnchorLink>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            className="relative z-[130] flex items-center gap-3 rounded-pill border border-line px-4 py-2 lg:hidden"
          >
            <span className="mono-label">{menuOpen ? "Close" : "Menu"}</span>
            <span aria-hidden="true" className="flex w-4 flex-col gap-[5px]">
              <span
                className={cn(
                  "h-px w-full bg-ink transition-transform duration-300 ease-expo",
                  menuOpen && "translate-y-[3px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "h-px w-full bg-ink transition-transform duration-300 ease-expo",
                  menuOpen && "-translate-y-[3px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id={menuId}
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.15 : 0.35 }}
            className="fixed inset-0 z-[110] bg-canvas pt-28 lg:hidden"
          >
            <nav aria-label="Navigation mobile" className="shell flex h-full flex-col">
              <ul className="flex flex-col border-t border-line">
                {NAV_ITEMS.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: reducedMotion ? 0 : 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reducedMotion ? 0.2 : 0.6,
                      delay: 0.08 + index * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="border-b border-line"
                  >
                    <AnchorLink
                      href={item.href}
                      onNavigate={closeMenu}
                      className="flex items-baseline gap-4 py-5"
                    >
                      <span className="mono-label text-muted">{item.index}</span>
                      <span className="text-[clamp(2rem,9vw,3rem)] font-extrabold leading-none tracking-[-0.06em]">
                        {item.label}
                      </span>
                    </AnchorLink>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-auto flex flex-col gap-2 pb-10"
              >
                <a
                  href={SIGNATURE.emailHref}
                  className="link-underline mono-label w-fit text-muted"
                >
                  {SIGNATURE.email}
                </a>
                <a href={SIGNATURE.phoneHref} className="link-underline mono-label w-fit text-muted">
                  {SIGNATURE.phone}
                </a>
              </motion.div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
