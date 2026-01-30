import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const translations = {
  en: {
    coursesTitle: "Courses for English Speakers",
    coursesSubtitle: "Learn a new language with our interactive courses",
    iSpeak: "I speak",
    allLanguages: "All languages",
    learnersWorldwide: "learners worldwide",
    unlocked: "✓ Unlocked",
    locked: "🔒 Locked",
    comingSoon: "Coming soon",
    footerText1: "Learn anytime, anywhere.",
    footerText2: "More languages coming soon.",
  },
  es: {
    coursesTitle: "Cursos para hablantes de inglés",
    coursesSubtitle: "Aprende un nuevo idioma con nuestros cursos interactivos",
    iSpeak: "Yo hablo",
    allLanguages: "Todos los idiomas",
    learnersWorldwide: "estudiantes en todo el mundo",
    unlocked: "✓ Desbloqueado",
    locked: "🔒 Bloqueado",
    comingSoon: "Próximamente",
    footerText1: "Aprende en cualquier momento y lugar.",
    footerText2: "Más idiomas pronto.",
  },
  de: {
    coursesTitle: "Kurse für Englischsprachige",
    coursesSubtitle: "Lerne eine neue Sprache mit unseren interaktiven Kursen",
    iSpeak: "Ich spreche",
    allLanguages: "Alle Sprachen",
    learnersWorldwide: "Lernende weltweit",
    unlocked: "✓ Freigeschaltet",
    locked: "🔒 Gesperrt",
    comingSoon: "Kommt bald",
    footerText1: "Lerne jederzeit und überall.",
    footerText2: "Mehr Sprachen bald verfügbar.",
  },
  fr: {
    coursesTitle: "Cours pour anglophones",
    coursesSubtitle: "Apprenez une nouvelle langue avec nos cours interactifs",
    iSpeak: "Je parle",
    allLanguages: "Toutes les langues",
    learnersWorldwide: "apprenants dans le monde",
    unlocked: "✓ Débloqué",
    locked: "🔒 Verrouillé",
    comingSoon: "Bientôt disponible",
    footerText1: "Apprenez partout et à tout moment.",
    footerText2: "Plus de langues bientôt.",
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const value = {
    language,
    setLanguage,
    translations,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};