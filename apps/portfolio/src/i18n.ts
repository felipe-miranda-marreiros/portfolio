import i18next, { type TFunction } from "i18next";
import type { Locale } from "./fixtures/profile";

/** Route segment for each Locale: `/en`, `/pt-br`. */
export const LOCALE_PATHS: Record<Locale, string> = { en: "en", "pt-BR": "pt-br" };

const resources = {
  en: {
    translation: {
      skip: "Skip to content",
      sections: "Sections",
      experience: "Experience",
      contact: "Contact",
      language: "Language",
      theme: "Theme",
      darkTheme: "Dark theme",
      lightTheme: "Light theme",
      downloadCv: "Download CV",
      stack: "Stack",
      ongoing: "{{start}} – Present",
      email: "Email",
      holdingTitle: "This portfolio is being set up.",
      holdingBody: "Check back soon.",
    },
  },
  "pt-BR": {
    translation: {
      skip: "Pular para o conteúdo",
      sections: "Seções",
      experience: "Experiência",
      contact: "Contato",
      language: "Idioma",
      theme: "Tema",
      darkTheme: "Tema escuro",
      lightTheme: "Tema claro",
      downloadCv: "Baixar currículo",
      stack: "Stack",
      ongoing: "{{start}} – Atual",
      email: "E-mail",
      holdingTitle: "Este portfólio está sendo preparado.",
      holdingBody: "Volte em breve.",
    },
  },
};

const i18n = i18next.createInstance();
await i18n.init({ resources, lng: "en", fallbackLng: false, interpolation: { escapeValue: false } });

/** UI strings for one Locale. Content strings come from the API, never from here. */
export const translator = (locale: Locale): TFunction => i18n.getFixedT(locale);
