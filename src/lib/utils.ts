/** Conditional className joiner — no dependency, stable ordering. */
export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(" ");
}

const FRENCH_NUMBER = new Intl.NumberFormat("fr-FR");

export function formatNumber(value: number): string {
  return FRENCH_NUMBER.format(Math.round(value));
}
