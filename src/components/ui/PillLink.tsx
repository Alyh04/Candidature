import { AnchorLink } from "@/components/ui/AnchorLink";
import { Magnetic } from "@/components/ui/Magnetic";
import { cn } from "@/lib/utils";

type PillLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "dark";
  onNavigate?: () => void;
};

/** Pill call-to-action that inverts to acid and lifts a hair on hover. */
export function PillLink({
  href,
  children,
  className,
  tone = "light",
  onNavigate,
}: PillLinkProps) {
  const isDark = tone === "dark";

  return (
    <Magnetic strength={0.24} className={cn("inline-block", className)}>
      <AnchorLink
        href={href}
        onNavigate={onNavigate}
        className={cn(
          "group inline-flex items-center gap-7 rounded-pill px-7 py-4 text-[0.95rem] font-medium tracking-[-0.02em] transition-colors duration-300",
          isDark
            ? "bg-white text-ink hover:bg-acid"
            : "bg-ink text-white hover:bg-acid hover:text-ink",
        )}
      >
        <span>{children}</span>
        <span
          aria-hidden="true"
          className="text-lg transition-transform duration-500 ease-expo group-hover:translate-x-1 group-hover:-translate-y-1"
        >
          ↗
        </span>
      </AnchorLink>
    </Magnetic>
  );
}
