import React, { useState } from "react";
import "./LanguageSelector.css";
import { useLanguage } from "../../context/LanguageContext";

const LanguageCourses = () => {
  const initialLanguages = [
    { name: "Spanish", learners: "48.8M", unlocked: true },
    { name: "French", learners: "27.2M", unlocked: true },
    { name: "Deutsch", learners: "24.4M", unlocked: true },
    { name: "Korean", learners: "17.8M", unlocked: false },
    { name: "Italian", learners: "13.4M", unlocked: false },
    { name: "Chinese", learners: "11.8M", unlocked: false },
    { name: "Russian", learners: "9.81M", unlocked: false },
    { name: "Arabic", learners: "8.46M", unlocked: false },
    { name: "Portuguese", learners: "6.12M", unlocked: false },
  ];

  const interfaceLanguages = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "es", name: "Español", nativeName: "Español" },
    { code: "de", name: "Deutsch", nativeName: "Deutsch" },
    { code: "fr", name: "Français", nativeName: "Français" },
    { code: "it", name: "Italiano", nativeName: "Italiano" },
    { code: "hu", name: "Magyar", nativeName: "Magyar" },
    { code: "nl", name: "Nederlands", nativeName: "Nederlands" },
    { code: "pl", name: "Polski", nativeName: "Polski" },
    { code: "pt", name: "Português", nativeName: "Português" },
    { code: "ro", name: "Română", nativeName: "Română" },
    { code: "sv", name: "Svenska", nativeName: "Svenska" },
    { code: "tl", name: "Tagalog", nativeName: "Tagalog" },
    { code: "vi", name: "Tiếng Việt", nativeName: "Tiếng Việt" },
    { code: "tr", name: "Türkçe", nativeName: "Türkçe" },
    { code: "el", name: "Ελληνικά", nativeName: "Ελληνικά" },
    { code: "ru", name: "Русский", nativeName: "Русский" },
    { code: "uk", name: "Українська", nativeName: "Українська" },
    { code: "he", name: "עברית", nativeName: "עברית" },
    { code: "hi", name: "हिन्दी", nativeName: "हिन्दी" },
    { code: "th", name: "ไทย", nativeName: "ไทย" },
    { code: "ar", name: "العربية", nativeName: "العربية" },
    { code: "ko", name: "한국어", nativeName: "한국어" },
  ];

  const unlockedInterfaceLanguages = ["en", "es", "de", "fr"];

  const [languages, setLanguages] = useState(initialLanguages);
  const [selectedInterfaceLang, setSelectedInterfaceLang] = useState("en");

  const { language, setLanguage, translations } = useLanguage();
  const t = translations[language];

  const toggleLanguageUnlock = (index) => {
    if (!initialLanguages[index].unlocked) return;

    const updated = [...languages];
    updated[index].unlocked = !updated[index].unlocked;
    setLanguages(updated);
  };

  const getSelectedLanguageName = () => {
    const lang = interfaceLanguages.find((l) => l.code === selectedInterfaceLang);
    return lang ? lang.nativeName : "English";
  };

  return (
    <div className="language-courses-container">
      <header className="header">
        <h1>{t.coursesTitle}</h1>
        <div className="subtitle">{t.coursesSubtitle}</div>
      </header>

      <main className="main-content">
        <div className="language-grid">
          {languages.map((language, index) => {
            const wasInitiallyUnlocked = initialLanguages[index].unlocked;

            return (
              <div
                key={language.name}
                className={`language-card ${
                  language.unlocked ? "unlocked" : "locked"
                } ${wasInitiallyUnlocked ? "clickable" : ""}`}
                onClick={() => wasInitiallyUnlocked && toggleLanguageUnlock(index)}
                style={{ cursor: wasInitiallyUnlocked ? "pointer" : "default" }}
              >
                <div className="language-name">{language.name}</div>
                <div className="learners-count">
                  {language.learners} {t.learnersWorldwide}
                </div>
                <div className="status-indicator">
                  {language.unlocked ? t.unlocked : t.locked}
                </div>
                {!wasInitiallyUnlocked && (
                  <div className="coming-soon">{t.comingSoon}</div>
                )}
              </div>
            );
          })}
        </div>

        <div className="interface-language-section">
       

         
         

          <div className="interface-footer">
            
            <div className="learners-count-large">
              21.9M {t.learnersWorldwide}
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>{t.footerText1}</p>
        <p>{t.footerText2}</p>
      </footer>
    </div>
  );
};

export default LanguageCourses;