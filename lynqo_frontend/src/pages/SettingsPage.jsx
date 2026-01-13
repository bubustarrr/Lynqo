import React, { useState } from 'react';
import './SettingsPage.css';

export default function Settings() {
  const [userSettings, setUserSettings] = useState({
    notifications: true,
    dailyGoal: 20,
    language: 'English',
    interfaceLanguage: 'English',
    soundEffects: true,
    darkMode: false
  });

  const languages = ['English', 'Spanish', 'French', 'German', 'Italian'];
  const dailyGoals = [10, 20, 30, 45, 60];

  const handleSave = () => {
    console.log('Settings saved:', userSettings);
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1 className="settings-title">Settings</h1>
        <button className="save-button primary" onClick={handleSave}>
          Save Changes
        </button>
      </div>

      <section className="settings-section">
        <h2 className="section-title">Notifications</h2>
        <div className="setting-item">
          <span className="setting-label">Daily reminders</span>
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

      <section className="settings-section">
        <h2 className="section-title">Learning</h2>
        <div className="setting-row">
          <div className="setting-group">
            <label>Daily Goal</label>
            <select 
              value={userSettings.dailyGoal}
              onChange={(e) => setUserSettings({...userSettings, dailyGoal: parseInt(e.target.value)})}
              className="select-field"
            >
              {dailyGoals.map(goal => (
                <option key={goal} value={goal}>{goal} XP</option>
              ))}
            </select>
          </div>
          <div className="setting-group">
            <label>Learning Language</label>
            <select 
              value={userSettings.language}
              onChange={(e) => setUserSettings({...userSettings, language: e.target.value})}
              className="select-field"
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="settings-section">
        <h2 className="section-title">Interface</h2>
        <div className="setting-group">
          <label>Interface Language</label>
          <select 
            value={userSettings.interfaceLanguage}
            onChange={(e) => setUserSettings({...userSettings, interfaceLanguage: e.target.value})}
            className="select-field"
          >
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
        <div className="setting-item">
          <span className="setting-label">Sound Effects</span>
          <label className="toggle-switch">
            <input type="checkbox" checked={userSettings.soundEffects}
              onChange={(e) => setUserSettings({...userSettings, soundEffects: e.target.checked})} />
            <span className="toggle-slider"></span>
          </label>
        </div>
        <div className="setting-item">
          <span className="setting-label">Dark Mode</span>
          <label className="toggle-switch">
            <input type="checkbox" checked={userSettings.darkMode}
              onChange={(e) => setUserSettings({...userSettings, darkMode: e.target.checked})} />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </section>
    </div>
  );
}
