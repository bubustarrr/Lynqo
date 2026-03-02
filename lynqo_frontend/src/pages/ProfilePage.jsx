import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../context/AuthContext';
import { Spinner } from 'react-bootstrap';
import './ProfilePage.css';

export default function ProfilePage() {
  const { token, logout } = useContext(AuthContext); 
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [profileData, setProfileData] = useState(null);
  
  // --- EXAMPLE FRIENDS FOR TESTING ---
  const [friendsList, setFriendsList] = useState([
    {
      friendshipId: "999-temp-id",
      username: "ExampleFriend_Pro",
      isOnline: true
    },
    {
      friendshipId: "888-demo-id",
      username: "CyberQuest_Master",
      isOnline: false
    }
  ]);
  
  // --- EXAMPLE FRIEND REQUEST FOR TESTING ---
  const [friendRequests, setFriendRequests] = useState([
    {
      friendshipId: "req-123-temp",
      username: "PixelKnight",
      avatarUrl: null
    }
  ]);

  const [loading, setLoading] = useState(true);

  // --- DOCKED CHAT STATES ---
  const [activeChat, setActiveChat] = useState(null); 
  const [isMinimized, setIsMinimized] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistories, setChatHistories] = useState({}); 

  useEffect(() => {
    if (!token) return;

    const fetchAllData = async () => {
      try {
        const headers = { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' };

        // 1. Fetch Profile
        const profileRes = await fetch('https://localhost:7118/api/Profile/me', { headers });
        if (profileRes.status === 401) {
            logout();
            navigate('/login');
            return;
        }
        if (profileRes.ok) setProfileData(await profileRes.json());

        // 2. Fetch Friends
        const friendsRes = await fetch('https://localhost:7118/api/Friends', { headers });
        if (friendsRes.ok) {
            const data = await friendsRes.json();
            setFriendsList(prev => {
                const dbIds = new Set(data.map(f => f.friendshipId));
                const filteredPrev = prev.filter(f => !dbIds.has(f.friendshipId));
                return [...filteredPrev, ...data];
            });
        }

        // 3. Fetch Requests
        const requestsRes = await fetch('https://localhost:7118/api/Friends/requests', { headers });
        if (requestsRes.ok) {
            const data = await requestsRes.json();
            setFriendRequests(prev => {
                const dbIds = new Set(data.map(r => r.friendshipId));
                const filteredPrev = prev.filter(r => !dbIds.has(r.friendshipId));
                return [...filteredPrev, ...data];
            });
        }

      } catch (error) {
        console.error("Failed to load profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [token, logout, navigate]);

  const handleRequest = async (friendshipId, acceptBool, requestObj) => {
    // If it's the temp request, just handle it locally
    if (friendshipId === "req-123-temp") {
        setFriendRequests(prev => prev.filter(req => req.friendshipId !== friendshipId));
        if (acceptBool) {
            setFriendsList(prev => [...prev, { ...requestObj, isOnline: false }]);
        }
        return;
    }

    try {
      const response = await fetch('https://localhost:7118/api/Friends/respond', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ requestId: friendshipId, accept: acceptBool })
      });

      if (response.ok) {
        setFriendRequests(prev => prev.filter(req => req.friendshipId !== friendshipId));
        if (acceptBool) {
          setFriendsList(prev => [...prev, requestObj]);
        }
      }
    } catch (error) {
      console.error(`Failed to respond to request:`, error);
    }
  };

  const handleUnfriend = async (friendshipId) => {
    if (!window.confirm("Are you sure you want to remove this friend?")) return;

    if (friendshipId.includes("temp") || friendshipId.includes("demo") || friendshipId.includes("req")) {
        setFriendsList(prev => prev.filter(f => f.friendshipId !== friendshipId));
        if(activeChat?.friendshipId === friendshipId) setActiveChat(null);
        return;
    }

    try {
      const response = await fetch(`https://localhost:7118/api/Friends/${friendshipId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        setFriendsList(prev => prev.filter(f => f.friendshipId !== friendshipId));
        if(activeChat?.friendshipId === friendshipId) setActiveChat(null);
      }
    } catch (error) {
      console.error("Failed to unfriend:", error);
    }
  };

  const openChat = (friend) => {
    setActiveChat(friend);
    setIsMinimized(false);
    if (!chatHistories[friend.friendshipId]) {
      setChatHistories(prev => ({
        ...prev,
        [friend.friendshipId]: [{ id: 'sys-' + Date.now(), text: `Chat started with ${friend.username}`, sender: 'system' }]
      }));
    }
  };

  const sendMessage = () => {
    if (!chatMessage.trim() || !activeChat) return;
    const newMessage = { id: Date.now(), text: chatMessage, sender: 'me' };
    setChatHistories(prev => ({
      ...prev,
      [activeChat.friendshipId]: [...(prev[activeChat.friendshipId] || []), newMessage]
    }));
    setChatMessage("");
  };

  if (loading) {
      return (
          <div className="d-flex justify-content-center align-items-center" style={{minHeight: '80vh'}}>
              <Spinner animation="border" variant="primary" />
          </div>
      );
  }

  const p = profileData || {};

  return (
    <div className="profile-page-container">
      <header className="profile-header">
        <h1 className="profile-hero-title">{t('profile.dashboard')}</h1>
        <div className="status-bar-container">
          <div className="status-card streak-stat">
            <span className="status-icon">🔥</span>
            <div className="status-info">
              <span className="status-value">{p.streak || 0}</span>
              <span className="status-label">{t('profile.stats.streak')}</span>
            </div>
          </div>
          <div className="status-card xp-stat">
            <span className="status-icon">⚡</span>
            <div className="status-info">
              <span className="status-value">{p.totalXp || 0}</span>
              <span className="status-label">{t('profile.stats.xp')}</span>
            </div>
          </div>
          <div className="status-card life-stat">
            <span className="status-icon">❤️</span>
            <div className="status-info">
              <span className="status-value">{p.hearts !== undefined ? p.hearts : 5}</span>
              <span className="status-label">{t('profile.stats.health')}</span>
            </div>
          </div>
          <div className="status-card coin-stat">
            <span className="status-icon">🪙</span>
            <div className="status-info">
              <span className="status-value">{p.coins || 0}</span>
              <span className="status-label">{t('profile.stats.coins')}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="profile-layout">
        <section className="main-profile-column">
          <div className="profile-main-card identity-card-layout">
            <div className="profile-img-wrapper">
              <img 
                src={p.avatarUrl || `https://ui-avatars.com/api/?name=${p.username || 'User'}&background=random&color=fff&size=300`} 
                alt="Profile" 
                className="profile-avatar-img" 
              />
            </div>
            <div className="identity-text-content">
              <div className="identity-header">
                <h3 className="display-name">{p.displayName || p.username}</h3>
                {p.isPremium && <span className="premium-badge-mini">{t('profile.premium_badge')}</span>}
              </div>
              <p className="profile-email-display">{p.email}</p>
              <p className="member-since">{t('profile.member_since')}: {p.createdAt}</p>
            </div>
            <button className="settings-btn" onClick={() => navigate('/settings')}>⚙️ {t('profile.settings_btn')}</button>
          </div>

          <h2 className="column-title">{t('profile.achievements_title')}</h2>
          <div className="badges-grid">
            <div className="badge-card locked">
              <div className="badge-icon-circle">🔒</div>
              <div className="badge-details">
                <h4>{t('profile.badges.locked_title')}</h4>
                <p>{t('profile.badges.locked_desc')}</p>
              </div>
            </div>
          </div>
        </section>

        <aside className="profile-sidebar-column">
          <h2 className="column-title">{t('profile.sidebar.requests_title')}</h2>
          <div className="sidebar-wrapper">
            {friendRequests.length > 0 ? (
              friendRequests.map((req) => (
                <div key={req.friendshipId} className="update-card request-card">
                  <div className="update-header">
                    <span className="version-badge">{t('profile.sidebar.new_badge')}</span>
                  </div>
                  <div className="request-body">
                    <div className="request-avatar">
                       <img src={`https://ui-avatars.com/api/?name=${req.username}&background=E0E7FF&color=4338CA`} alt={req.username} style={{width: '40px', height: '40px', borderRadius: '50%'}} />
                    </div>
                    <div>
                      <h4 className="update-title" style={{marginBottom: '2px'}}>{req.username}</h4>
                      <p className="update-details">{t('profile.sidebar.request_msg')}</p>
                    </div>
                  </div>
                  <div className="request-buttons">
                    <button className="accept-mini" onClick={() => handleRequest(req.friendshipId, true, req)}>
                      {t('profile.sidebar.confirm')}
                    </button>
                    <button className="decline-mini" onClick={() => handleRequest(req.friendshipId, false, req)}>
                      {t('profile.sidebar.delete')}
                    </button>
                  </div>
                </div>
              ))
            ) : (
                <p className="text-muted ps-3" style={{fontSize: '0.9rem', marginBottom: '20px'}}>No pending requests.</p>
            )}

            <h2 className="column-title" style={{marginTop: '10px'}}>{t('profile.sidebar.friends_online')}</h2>
            <div className="friends-list-container">
              {friendsList.length > 0 ? (
                  friendsList.map((friend) => (
                    <div key={friend.friendshipId} className="update-card friend-item-row">
                       <div className="friend-info-group">
                         <div className={`friend-status-dot ${friend.isOnline ? 'active' : ''}`}></div>
                         <img src={`https://ui-avatars.com/api/?name=${friend.username}&background=random`} alt="Friend" className="friend-list-avatar" />
                         <p className="friend-name">{friend.username}</p>
                       </div>
                       <div className="friend-actions">
                          <button className="action-btn chat-btn" onClick={() => openChat(friend)} title="Chat">💬</button>
                          <button className="action-btn unfriend-btn" onClick={() => handleUnfriend(friend.friendshipId)} title="Unfriend">❌</button>
                       </div>
                    </div>
                  ))
              ) : (
                  <p className="text-muted ps-3">No friends right now.</p>
              )}
            </div>
            <div className="promo-card mt-4">
              <h3>{t('profile.promo.title')}</h3>
              <button className="discord-btn">{t('profile.promo.btn')}</button>
            </div>
          </div>
        </aside>
      </div>

      {activeChat && (
        <div className={`docked-chat-container ${isMinimized ? 'minimized' : ''}`}>
          <div className="chat-header" onClick={() => setIsMinimized(!isMinimized)}>
            <div className="chat-user-info">
              <div className={`friend-status-dot small ${activeChat.isOnline ? 'active' : ''}`}></div>
              <img src={`https://ui-avatars.com/api/?name=${activeChat.username}&background=8b5cf6&color=fff`} alt="avatar" className="chat-mini-avatar" />
              <span className="chat-username">{activeChat.username}</span>
            </div>
            <div className="chat-controls">
              <button className="control-btn">{isMinimized ? '▲' : '▼'}</button>
              <button className="control-btn close" onClick={(e) => { e.stopPropagation(); setActiveChat(null); }}>✕</button>
            </div>
          </div>
          {!isMinimized && (
            <>
              <div className="chat-messages-area">
                {(chatHistories[activeChat.friendshipId] || []).map(msg => (
                  <div key={msg.id} className={`chat-bubble-wrapper ${msg.sender}`}>
                    <div className="chat-bubble">{msg.text}</div>
                  </div>
                ))}
              </div>
              <div className="chat-input-bar">
                <input type="text" placeholder="Type a message..." value={chatMessage} onChange={(e) => setChatMessage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} />
                <button onClick={sendMessage} className="chat-send-icon">➤</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}