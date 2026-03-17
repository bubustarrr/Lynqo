import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from 'react-i18next'; 
import { Spinner } from 'react-bootstrap';
import './SettingsPage.css';

export default function SettingsPage() {
  const { token } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage(); 
  const { t, i18n } = useTranslation(); 
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [userSettings, setUserSettings] = useState({
    notificationsEnabled: true,
    dailyGoalMinutes: 15, 
    soundEnabled: true, 
    darkMode: theme === 'dark'
  });
  
  useEffect(() => {
    if (!token) {
        setLoading(false);
        return;
    }

    const fetchSettings = async () => {
      try {
        const response = await fetch('https://localhost:7118/api/Settings', {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          const dbSettings = await response.json();
          
          setUserSettings(prev => ({
            ...prev,
            darkMode: dbSettings.darkMode ?? prev.darkMode,
            soundEnabled: dbSettings.soundEnabled ?? prev.soundEnabled,
            dailyGoalMinutes: prev.dailyGoalMinutes, 
            notificationsEnabled: dbSettings.notificationsEnabled ?? prev.notificationsEnabled
          }));

          // Téma beállítása
          if (dbSettings.darkMode && theme === 'light') {
              toggleTheme();
          } else if (!dbSettings.darkMode && theme === 'dark') {
              toggleTheme();
          }

          // 🔥 Nyelv beállítása az adatbázis alapján, és mentés Local Storage-ba 🔥
          if (dbSettings.uiLanguage && dbSettings.uiLanguage !== language) {
              setLanguage(dbSettings.uiLanguage); 
              i18n.changeLanguage(dbSettings.uiLanguage); 
              localStorage.setItem('appLanguage', dbSettings.uiLanguage); // <--- Ezt adtuk hozzá
          }
        }
      } catch (error) {
        console.error("Failed to load settings from DB:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]); 

  const handleSave = async () => {
    setSaving(true);
    
    const payloadToDatabase = {
      DarkMode: userSettings.darkMode,
      SoundEnabled: userSettings.soundEnabled,
      NotificationsEnabled: userSettings.notificationsEnabled,
      UiLanguage: language // Ezt küldjük a C# backendnek
    };

    // CSAK EGYSZER küldjük el a kérést! (A többszörös try-catch duplikációt töröltem)
    try {
      const response = await fetch('https://localhost:7118/api/Settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(payloadToDatabase)
      });
      
      if(response.ok) {
        alert(t('success_save'));
      } else {
        alert(t('error_save'));
      }
    } catch (error) {
      console.error('Network error:', error);
    } finally {
        setSaving(false);
    }
  };

  const handleDarkModeToggle = (e) => {
    const isDark = e.target.checked;
    setUserSettings({ ...userSettings, darkMode: isDark });
    if ((isDark && theme === 'light') || (!isDark && theme === 'dark')) {
      toggleTheme();
    }
  };

  const handleLanguageChange = (e) => {
    const langCode = e.target.value;
    setLanguage(langCode);
    i18n.changeLanguage(langCode);
    localStorage.setItem('appLanguage', langCode); // 🔥 Mentés Local Storage-ba váltáskor 🔥
  };

  if (loading) {
      return (
          <div className="d-flex justify-content-center align-items-center vh-100">
              <Spinner animation="border" variant="primary" />
          </div>
      );
  }

  return (
    <div className="settings-page">
      <div className="settings-header">
        <div className="header-titles">
          <h1 className="settings-title">⚙️ {t('settings')}</h1>
          <p className="settings-subtitle">{t('subtitle')}</p>
        </div>
        <button className="save-button" onClick={handleSave} disabled={saving}>
          {saving ? `⏳ ${t('saving')}` : `💾 ${t('save_changes')}`}
        </button>
      </div>

      <div className="settings-container">
        <section className="settings-card">
          <h2 className="card-title">🖥️ {t('interface_system')}</h2>
          
          <div className="setting-item language-selector-wrapper">
  <div className="setting-info">
    <span className="setting-label">{t('app_language')}</span>
    <span className="setting-desc">{t('app_language_desc')}</span>
  </div>
  <div className="select-container">
    <select 
      className="select-field"  /* <--- Fontos: a CSS-ben ez van megstílozva! */
      value={language} 
      onChange={handleLanguageChange}
    >
      <option value="en">🇺🇸 English</option>
      <option value="es">🇪🇸 Español</option>
      <option value="fr">🇫🇷 Français</option>
      <option value="de">🇩🇪 Deutsch</option>
      <option value="hu">🇭🇺 Magyar</option>
    </select>
  </div>
</div>
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">{t('dark_mode')}</span>
              <span className="setting-desc">{t('dark_mode_desc')}</span>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" checked={userSettings.darkMode} onChange={handleDarkModeToggle} />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </section>

        <section className="settings-card">
          <h2 className="card-title">🔔 {t('notifications')}</h2>
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">{t('email_reminders')}</span>
              <span className="setting-desc">{t('email_reminders_desc')}</span>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={userSettings.notificationsEnabled}
                onChange={(e) => setUserSettings({...userSettings, notificationsEnabled: e.target.checked})}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </section>
      </div>
    </div>
  );
}