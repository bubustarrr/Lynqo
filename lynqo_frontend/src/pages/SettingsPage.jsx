import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import './SettingsPage.css';

export default function SettingsPage() {
  const { user } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, translations } = useLanguage();

  const t = translations[language] || translations['en'] || {};

  // Az állapot most már az adatbázis logikáját követi
  const [userSettings, setUserSettings] = useState({
    notifications: true,
    dailyGoalMinutes: 15, // Adatbázis: daily_goal_minutes
    learningLanguage: 'English', // Ez majd a 'courses' táblához kötődik, nem a settings-hez!
    interfaceLanguage: language, // Adatbázis: ui_language ('en', 'es', stb.)
    soundEffects: true, // Adatbázis: sound_enabled
    darkMode: theme === 'dark' // Adatbázis: dark_mode
  });

  const languages = ['English', 'Spanish', 'French', 'German', 'Italian'];
  
  // A kódok egyeznek az adatbázis ui_language varchar mezőjével
  const interfaceLanguages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' }
  ];
  
  // Percekben megadott napi célok
  const dailyGoals = [5, 10, 15, 20, 30, 45, 60];

  useEffect(() => {
    setUserSettings(prev => ({ ...prev, darkMode: theme === 'dark' }));
  }, [theme]);

  const handleSave = async () => {
    // 1. Összerakjuk a csomagot PONTOSAN úgy, ahogy az SQL várja
    const payloadToDatabase = {
      dark_mode: userSettings.darkMode ? 1 : 0,
      sound_enabled: userSettings.soundEffects ? 1 : 0,
      daily_goal_minutes: userSettings.dailyGoalMinutes,
      ui_language: userSettings.interfaceLanguage,
      notifications_enabled: userSettings.notifications ? 1 : 0
    };

    console.log('Sending to DB:', payloadToDatabase);

    /* // 2. Itt lesz a jövőbeli Backend hívásod:
    try {
      const response = await fetch('http://localhost:5000/api/settings/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}` // Ha használsz JWT tokent
        },
        body: JSON.stringify(payloadToDatabase)
      });
      
      if(response.ok) {
        alert('Settings saved successfully!');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
    }
    */
    
    alert('Settings saved! (Check console for payload)');
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
    setUserSettings({ ...userSettings, interfaceLanguage: selectedLang });
    setLanguage(selectedLang);
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <div className="header-titles">
          <h1 className="settings-title">⚙️ {t.settings || "Settings"}</h1>
          <p className="settings-subtitle">Manage your preferences and learning goals</p>
        </div>
        <button className="save-button" onClick={handleSave}>
          💾 Save Changes
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
              <label>Learning Language</label>
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
                value={userSettings.interfaceLanguage}
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
              <input type="checkbox" checked={userSettings.soundEffects}
                onChange={(e) => setUserSettings({...userSettings, soundEffects: e.target.checked})} />
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
                checked={userSettings.notifications}
                onChange={(e) => setUserSettings({...userSettings, notifications: e.target.checked})}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </section>

      </div>
    </div>
  );
}