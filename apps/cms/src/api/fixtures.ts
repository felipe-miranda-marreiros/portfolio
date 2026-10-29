import type { Experience, Profile, Skill } from "./types";

/** Sample Content: the name is the Owner's; everything else is a placeholder, not real history. */

export const skills: Skill[] = [
  { id: "react", name: "React" },
  { id: "react-native", name: "React Native" },
  { id: "typescript", name: "TypeScript" },
  { id: "node", name: "Node.js" },
  { id: "python", name: "Python" },
  { id: "postgresql", name: "PostgreSQL" },
  { id: "docker", name: "Docker" },
];

export const experience: Experience[] = [
  {
    id: "ponte-labs",
    status: "published",
    role: { en: "AI Engineer", "pt-BR": "Engenheiro de IA" },
    organization: "Ponte Labs",
    location: "São Paulo",
    start: "2024-03",
    stack: ["python", "typescript", "node", "postgresql"],
    summary: {
      en: "Agent workflows for internal tooling and the evaluation harness that gates every LLM feature.",
      "pt-BR":
        "Fluxos com agentes para ferramentas internas e o harness de avaliação que controla cada recurso com LLM.",
    },
  },
  {
    id: "tessera-saude",
    status: "published",
    role: { en: "Senior Software Engineer", "pt-BR": "Engenheiro de Software Sênior" },
    organization: "Tessera Saúde",
    location: "Recife",
    start: "2022-01",
    end: "2024-02",
    stack: ["react", "react-native", "typescript", "node"],
    summary: {
      en: "Led the scheduling platform for a network of clinics, from the booking API to the patient app.",
      "pt-BR": "Liderei a plataforma de agendamento de uma rede de clínicas, da API de reservas ao app do paciente.",
    },
  },
  {
    id: "atlas-pagamentos",
    status: "draft",
    role: { en: "Software Engineer", "pt-BR": "" },
    organization: "Atlas Pagamentos",
    location: "São Paulo",
    start: "2020-02",
    end: "2021-12",
    stack: ["node", "typescript", "postgresql", "docker"],
    summary: { en: "Payments API and the reconciliation services behind it.", "pt-BR": "" },
  },
];

export const profile: Profile = {
  status: "published",
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
  portrait: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80&auto=format&fit=crop",
  github: "https://github.com/felipe-miranda-marreiros",
};
