import { describe, expect, test } from "bun:test";
import { applyTheme, readTheme, resolveTheme, THEME_KEY } from "./theme.ts";

const memoryStorage = (initial: Record<string, string> = {}) => {
  const data = new Map(Object.entries(initial));
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => data.set(key, value),
    data,
  };
};

const failingStorage = {
  getItem: (): string | null => {
    throw new Error("blocked");
  },
  setItem: () => {
    throw new Error("blocked");
  },
};

describe("theme", () => {
  test("dark is the default for anything but an explicit light choice", () => {
    expect(resolveTheme(null)).toBe("dark");
    expect(resolveTheme("dark")).toBe("dark");
    expect(resolveTheme("system")).toBe("dark");
    expect(resolveTheme("light")).toBe("light");
  });

  test("reads the remembered choice and falls back to dark when storage fails", () => {
    expect(readTheme(memoryStorage({ [THEME_KEY]: "light" }))).toBe("light");
    expect(readTheme(memoryStorage())).toBe("dark");
    expect(readTheme(failingStorage)).toBe("dark");
  });

  test("applies light as an attribute, removes it for dark, and remembers the choice", () => {
    const root = { dataset: {} as Record<string, string> } as unknown as HTMLElement;
    const storage = memoryStorage();
    applyTheme("light", root, storage);
    expect(root.dataset.theme).toBe("light");
    expect(storage.data.get(THEME_KEY)).toBe("light");
    applyTheme("dark", root, storage);
    expect(root.dataset.theme).toBeUndefined();
    expect(storage.data.get(THEME_KEY)).toBe("dark");
  });

  test("still switches the page when storage is blocked", () => {
    const root = { dataset: {} as Record<string, string> } as unknown as HTMLElement;
    applyTheme("light", root, failingStorage);
    expect(root.dataset.theme).toBe("light");
  });
});
