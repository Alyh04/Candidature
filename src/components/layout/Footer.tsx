import { AnchorLink } from "@/components/ui/AnchorLink";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { FOOTER, NAV_ITEMS, SIGNATURE, SITE } from "@/content/site";

/** Rendered on the server, so a statically generated page never shows a stale year. */
const BUILD_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="bg-night px-[var(--spacing-gutter)] pt-20 pb-8 text-white lg:pt-28">
      <div className="shell">
        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-[1.4fr_1fr] lg:gap-x-16">
          <div>
            <SplitText
              as="p"
              text={SITE.display.join("\n")}
              className="text-[clamp(3rem,13vw,10rem)] font-black leading-[0.82] tracking-[-0.085em]"
            />
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-[42ch] text-[1.05rem] leading-relaxed text-faint">
                {SITE.description}
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <FooterColumn title="Navigation">
              {NAV_ITEMS.map((item) => (
                <AnchorLink key={item.id} href={item.href} className="link-underline w-fit">
                  {item.label}
                </AnchorLink>
              ))}
            </FooterColumn>

            <FooterColumn title="Social">
              {FOOTER.socials.map((social) => (
                <a key={social.label} href={social.href} className="link-underline w-fit">
                  {social.label}
                </a>
              ))}
            </FooterColumn>

            <FooterColumn title="Contact">
              <a href={SIGNATURE.emailHref} className="link-underline w-fit break-all">
                {SIGNATURE.email}
              </a>
              <a href={SIGNATURE.phoneHref} className="link-underline w-fit">
                {SIGNATURE.phone}
              </a>
            </FooterColumn>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-night-line pt-6 lg:mt-24 lg:flex-row lg:items-center lg:justify-between">
          <p className="mono-label text-faint" suppressHydrationWarning>
            © {BUILD_YEAR} {SITE.tagline}
          </p>
          <p className="mono-label text-faint">{FOOTER.builtWith}</p>
          <p className="mono-label text-faint">{FOOTER.legal}</p>
        </div>
      </div>
    </footer>
  );
}

type FooterColumnProps = {
  title: string;
  children: React.ReactNode;
};

function FooterColumn({ title, children }: FooterColumnProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="mono-label text-faint">{title}</p>
      <div className="mt-1 flex flex-col gap-2.5 text-[0.95rem] text-white/80">{children}</div>
    </div>
  );
}
