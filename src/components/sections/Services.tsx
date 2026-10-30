"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SERVICES, STUDIO_SECTION } from "@/content/site";

export function Services() {
  return (
    <section id="studio" className="section-pad hairline-b">
      <div className="shell">
        <SectionHeader
          index={STUDIO_SECTION.index}
          title={STUDIO_SECTION.title}
          intro={STUDIO_SECTION.intro}
          className="mb-16 lg:mb-24"
        />

        <ul className="border-t border-ink">
          {SERVICES.map((service, index) => (
            <Reveal key={service.id} delay={index * 0.06}>
              <li className="group relative isolate overflow-hidden border-b border-line">
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-acid transition-transform duration-[600ms] ease-expo group-hover:scale-y-100 group-focus-within:scale-y-100"
                />

                <div className="grid grid-cols-[2.5rem_1fr_auto] items-start gap-x-4 gap-y-3 py-7 transition-transform duration-[600ms] ease-expo group-hover:translate-x-2 group-focus-within:translate-x-2 sm:grid-cols-[3.5rem_1fr_1.2fr_auto] sm:gap-x-8 lg:py-8">
                  <span className="mono-label pt-2 text-muted transition-colors duration-500 group-hover:text-ink/60">
                    {service.number}
                  </span>

                  <h3 className="text-title font-extrabold">{service.title}</h3>

                  <p className="col-span-2 max-w-[52ch] text-[1rem] leading-relaxed text-ink-soft transition-colors duration-500 group-hover:text-ink/80 sm:col-span-1">
                    {service.description}
                  </p>

                  <span
                    aria-hidden="true"
                    className="justify-self-end pt-1 text-xl transition-transform duration-500 ease-expo group-hover:translate-x-1 group-hover:-translate-y-1"
                  >
                    ↗
                  </span>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1} className="mt-10">
          <p className="mono-label max-w-[46ch] text-muted">
            Cinq disciplines, une seule équipe, un interlocuteur unique.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
