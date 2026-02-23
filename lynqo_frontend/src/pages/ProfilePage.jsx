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
  const [friendsList, setFriendsList] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load Everything simultaneously
  useEffect(() => {
    if (!token) return;

    const fetchAllData = async () => {
      try {
        const headers = { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' };

        // 1. Fetch Profile Data
        const profileRes = await fetch('https://localhost:7118/api/Profile/me', { headers });
        if (profileRes.status === 401) {
            logout();
            navigate('/login');
            return;
        }
        if (profileRes.ok) setProfileData(await profileRes.json());

        // 2. Fetch Accepted Friends
        const friendsRes = await fetch('https://localhost:7118/api/Friends', { headers });
        if (friendsRes.ok) setFriendsList(await friendsRes.json());

        // 3. Fetch Pending Requests
        const requestsRes = await fetch('https://localhost:7118/api/Friends/requests', { headers });
        if (requestsRes.ok) setFriendRequests(await requestsRes.json());

      } catch (error) {
        console.error("Failed to load profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [token, logout, navigate]);

  // Handle Accept or Decline using your FriendsController
  const handleRequest = async (friendshipId, acceptBool, requestObj) => {
    try {
      const response = await fetch('https://localhost:7118/api/Friends/respond', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          requestId: friendshipId,  // We use the new DTO field!
          accept: acceptBool
        })
      });

      if (response.ok) {
        // Instantly update UI without refreshing
        // 1. Remove the request from the pending list
        setFriendRequests(prev => prev.filter(req => req.friendshipId !== friendshipId));
        
        // 2. If accepted, add them to the friends list immediately
        if (acceptBool) {
          setFriendsList(prev => [...prev, requestObj]);
        }
      } else {
        const err = await response.text();
        console.error("Backend Error: ", err);
      }
    } catch (error) {
      console.error(`Failed to respond to request:`, error);
    }
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

            <button className="settings-btn" onClick={() => navigate('/settings')}>
              ⚙️ {t('profile.settings_btn')}
            </button>
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
                       <img 
                         src={`https://ui-avatars.com/api/?name=${req.username}`} 
                         alt={req.username} 
                         style={{width: '40px', height: '40px', borderRadius: '50%'}} 
                       />
                    </div>
                    <div>
                      <h4 className="update-title" style={{marginBottom: '2px'}}>{req.username}</h4>
                      <p className="update-details">{t('profile.sidebar.request_msg')}</p>
                    </div>
                  </div>
                  <div className="request-buttons">
                    {/* Maps perfectly to friendshipId now! */}
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
                    <div key={friend.friendshipId} className="update-card friend-item-row" style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                       <div className="friend-status-dot" style={{width: '10px', height: '10px', backgroundColor: '#4caf50', borderRadius: '50%'}}></div>
                       <img 
                          src={`https://ui-avatars.com/api/?name=${friend.username}`} 
                          alt="Friend" 
                          style={{width: '32px', height: '32px', borderRadius: '50%'}}
                       />
                       <p className="friend-name" style={{margin: 0, fontWeight: 'bold'}}>{friend.username}</p>
                    </div>
                  ))
              ) : (
                  <p className="text-muted ps-3">No friends right now.</p>
              )}
            </div>

            <div className="promo-card mt-4">
              <h3>{t('profile.promo.title')}</h3>
              <p>{t('profile.promo.desc')}</p>
              <button className="discord-btn">{t('profile.promo.btn')}</button>
            </div>

          </div>
        </aside>
      </div>
    </div>
  );
}
