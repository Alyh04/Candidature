"use client";

import { motion, useReducedMotion } from "motion/react";
import { useId, useState, type FormEvent } from "react";

import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { CONTACT, SIGNATURE } from "@/content/site";

type Status = { tone: "success" | "error"; message: string } | null;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Contact() {
  const reducedMotion = useReducedMotion();
  const ids = useId();
  const [status, setStatus] = useState<Status>(null);
  const [pending, setPending] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !message || !EMAIL_PATTERN.test(email)) {
      setStatus({ tone: "error", message: CONTACT.error });
      return;
    }

    setPending(true);
    setStatus({ tone: "success", message: CONTACT.success.replace("{name}", name) });
    form.reset();
    setPending(false);
  };

  return (
    <section id="contact" className="section-pad bg-acid">
      <div className="shell">
        <div className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <Reveal y={16}>
              <p className="mono-label mb-8 flex items-center gap-3 text-ink/60">
                <span className="inline-block size-1.5 rounded-full bg-ink" />
                {CONTACT.index}
              </p>
            </Reveal>

            <SplitText
              as="h2"
              text={CONTACT.title.join("\n")}
              className="text-section text-ink"
            />

            <Reveal delay={0.15} className="mt-10 flex flex-col gap-2">
              <a href={SIGNATURE.emailHref} className="link-underline mono-label w-fit text-ink">
                {SIGNATURE.email}
              </a>
              <a href={SIGNATURE.phoneHref} className="link-underline mono-label w-fit text-ink">
                {SIGNATURE.phone}
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.1} y={36}>
            <p className="text-lead max-w-[34ch] text-ink/80">{CONTACT.body}</p>

            <form onSubmit={handleSubmit} noValidate className="mt-10">
              <Field id={`${ids}-name`} label={CONTACT.fields.name}>
                <input
                  id={`${ids}-name`}
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder={CONTACT.placeholders.name}
                  className="w-full bg-transparent pb-3 pt-2 text-[1.05rem] tracking-[-0.02em] outline-none placeholder:text-ink/35"
                />
              </Field>

              <Field id={`${ids}-email`} label={CONTACT.fields.email}>
                <input
                  id={`${ids}-email`}
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  placeholder={CONTACT.placeholders.email}
                  className="w-full bg-transparent pb-3 pt-2 text-[1.05rem] tracking-[-0.02em] outline-none placeholder:text-ink/35"
                />
              </Field>

              <Field id={`${ids}-project`} label={CONTACT.fields.project}>
                <input
                  id={`${ids}-project`}
                  name="project"
                  type="text"
                  placeholder={CONTACT.placeholders.project}
                  className="w-full bg-transparent pb-3 pt-2 text-[1.05rem] tracking-[-0.02em] outline-none placeholder:text-ink/35"
                />
              </Field>

              <Field id={`${ids}-message`} label={CONTACT.fields.message}>
                <textarea
                  id={`${ids}-message`}
                  name="message"
                  rows={4}
                  required
                  placeholder={CONTACT.placeholders.message}
                  className="w-full resize-y bg-transparent pb-3 pt-2 text-[1.05rem] leading-relaxed tracking-[-0.02em] outline-none placeholder:text-ink/35"
                />
              </Field>

              <div className="mt-10 flex flex-wrap items-center gap-6">
                <Magnetic strength={0.2}>
                  <motion.button
                    type="submit"
                    disabled={pending}
                    whileTap={reducedMotion ? undefined : { scale: 0.97 }}
                    className="group inline-flex items-center gap-6 rounded-pill bg-ink px-7 py-4 text-[0.95rem] font-medium tracking-[-0.02em] text-white transition-colors duration-300 hover:bg-white hover:text-ink disabled:opacity-60"
                  >
                    {CONTACT.submit}
                    <span
                      aria-hidden="true"
                      className="text-lg transition-transform duration-500 ease-expo group-hover:translate-x-1 group-hover:-translate-y-1"
                    >
                      ↗
                    </span>
                  </motion.button>
                </Magnetic>
              </div>

              <p
                role="status"
                aria-live="polite"
                className={`mono-label mt-6 min-h-4 ${
                  status?.tone === "error" ? "text-ink" : "text-ink/70"
                }`}
              >
                {status?.message ?? ""}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

type FieldProps = {
  id: string;
  label: string;
  children: React.ReactNode;
};

/** Underline-only field with a mono label, matching the editorial grid. */
function Field({ id, label, children }: FieldProps) {
  return (
    <div className="border-b border-ink/25 pb-1 transition-colors duration-300 focus-within:border-ink">
      <label htmlFor={id} className="mono-label block pt-4 text-ink/60">
        {label}
      </label>
      {children}
    </div>
  );
}
