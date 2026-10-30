"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import { CaseStudyDialog } from "@/components/ui/CaseStudyDialog";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SplitText } from "@/components/ui/SplitText";
import {
  APPLICATION,
  APPLICATION_SECTION,
  AVAILABILITY,
  CASE_STUDIES,
  CLOSING,
  SIGNATURE,
  SKILLS,
  type CaseStudy,
} from "@/content/site";

export function Application() {
  const [activeStudy, setActiveStudy] = useState<CaseStudy | null>(null);
  const reducedMotion = useReducedMotion();

  return (
    <section id="portfolio" className="section-pad hairline-b">
      <div className="shell">
        <SectionHeader
          index={APPLICATION_SECTION.index}
          title={APPLICATION_SECTION.title}
          intro={APPLICATION_SECTION.intro}
          className="mb-16 lg:mb-24"
        />

        <Reveal y={40}>
          <article className="overflow-hidden rounded-[clamp(1.25rem,3vw,2rem)] border border-ink bg-paper">
            <header className="flex flex-col gap-8 border-b border-ink p-7 lg:flex-row lg:items-start lg:justify-between lg:p-12">
              <div>
                <p className="mono-label text-muted">{APPLICATION.meta}</p>
                <SplitText
                  as="h3"
                  text={APPLICATION.title}
                  playOnMount
                  delay={0.1}
                  className="mt-7 text-[clamp(2.2rem,6vw,5.4rem)] font-extrabold leading-[0.88] tracking-[-0.075em]"
                />
              </div>

              <span className="inline-flex w-fit shrink-0 items-center gap-3 rounded-pill border border-ink bg-acid px-4 py-2.5">
                <span className="relative flex size-2">
                  <motion.span
                    aria-hidden="true"
                    className="absolute inline-flex size-full rounded-full bg-ink"
                    animate={reducedMotion ? undefined : { scale: [1, 2.4], opacity: [0.6, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                  />
                  <span className="relative inline-flex size-2 rounded-full bg-ink" />
                </span>
                <span className="mono-label">{APPLICATION.badge}</span>
              </span>
            </header>

            <div className="p-7 lg:p-12">
              <div className="max-w-[68ch] space-y-6">
                {APPLICATION.letter.map((paragraph, index) => (
                  <Reveal key={index} delay={index * 0.05}>
                    <p className="text-[1.05rem] leading-[1.65] text-ink-soft">{paragraph}</p>
                  </Reveal>
                ))}
              </div>

              <SubSection label={APPLICATION.matchingTitle}>
                <RevealGroup className="mt-8">
                  {SKILLS.map((skill) => (
                    <RevealItem
                      key={skill.number}
                      className="grid grid-cols-[2.5rem_1fr] gap-x-5 gap-y-2 border-b border-line py-7 sm:grid-cols-[3.5rem_1fr] sm:gap-x-8"
                    >
                      <span className="mono-label pt-1.5 text-muted">{skill.number}</span>
                      <div>
                        <h4 className="text-[clamp(1.25rem,2vw,1.6rem)] font-bold tracking-[-0.04em]">
                          {skill.title}
                        </h4>
                        <p className="mt-3 max-w-[64ch] leading-relaxed text-ink-soft">
                          {skill.description}
                        </p>
                      </div>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </SubSection>

              <SubSection label={APPLICATION.worksTitle}>
                <RevealGroup className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                  {CASE_STUDIES.map((study) => (
                    <RevealItem key={study.id}>
                      <button
                        type="button"
                        onClick={() => setActiveStudy(study)}
                        aria-haspopup="dialog"
                        className="group flex h-full min-h-[19rem] w-full flex-col justify-between border border-line bg-canvas p-6 text-left transition-[transform,background-color,color,border-color] duration-500 ease-expo hover:-translate-y-1.5 hover:border-ink hover:bg-ink hover:text-white"
                      >
                        <div className="flex items-start justify-between">
                          <span className="mono-label text-muted transition-colors duration-500 group-hover:text-acid">
                            {study.number}
                          </span>
                          <span
                            aria-hidden="true"
                            className="text-lg transition-transform duration-500 ease-expo group-hover:translate-x-1 group-hover:-translate-y-1"
                          >
                            ↗
                          </span>
                        </div>

                        <div>
                          <h4 className="text-[1.5rem] font-extrabold leading-[1.05] tracking-[-0.05em]">
                            {study.title}
                          </h4>
                          <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft transition-colors duration-500 group-hover:text-white/70">
                            {study.summary}
                          </p>
                          <p className="mono-label mt-6 inline-flex items-center gap-2 border-b border-current pb-1">
                            Voir l&apos;étude de cas
                          </p>
                        </div>
                      </button>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </SubSection>

              <SubSection label={APPLICATION.availabilityTitle}>
                <RevealGroup className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
                  {AVAILABILITY.map((item) => (
                    <RevealItem key={item.label} className="border-t border-ink pt-4">
                      <span className="mono-label text-muted">{item.label}</span>
                      <strong className="mt-4 block text-[clamp(1.6rem,3vw,2.1rem)] font-extrabold tracking-[-0.055em]">
                        {item.value}
                      </strong>
                      <p className="mt-2 max-w-[28ch] text-[0.9rem] leading-relaxed text-ink-soft">
                        {item.note}
                      </p>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </SubSection>

              <div className="mt-14 border-t border-ink pt-9">
                <div className="max-w-[68ch] space-y-6">
                  {CLOSING.map((paragraph, index) => (
                    <Reveal key={index} delay={index * 0.05}>
                      <p className="text-[1.05rem] leading-[1.65] text-ink-soft">{paragraph}</p>
                    </Reveal>
                  ))}
                </div>

                <Reveal delay={0.1} className="mt-12 flex flex-col gap-1.5">
                  <strong className="text-[clamp(1.5rem,3vw,2.1rem)] font-extrabold tracking-[-0.05em]">
                    {SIGNATURE.name}
                  </strong>
                  <span className="mono-label text-muted">{SIGNATURE.role}</span>
                  <a
                    href={SIGNATURE.phoneHref}
                    className="link-underline mono-label mt-3 w-fit text-ink"
                  >
                    {SIGNATURE.phone}
                  </a>
                  <a
                    href={SIGNATURE.emailHref}
                    className="link-underline mono-label w-fit text-ink"
                  >
                    {SIGNATURE.email}
                  </a>
                </Reveal>
              </div>
            </div>
          </article>
        </Reveal>
      </div>

      <CaseStudyDialog study={activeStudy} onClose={() => setActiveStudy(null)} />
    </section>
  );
}

type SubSectionProps = {
  label: string;
  children: React.ReactNode;
};

/** Ruled sub-block inside the application letter. */
function SubSection({ label, children }: SubSectionProps) {
  return (
    <div className="mt-14 border-t border-ink pt-6 lg:mt-20">
      <Reveal y={14}>
        <p className="mono-label text-muted">{label}</p>
      </Reveal>
      {children}
    </div>
  );
}
