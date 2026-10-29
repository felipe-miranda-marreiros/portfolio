/**
 * Content shapes the CMS edits, standing in for the Contract until roadmap phase 4 defines them in `packages/contracts`.
 */

export type Locale = "en" | "pt-BR";

export type Localized = Record<Locale, string>;

export type Status = "draft" | "published";

/** Product names such as "React": they don't translate. Order is the Owner's. */
export interface Skill {
  id: string;
  name: string;
}

export interface Experience {
  id: string;
  status: Status;
  role: Localized;
  organization: string;
  location: string;
  /** `YYYY-MM`. */
  start: string;
  /** `YYYY-MM`; absent while the role is current. */
  end?: string;
  /** Skill ids used in this role. */
  stack: string[];
  summary: Localized;
}

export type ExperienceInput = Omit<Experience, "id" | "status">;

export interface Profile {
  status: Status;
  name: string;
  shortName: string;
  greeting: Localized;
  role: Localized;
  lead: Localized;
  email: string;
  portrait?: string;
  github?: string;
  linkedin?: string;
}

export type ProfileInput = Omit<Profile, "status">;

/** What the user asked for when submitting: keep a Draft, or Publish (every Locale complete, ADR 0004). */
export type Intent = "draft" | "publish";
