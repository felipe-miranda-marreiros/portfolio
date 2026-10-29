const monthDate = (value: string) => {
  const [year, month] = value.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1));
};

/**
 * Formats an Experience period in years for a Locale, with a machine-readable `datetime` for `<time>`.
 * @param ongoing Wraps the start year of a current role, e.g. "{{start}} – Present" from the UI strings.
 */
export function formatPeriod(
  locale: string,
  start: string,
  end: string | undefined,
  ongoing: (start: string) => string,
) {
  const years = new Intl.DateTimeFormat(locale, { year: "numeric", timeZone: "UTC" });
  if (!end) return { datetime: start, label: ongoing(years.format(monthDate(start))) };
  return { datetime: `${start}/${end}`, label: years.formatRange(monthDate(start), monthDate(end)) };
}
