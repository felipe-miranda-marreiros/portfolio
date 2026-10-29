/**
 * Sample Content standing in for the API until the Contract (roadmap phase 4) defines Profile and Experience.
 * The name and GitHub link are the Owner's; the skills, roles, companies, email and portrait are placeholders, not real history.
 * Run with `FIXTURES=empty` to see the Portfolio before anything is Published.
 */

export type Locale = "en" | "pt-BR";

type Localized = Record<Locale, string>;

export interface Profile {
  name: string;
  shortName: string;
  greeting: Localized;
  role: Localized;
  lead: Localized;
  email: string;
  cv?: { href: string };
  portrait?: { src: string };
  links: { label: string; href: string }[];
}

export interface Experience {
  role: Localized;
  organization: string;
  location: string;
  /** Month precision, `YYYY-MM`. */
  start: string;
  /** Absent while the role is current. */
  end?: string;
  /** Technologies used in this role; product names, so they don't translate. */
  stack?: string[];
  summary?: Localized;
}

const empty = import.meta.env.FIXTURES === "empty";

const sampleProfile: Profile = {
  name: "Felipe Miranda Marreiros",
  shortName: "Felipe",
  greeting: { en: "Hi, I’m", "pt-BR": "Oi, eu sou o" },
  role: { en: "an AI engineer.", "pt-BR": "engenheiro de IA." },
  lead: {
    en: "I ship software where language models do real work, and the tests that keep them honest.",
    "pt-BR":
      "Entrego software em que modelos de linguagem fazem trabalho de verdade, e os testes que os mantêm confiáveis.",
  },
  email: "hello@example.com",
  cv: { href: "/cv.pdf" },
  portrait: { src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80&auto=format&fit=crop" },
  links: [{ label: "GitHub", href: "https://github.com/felipe-miranda-marreiros" }],
};

/** `null` until the Owner Publishes a profile. */
export const profile: Profile | null = empty ? null : sampleProfile;

/** Technology names in the Owner's order; product names, so they don't translate. */
export const skills: string[] = empty
  ? []
  : ["React", "React Native", "TypeScript", "Node.js", "Python", "PostgreSQL", "Docker"];

/** Newest first. */
export const experience: Experience[] = empty
  ? []
  : [
      {
        role: { en: "AI Engineer", "pt-BR": "Engenheiro de IA" },
        organization: "Ponte Labs",
        location: "São Paulo",
        start: "2024-03",
        stack: ["Python", "TypeScript", "Node.js", "PostgreSQL"],
        summary: {
          en: "Agent workflows for internal tooling and the evaluation harness that gates every LLM feature.",
          "pt-BR":
            "Fluxos com agentes para ferramentas internas e o harness de avaliação que controla cada recurso com LLM.",
        },
      },
      {
        role: { en: "Senior Software Engineer", "pt-BR": "Engenheiro de Software Sênior" },
        organization: "Tessera Saúde",
        location: "Recife",
        start: "2022-01",
        end: "2024-02",
        stack: ["React", "React Native", "TypeScript", "Node.js"],
        summary: {
          en: "Led the scheduling platform for a network of clinics, from the booking API to the patient app.",
          "pt-BR":
            "Liderei a plataforma de agendamento de uma rede de clínicas, da API de reservas ao app do paciente.",
        },
      },
      {
        role: { en: "Software Engineer", "pt-BR": "Engenheiro de Software" },
        organization: "Atlas Pagamentos",
        location: "São Paulo",
        start: "2020-02",
        end: "2021-12",
        stack: ["Node.js", "TypeScript", "PostgreSQL", "Docker"],
        summary: {
          en: "Payments API and the reconciliation services behind it.",
          "pt-BR": "API de pagamentos e os serviços de conciliação por trás dela.",
        },
      },
      {
        role: { en: "Junior Developer", "pt-BR": "Desenvolvedor Júnior" },
        organization: "Estúdio Vela",
        location: "Recife",
        start: "2018-06",
        end: "2020-01",
        stack: ["React", "JavaScript"],
      },
    ];
