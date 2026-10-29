import { z } from "zod";
import type { Experience, ExperienceInput, Intent } from "../api/types";
import type { FieldMap } from "./useIntentForm";

const YEAR = /^\d{4}$/;

/** What the Experience form validates for each intent; Publish adds every pt-BR field (ADR 0004). */
export const experienceSchema = (intent: Intent) => {
  const pt = (message: string) => (intent === "publish" ? z.string().trim().min(1, message) : z.string());
  return z
    .object({
      role: z.object({ en: z.string().trim().min(1, "enter the role"), pt: pt("required to publish") }),
      organization: z.string().trim().min(1, "enter the company name"),
      location: z.string().trim().min(1, "enter the city, or Remote"),
      startMonth: z.string(),
      startYear: z.string().trim().regex(YEAR, "enter a year with four digits"),
      present: z.boolean(),
      // Disabled while Present is ticked, and react-hook-form leaves disabled fields out of the values.
      endMonth: z.string().optional(),
      endYear: z.string().optional(),
      stack: z.array(z.string()),
      summary: z.object({ en: z.string(), pt: z.string() }),
    })
    .superRefine((values, ctx) => {
      const endYear = values.endYear?.trim() ?? "";
      if (!values.present && !YEAR.test(endYear))
        ctx.addIssue({ code: "custom", path: ["endYear"], message: "enter a year with four digits, or tick Present" });
      else if (!values.present && `${endYear}-${values.endMonth}` < `${values.startYear}-${values.startMonth}`)
        ctx.addIssue({ code: "custom", path: ["endYear"], message: "the end can’t be before the start" });
      if (intent === "publish" && values.summary.en.trim() && !values.summary.pt.trim())
        ctx.addIssue({ code: "custom", path: ["summary", "pt"], message: "required to publish" });
    });
};

export type ExperienceValues = z.infer<ReturnType<typeof experienceSchema>>;

/** Fields in page order, which is the order the error summary lists them. */
export const experienceFields: FieldMap = {
  "role.en": { id: "role-en", label: "Role (English)" },
  "role.pt": { id: "role-pt", label: "Role (Portuguese)" },
  organization: { id: "organization", label: "Company" },
  location: { id: "location", label: "Location" },
  startYear: { id: "start-year", label: "Start" },
  endYear: { id: "end-year", label: "End" },
  "summary.en": { id: "summary-en", label: "Summary (English)" },
  "summary.pt": { id: "summary-pt", label: "Summary (Portuguese)" },
};

const blank: ExperienceValues = {
  role: { en: "", pt: "" },
  organization: "",
  location: "",
  startMonth: "01",
  startYear: "",
  present: false,
  endMonth: "01",
  endYear: "",
  stack: [],
  summary: { en: "", pt: "" },
};

export function toValues(item?: Experience): ExperienceValues {
  if (!item) return blank;
  const [startYear, startMonth] = item.start.split("-");
  const [endYear, endMonth] = item.end?.split("-") ?? ["", "01"];
  return {
    role: { en: item.role.en, pt: item.role["pt-BR"] },
    organization: item.organization,
    location: item.location,
    startMonth,
    startYear,
    present: !item.end,
    endMonth,
    endYear,
    stack: item.stack,
    summary: { en: item.summary.en, pt: item.summary["pt-BR"] },
  };
}

export function toInput(values: ExperienceValues): ExperienceInput {
  return {
    role: { en: values.role.en.trim(), "pt-BR": values.role.pt.trim() },
    organization: values.organization.trim(),
    location: values.location.trim(),
    start: `${values.startYear.trim()}-${values.startMonth}`,
    end: values.present ? undefined : `${values.endYear?.trim()}-${values.endMonth}`,
    stack: values.stack,
    summary: { en: values.summary.en.trim(), "pt-BR": values.summary.pt.trim() },
  };
}
