import * as fixtures from "./fixtures";
import type { Experience, ExperienceInput, Intent, Profile, ProfileInput, Skill } from "./types";

/**
 * An in-memory stand-in for the API, so the pages can be designed before it exists.
 * Add `?slow`, `?fail` or `?empty` to the URL to review the loading, error and empty states;
 * `?empty` is the first setup, with no profile, experience or skills saved.
 */

export class ApiError extends Error {}

const mode = new URLSearchParams(location.search);
const store: { experience: Experience[]; profile: Profile | null; skills: Skill[] } = mode.has("empty")
  ? { experience: [], profile: null, skills: [] }
  : structuredClone({ experience: fixtures.experience, profile: fixtures.profile, skills: fixtures.skills });

async function respond<T>(value: () => T): Promise<T> {
  await new Promise((resolve) => setTimeout(resolve, mode.has("slow") ? 1600 : 250));
  if (mode.has("fail")) throw new ApiError("The API didn’t answer.");
  return structuredClone(value());
}

const slug = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function find<T extends { id: string }>(items: T[], id: string): T {
  const item = items.find((candidate) => candidate.id === id);
  if (!item) throw new ApiError("That item doesn’t exist any more.");
  return item;
}

/** The API's own Publish rule (ADR 0004); the CMS checks it first only to answer faster. */
function assertComplete(values: Record<string, unknown>, intent: Intent) {
  if (intent !== "publish") return;
  const missing = Object.values(values).some(
    (value) => typeof value === "object" && value !== null && "pt-BR" in value && !String(value["pt-BR"]).trim(),
  );
  if (missing) throw new ApiError("Every field needs both Locales before it can be Published.");
}

export const api = {
  signIn: (email: string, password: string) =>
    respond(() => {
      if (!email || !password) throw new ApiError("Enter your email and password.");
      return { email };
    }),

  listExperience: () => respond(() => store.experience),
  getExperience: (id: string) => respond(() => find(store.experience, id)),
  saveExperience: (id: string | undefined, input: ExperienceInput, intent: Intent) =>
    respond(() => {
      assertComplete({ ...input }, intent);
      const status = intent === "publish" ? "published" : "draft";
      if (!id) {
        const created: Experience = { ...input, id: slug(`${input.organization} ${input.start}`), status };
        store.experience.unshift(created);
        return created;
      }
      return Object.assign(find(store.experience, id), input, { status });
    }),
  deleteExperience: (id: string) =>
    respond(() => {
      store.experience = store.experience.filter((item) => item.id !== id);
    }),

  /** `null` until the Owner first saves a profile. */
  getProfile: () => respond(() => store.profile),
  saveProfile: (input: ProfileInput, intent: Intent) =>
    respond((): Profile => {
      assertComplete({ ...input }, intent);
      const saved: Profile = { ...input, status: intent === "publish" ? "published" : "draft" };
      store.profile = saved;
      return saved;
    }),

  listSkills: () => respond(() => store.skills),
  addSkill: (name: string) =>
    respond((): Skill => {
      if (store.skills.some((skill) => skill.name.toLowerCase() === name.toLowerCase()))
        throw new ApiError(`“${name}” is already in your skills.`);
      const skill = { id: slug(name) || crypto.randomUUID(), name };
      store.skills.push(skill);
      return skill;
    }),
  moveSkill: (id: string, offset: -1 | 1) =>
    respond(() => {
      const from = store.skills.findIndex((skill) => skill.id === id);
      const to = from + offset;
      if (from < 0 || to < 0 || to >= store.skills.length) return;
      const [skill] = store.skills.splice(from, 1);
      store.skills.splice(to, 0, skill);
    }),
  deleteSkill: (id: string) =>
    respond(() => {
      const used = store.experience.filter((item) => item.stack.includes(id)).length;
      if (used) throw new ApiError(`It’s used in ${used} ${used === 1 ? "role" : "roles"}. Remove it there first.`);
      store.skills = store.skills.filter((skill) => skill.id !== id);
    }),
};
