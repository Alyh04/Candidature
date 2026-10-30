import { MARQUEE_ITEMS } from "@/content/site";

const SEPARATOR = "✦";

/**
 * Infinite typographic band. Pure CSS so the compositor keeps it at 60fps
 * without a single re-render, with a static fallback for reduced motion.
 */
export function Marquee() {
  const sequence = MARQUEE_ITEMS.map((item, index) => (
    <span key={`${item}-${index}`} className="flex items-center">
      <span className={index % 2 === 0 ? "" : "text-muted"}>{item}</span>
      <span aria-hidden="true" className="px-6 text-muted lg:px-9">
        {index % 2 === 0 ? "×" : "→"}
      </span>
    </span>
  ));

  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-y border-line bg-paper/60 py-4 lg:py-5"
    >
      <div className="flex w-max animate-[marquee-scroll_32s_linear_infinite] items-center will-change-transform motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center">
            {sequence}
            <span className="px-6 text-muted lg:px-9">{SEPARATOR}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
