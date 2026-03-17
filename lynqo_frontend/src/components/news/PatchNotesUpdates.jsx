import React from 'react';
import { useTranslation } from 'react-i18next'; // Import

// Itt is lecseréljük a szövegeket a JSON fájlban lévő kulcsokra
const updates = [
  { id: 1, version: "v2.4.1", translationKey: "v2_4_1" },
  { id: 2, version: "v2.4.0", translationKey: "v2_4_0" },
  { id: 3, version: "v2.3.5", translationKey: "v2_3_5" }
];

const PatchNotesUpdates = () => {
  const { t } = useTranslation();

  return (
    <aside className="sidebar-column">
      <h2 className="column-title">{t('newsPage.patch_notes_title')}</h2>
      <div className="sidebar-wrapper">
        {updates.map((update) => (
          <div key={update.id} className="update-card">
            <div className="update-header">
              <span className="version-badge">{update.version}</span>
              <span className="update-date">{t(`newsPage.updates.${update.translationKey}.date`)}</span>
            </div>
            <h4 className="update-title">{t(`newsPage.updates.${update.translationKey}.title`)}</h4>
            <p className="update-details">{t(`newsPage.updates.${update.translationKey}.details`)}</p>
          </div>
        ))}
        
        <div className="promo-card">
          <h3>{t('newsPage.join_discord')}</h3>
          <p>{t('newsPage.discord_desc')}</p>
          <a 
            href="https://discord.gg/QwGrCYnCAe" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="discord-btn"
          >
            {t('newsPage.join_now')}
          </a>
        </div>
      </div>
    </aside>
  );
};

export default PatchNotesUpdates;