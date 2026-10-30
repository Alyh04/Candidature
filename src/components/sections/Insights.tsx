"use client";

import { motion, useReducedMotion } from "motion/react";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { ARTICLES, MEDIA_SECTION } from "@/content/site";
import { Newsletter } from "@/components/sections/Newsletter";

export function Insights() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="media" className="section-pad bg-night text-white">
      <div className="shell">
        <SectionHeader
          index={MEDIA_SECTION.index}
          title={MEDIA_SECTION.title}
          intro={MEDIA_SECTION.intro}
          tone="dark"
          className="mb-16 lg:mb-24"
        />

        <div className="grid grid-cols-1 gap-px bg-night-line md:grid-cols-3">
          {ARTICLES.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: reducedMotion ? 0.3 : 0.85,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group flex min-h-[21rem] flex-col justify-between bg-night p-7 transition-colors duration-500 ease-expo hover:bg-acid hover:text-ink lg:p-8"
            >
              <div>
                <p className="mono-label text-faint transition-colors duration-500 group-hover:text-ink/60">
                  {article.tag}
                </p>
                <h3 className="mt-6 text-[clamp(1.5rem,2.4vw,2rem)] font-extrabold leading-[1.05] tracking-[-0.05em]">
                  {article.title}
                </h3>
              </div>

              <p className="mt-8 leading-relaxed text-faint transition-colors duration-500 group-hover:text-ink/75">
                {article.excerpt}
                <span
                  aria-hidden="true"
                  className="ml-2 inline-block transition-transform duration-500 ease-expo group-hover:translate-x-1"
                >
                  ↗
                </span>
              </p>
            </motion.article>
          ))}
        </div>

        <Newsletter />
      </div>
    </section>
  );
}
