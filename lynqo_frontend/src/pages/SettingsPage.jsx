import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Spinner } from 'react-bootstrap';
import './SettingsPage.css';

export default function SettingsPage() {
  const { user, token } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, translations } = useLanguage();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const t = translations[language] || translations['en'] || {};

  // State matches your C# UserSettingsDTO exactly
  const [userSettings, setUserSettings] = useState({
    notificationsEnabled: true,
    dailyGoalMinutes: 15, 
    uiLanguage: language, 
    soundEnabled: true, 
    darkMode: theme === 'dark',
    learningLanguage: 'English' // Not saved in settings DB, just local state for now
  });

  const languages = ['English', 'Spanish', 'French', 'German', 'Italian'];
  
  const interfaceLanguages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' }
  ];
  
  const dailyGoals = [5, 10, 15, 20, 30, 45, 60];

  // 1. FETCH INITIAL SETTINGS FROM DB
  useEffect(() => {
    if (!token) return;

    const fetchSettings = async () => {
      try {
        const response = await fetch('https://localhost:7118/api/Settings', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
          const dbSettings = await response.json();
          // Update state with DB values
          setUserSettings(prev => ({
            ...prev,
            darkMode: dbSettings.darkMode ?? prev.darkMode,
            soundEnabled: dbSettings.soundEnabled ?? prev.soundEnabled,
            dailyGoalMinutes: dbSettings.dailyGoalMinutes ?? prev.dailyGoalMinutes,
            uiLanguage: dbSettings.uiLanguage || prev.uiLanguage,
            notificationsEnabled: dbSettings.notificationsEnabled ?? prev.notificationsEnabled
          }));

          // Apply UI Language and Theme globally if they differ
          if (dbSettings.uiLanguage && dbSettings.uiLanguage !== language) {
              setLanguage(dbSettings.uiLanguage);
          }
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


  // 2. SAVE SETTINGS TO DB
  const handleSave = async () => {
    setSaving(true);
    
    // We send data exactly matching your UserSettingsDTO.cs
    const payloadToDatabase = {
      DarkMode: userSettings.darkMode,
      SoundEnabled: userSettings.soundEnabled,
      DailyGoalMinutes: userSettings.dailyGoalMinutes,
      UiLanguage: userSettings.uiLanguage,
      NotificationsEnabled: userSettings.notificationsEnabled
    };

    try {
      const response = await fetch('https://localhost:7118/api/Settings', {
        method: 'PUT', // Or POST depending on how your backend controller is setup
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(payloadToDatabase)
      });
      
      if(response.ok) {
        alert('Settings saved successfully!');
      } else {
          alert('Failed to save settings. Check console.');
          console.error(await response.text());
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Network error while saving.');
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

  const handleInterfaceLanguageChange = (e) => {
    const selectedLang = e.target.value;
    setUserSettings({ ...userSettings, uiLanguage: selectedLang });
    setLanguage(selectedLang);
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
        
        {/* TANULÁS SZEKCIÓ */}
        <section className="settings-card">
          <h2 className="card-title">📚 Learning</h2>
          
          <div className="setting-row">
            <div className="setting-group">
              <label>Daily Goal (Minutes)</label>
              <select 
                value={userSettings.dailyGoalMinutes}
                onChange={(e) => setUserSettings({...userSettings, dailyGoalMinutes: parseInt(e.target.value)})}
                className="select-field"
              >
                {dailyGoals.map(goal => (
                  <option key={goal} value={goal}>{goal} min</option>
                ))}
              </select>
            </div>
            
            <div className="setting-group">
              <label>Learning Language (WIP)</label>
              <select 
                value={userSettings.learningLanguage}
                onChange={(e) => setUserSettings({...userSettings, learningLanguage: e.target.value})}
                className="select-field"
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* INTERFÉSZ ÉS RENDSZER SZEKCIÓ */}
        <section className="settings-card">
          <h2 className="card-title">🖥️ Interface & System</h2>
          
          <div className="setting-row single-col">
            <div className="setting-group">
              <label>Interface Language</label>
              <select 
                value={userSettings.uiLanguage}
                onChange={handleInterfaceLanguageChange}
                className="select-field"
              >
                {interfaceLanguages.map(lang => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
            </div>
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
              <input type="checkbox" checked={userSettings.soundEnabled}
                onChange={(e) => setUserSettings({...userSettings, soundEnabled: e.target.checked})} />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </section>

        {/* ÉRTESÍTÉSEK SZEKCIÓ */}
        <section className="settings-card">
          <h2 className="card-title">🔔 Notifications</h2>
          
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Daily reminders</span>
              <span className="setting-desc">Get notified to keep your streak alive</span>
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
