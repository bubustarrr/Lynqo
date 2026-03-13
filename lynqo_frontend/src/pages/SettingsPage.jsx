import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from 'react-i18next'; // Új import
import { Spinner } from 'react-bootstrap';
import './SettingsPage.css';

export default function SettingsPage() {
  const { token } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, translations } = useLanguage();
  const { i18n } = useTranslation(); // i18n inicializálása
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const t = translations[language] || translations['en'] || {};

  const [userSettings, setUserSettings] = useState({
    notificationsEnabled: true,
    dailyGoalMinutes: 15, 
    soundEnabled: true, 
    darkMode: theme === 'dark'
  });
  
  const dailyGoals = [5, 10, 15, 20, 30, 45, 60];

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
            dailyGoalMinutes: dbSettings.dailyGoalMinutes ?? prev.dailyGoalMinutes,
            notificationsEnabled: dbSettings.notificationsEnabled ?? prev.notificationsEnabled
          }));

          if (dbSettings.darkMode && theme === 'light') {
              toggleTheme();
          } else if (!dbSettings.darkMode && theme === 'dark') {
              toggleTheme();
          }
        }
      } catch (error) {
        console.error("Failed to load settings from DB:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [token]); 

  const handleSave = async () => {
    setSaving(true);
    const payloadToDatabase = {
      DarkMode: userSettings.darkMode,
      SoundEnabled: userSettings.soundEnabled,
      DailyGoalMinutes: userSettings.dailyGoalMinutes,
      NotificationsEnabled: userSettings.notificationsEnabled
    };

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
        alert('Settings saved successfully!');
      } else {
        alert('Failed to save settings.');
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

  // Új nyelvválasztó kezelő
  const handleLanguageChange = (e) => {
    const langCode = e.target.value;
    setLanguage(langCode);
    i18n.changeLanguage(langCode);
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
          <h1 className="settings-title">⚙️ {t.settings || "Settings"}</h1>
          <p className="settings-subtitle">Manage your preferences and learning goals</p>
        </div>
        <button className="save-button" onClick={handleSave} disabled={saving}>
          {saving ? '⏳ Saving...' : '💾 Save Changes'}
        </button>
      </div>

      <div className="settings-container">
        <section className="settings-card">
          <h2 className="card-title">🖥️ Interface & System</h2>
          
          {/* NYELVVÁLASZTÓ SZEKCIÓ */}
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">App Language</span>
              <span className="setting-desc">Choose the display language of the interface</span>
            </div>
            <select 
              className="settings-select" 
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

          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Dark Mode</span>
              <span className="setting-desc">Switch between light and dark theme</span>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" checked={userSettings.darkMode} onChange={handleDarkModeToggle} />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Sound Effects</span>
              <span className="setting-desc">Play sounds when completing lessons</span>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={userSettings.soundEnabled} 
                onChange={(e) => setUserSettings({...userSettings, soundEnabled: e.target.checked})} 
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </section>

        <section className="settings-card">
          <h2 className="card-title">🔔 Notifications</h2>
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Email Reminders</span>
              <span className="setting-desc">Receive daily notifications to keep your streak alive</span>
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