import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; 
import './DashboardPage.css';

export default function DashboardPage() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate('/main'); 
  };

  const levels = [
    { id: 1, type: 'lesson', status: 'completed', icon: '✔', pos: 'center' },
    { id: 2, type: 'lesson', status: 'completed', icon: '✔', pos: 'right' },
    { id: 3, type: 'story', status: 'active', icon: '📖', pos: 'right' },
    { id: 4, type: 'lesson', status: 'locked', icon: '★', pos: 'center' },
    { id: 5, type: 'chest', status: 'locked', icon: '🎁', pos: 'left' },
    { id: 6, type: 'lesson', status: 'locked', icon: '★', pos: 'left' },
    { id: 7, type: 'trophy', status: 'locked', icon: '🏆', pos: 'center' },
  ];

  return (
    <div className="dashboard-container">
      
      
      <nav className="sidebar">
        <h2 className="logo">Lynqo</h2>
        <ul className="nav-links">
          <li className="active"><span className="icon">🏠</span> Learn</li>
          <li><span className="icon">💪</span> Practice</li>
          <li><span className="icon">🛡️</span> Leaderboards</li>
          <li><span className="icon">🎒</span> Quests</li>
          <li><span className="icon">🏪</span> Shop</li>
          <li><span className="icon">👤</span> Profile</li>
          
          
          <li onClick={handleLogout} style={{marginTop: 'auto', color: '#ff4b4b'}}>
            <span className="icon">🚪</span> Logout
          </li>
        </ul>
      </nav>

      
      <main className="learning-path">
        <div className="header-banner">
          <div className="course-flag">🇫🇷</div>
          <div className="course-info">
            <h3>French Section 1</h3>
            <p>Unit 5: Talk about food preferences</p>
          </div>
          <button className="guidebook-btn">📖 Guidebook</button>
        </div>

        <div className="path-container">
          {levels.map((level) => (
            <div 
              key={level.id} 
              className={`level-node ${level.status} pos-${level.pos}`}
            >
              <div className="node-circle">
                {level.icon}
                {level.status === 'active' && (
                  <div className="start-bubble">START</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      
      <aside className="stats-sidebar">
        <div className="top-stats">
            <div className="stat-item">🇫🇷</div>
            <div className="stat-item">🔥 4</div>
            <div className="stat-item">💎 340</div>
        </div>

        <div className="stats-card unlock-league">
          <h3>💎 Emerald League</h3>
          <p>You're ranked #1</p>
          <div className="rank-badge">#1</div>
        </div>

        <div className="stats-card daily-quests">
          <h3>⚡ Daily Quests</h3>
          <div className="quest-item">
            <div className="quest-icon">⚡</div>
            <div className="quest-info">
              <span>Earn 30 XP</span>
              <div className="progress-bar"><div className="fill" style={{width: '60%'}}></div></div>
            </div>
          </div>
        </div>
      </aside>

    </div>
  );
}