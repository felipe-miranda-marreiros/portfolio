import { z } from "zod";
import type { Intent, Profile, ProfileInput } from "../api/types";
import type { FieldMap } from "./useIntentForm";

const optionalUrl = z
  .string()
  .trim()
  .refine((value) => !value || URL.canParse(value), "enter a full address, starting with https://");

/** What the Profile form validates for each intent; Publish adds every pt-BR field (ADR 0004). */
export const profileSchema = (intent: Intent) => {
  const pt = intent === "publish" ? z.string().trim().min(1, "required to publish") : z.string();
  const pair = (message: string) => z.object({ en: z.string().trim().min(1, message), pt });
  return z.object({
    name: z.string().trim().min(1, "enter your full name"),
    shortName: z.string().trim().min(1, "enter the name you go by"),
    greeting: pair("enter the greeting"),
    role: pair("enter your role"),
    lead: pair("enter the statement"),
    email: z.string().trim().pipe(z.email("enter an email like name@example.com")),
    portrait: z.string().optional(),
    github: optionalUrl,
    linkedin: optionalUrl,
  });
};

export type ProfileValues = z.infer<ReturnType<typeof profileSchema>>;

export const profileFields: FieldMap = {
  name: { id: "name", label: "Full name" },
  shortName: { id: "short-name", label: "Short name" },
  "greeting.en": { id: "greeting-en", label: "Greeting (English)" },
  "greeting.pt": { id: "greeting-pt", label: "Greeting (Portuguese)" },
  "role.en": { id: "role-en", label: "Role (English)" },
  "role.pt": { id: "role-pt", label: "Role (Portuguese)" },
  "lead.en": { id: "lead-en", label: "Statement (English)" },
  "lead.pt": { id: "lead-pt", label: "Statement (Portuguese)" },
  email: { id: "email", label: "Email" },
  github: { id: "github", label: "GitHub" },
  linkedin: { id: "linkedin", label: "LinkedIn" },
};

export const toValues = (profile: Profile): ProfileValues => ({
  name: profile.name,
  shortName: profile.shortName,
  greeting: { en: profile.greeting.en, pt: profile.greeting["pt-BR"] },
  role: { en: profile.role.en, pt: profile.role["pt-BR"] },
  lead: { en: profile.lead.en, pt: profile.lead["pt-BR"] },
  email: profile.email,
  portrait: profile.portrait,
  github: profile.github ?? "",
  linkedin: profile.linkedin ?? "",
});

const localized = ({ en, pt }: { en: string; pt: string }) => ({ en: en.trim(), "pt-BR": pt.trim() });

export const toInput = (values: ProfileValues): ProfileInput => ({
  name: values.name.trim(),
  shortName: values.shortName.trim(),
  greeting: localized(values.greeting),
  role: localized(values.role),
  lead: localized(values.lead),
  email: values.email.trim(),
  portrait: values.portrait,
  github: values.github || undefined,
  linkedin: values.linkedin || undefined,
});
