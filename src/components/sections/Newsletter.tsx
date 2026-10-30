"use client";

import { useId, useState, type FormEvent } from "react";

import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { NEWSLETTER } from "@/content/site";

type Status = { tone: "success" | "error"; message: string } | null;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Newsletter capture. Front-end only — wire `onSubmit` to your provider. */
export function Newsletter() {
  const inputId = useId();
  const [status, setStatus] = useState<Status>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();

    if (!EMAIL_PATTERN.test(email)) {
      setStatus({ tone: "error", message: NEWSLETTER.error });
      return;
    }

    setStatus({ tone: "success", message: NEWSLETTER.success });
    form.reset();
  };

  return (
    <div className="mt-24 grid grid-cols-1 items-end gap-x-16 gap-y-10 border-t border-night-line pt-16 lg:mt-32 lg:grid-cols-2 lg:pt-24">
      <div>
        <SplitText
          as="h2"
          text={NEWSLETTER.title.join("\n")}
          className="text-section text-white"
        />
      </div>

      <Reveal delay={0.1}>
        <p className="max-w-[38ch] leading-relaxed text-faint">{NEWSLETTER.body}</p>

        <form onSubmit={handleSubmit} noValidate className="mt-8 flex items-end gap-4">
          <div className="flex-1 border-b border-white/25 pb-2 transition-colors focus-within:border-acid">
            <label htmlFor={inputId} className="mono-label block text-faint">
              Email
            </label>
            <input
              id={inputId}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              placeholder={NEWSLETTER.placeholder}
              aria-describedby={`${inputId}-status`}
              className="mt-2 w-full bg-transparent text-[1.05rem] tracking-[-0.02em] text-white outline-none placeholder:text-white/30"
            />
          </div>

          <button
            type="submit"
            className="group grid size-12 shrink-0 place-items-center rounded-pill border border-white/25 text-lg transition-colors duration-300 hover:border-acid hover:bg-acid hover:text-ink"
          >
            <span
              aria-hidden="true"
              className="transition-transform duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              ↗
            </span>
            <span className="sr-only">S&apos;inscrire à la newsletter</span>
          </button>
        </form>

        <p
          id={`${inputId}-status`}
          role="status"
          aria-live="polite"
          className={`mono-label mt-4 min-h-4 ${
            status?.tone === "error" ? "text-[#ff8f7a]" : "text-acid"
          }`}
        >
          {status?.message ?? ""}
        </p>
      </Reveal>
    </div>
  );
}
