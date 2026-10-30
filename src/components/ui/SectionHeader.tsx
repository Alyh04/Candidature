import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";

type SectionHeaderProps = {
  index: string;
  title: readonly string[];
  intro?: string;
  className?: string;
  introClassName?: string;
  titleClassName?: string;
  /** Delay the mask reveal so it lands after the section label. */
  titleDelay?: number;
  /** Tone of the display title, for sections on a dark background. */
  tone?: "light" | "dark";
};

/**
 * Shared editorial section header: mono index rail on the left, masked
 * display title plus lede on the right.
 */
export function SectionHeader({
  index,
  title,
  intro,
  className,
  introClassName,
  titleClassName,
  titleDelay = 0.05,
  tone = "light",
}: SectionHeaderProps) {
  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-y-8 lg:grid-cols-[0.3fr_1fr] lg:gap-x-12",
        className,
      )}
    >
      <Reveal y={16}>
        <p className={cn("mono-label", isDark ? "text-faint" : "text-muted")}>{index}</p>
      </Reveal>

      <div>
        <SplitText
          as="h2"
          text={title.join("\n")}
          delay={titleDelay}
          className={cn("text-section", isDark ? "text-white" : "text-ink", titleClassName)}
        />
        {intro ? (
          <Reveal delay={0.18} className="mt-8 lg:mt-10">
            <p
              className={cn(
                "text-lead max-w-[46ch]",
                isDark ? "text-faint" : "text-ink-soft",
                introClassName,
              )}
            >
              {intro}
            </p>
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}
