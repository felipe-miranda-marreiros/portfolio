const years = new Intl.DateTimeFormat("en", { year: "numeric", timeZone: "UTC" });

const monthDate = (value: string) => {
  const [year, month] = value.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1));
};

/** An Experience period in the CMS's English: "2022 – 2024", or "2024 – Present" for a current role. */
export function formatPeriod(start: string, end?: string): string {
  if (!end) return `${years.format(monthDate(start))} – Present`;
  return years.formatRange(monthDate(start), monthDate(end));
}
