import { describe, expect, test } from "bun:test";
import { formatPeriod } from "./period";

const ongoing = (start: string) => `${start} – Present`;

describe("formatPeriod", () => {
  test("a closed period is a year range with a start/end datetime", () => {
    expect(formatPeriod("en", "2022-01", "2024-02", ongoing)).toEqual({
      datetime: "2022-01/2024-02",
      label: "2022 – 2024",
    });
  });

  test("a period within one year collapses to that year", () => {
    expect(formatPeriod("pt-BR", "2024-01", "2024-06", ongoing).label).toBe("2024");
  });

  test("a current role ends with the translated word, not a bare dash", () => {
    expect(formatPeriod("en", "2024-03", undefined, ongoing)).toEqual({
      datetime: "2024-03",
      label: "2024 – Present",
    });
  });
});
