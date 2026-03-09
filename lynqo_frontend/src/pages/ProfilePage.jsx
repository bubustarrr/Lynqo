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

  const API_BASE = 'https://localhost:7118';

  const [profileData, setProfileData] = useState(null);
  const [friendsList, setFriendsList] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeChat, setActiveChat] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistories, setChatHistories] = useState({});

  const getAuthHeaders = () => ({
    Authorization: `Bearer ${token}`,
    Accept: 'application/json'
  });

  const getJsonHeaders = () => ({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    Accept: 'application/json'
  });

  const resolveMediaUrl = (url) => {
    if (!url) return '';
    if (
      url.startsWith('http://') ||
      url.startsWith('https://') ||
      url.startsWith('data:') ||
      url.startsWith('blob:')
    ) {
      return url;
    }
    return `${API_BASE}${url}`;
  };

  const normalizeFriend = (item) => ({
    friendshipId: item.friendshipId ?? item.friendshipID ?? item.id,
    userId: item.userId ?? item.friendUserId ?? item.friendId ?? item.id,
    username: item.username ?? item.displayName ?? 'User',
    displayName: item.displayName ?? item.username ?? 'User',
    avatarUrl: item.avatarUrl ?? item.profilePicUrl ?? null,
    isOnline: item.isOnline ?? false
  });

  const normalizeRequest = (item) => ({
    friendshipId: item.friendshipId ?? item.friendshipID ?? item.requestId ?? item.id,
    userId: item.userId ?? item.senderId ?? item.fromUserId ?? item.id,
    username: item.username ?? item.displayName ?? 'User',
    displayName: item.displayName ?? item.username ?? 'User',
    avatarUrl: item.avatarUrl ?? item.profilePicUrl ?? null
  });

  const mapChatMessage = (msg) => ({
    id: msg.id,
    text: msg.message ?? msg.text ?? '',
    sender: msg.isMine ? 'me' : 'them',
    timestamp: msg.timestamp ?? msg.createdAt ?? null,
    readAt: msg.readAt ?? null
  });

  useEffect(() => {
    if (!token) return;

    const fetchAllData = async () => {
      try {
        const headers = getAuthHeaders();

        const [profileRes, statsRes, friendsRes, requestsRes] = await Promise.all([
          fetch(`${API_BASE}/api/Profile/me`, { headers }),
          fetch(`${API_BASE}/api/User/me`, { headers }), // or /api/Profile/stats
          fetch(`${API_BASE}/api/Friends`, { headers }),
          fetch(`${API_BASE}/api/Friends/requests`, { headers })
        ]);

        if (
          profileRes.status === 401 ||
          friendsRes.status === 401 ||
          requestsRes.status === 401
        ) {
          logout();
          navigate('/login');
          return;
        }

        if (profileRes.ok) {
          const profile = await profileRes.json();
          setProfileData(profile);
        }

        if (statsRes.ok) {
          const stats = await statsRes.json();
          setProfileData(prev => ({
            ...(prev || {}),
            streak: stats.streak ?? stats.Streak ?? 0,
            totalXp: stats.totalXp ?? stats.TotalXp ?? 0,
            hearts: stats.hearts ?? stats.Hearts ?? 5,
            coins: stats.coins ?? stats.Coins ?? 0,
            isPremium: stats.isPremium ?? stats.IsPremium ?? (prev?.isPremium || false) // Biztosítjuk, hogy a prémium státusz frissüljön
          }));
        }

        if (friendsRes.ok) {
          const friends = await friendsRes.json();
          setFriendsList((friends || []).map(normalizeFriend));
        }

        if (requestsRes.ok) {
          const requests = await requestsRes.json();
          setFriendRequests((requests || []).map(normalizeRequest));
        }
      } catch (error) {
        console.error('Failed to load profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [token, logout, navigate]);

  const refreshFriends = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/Friends`, {
        headers: getAuthHeaders()
      });

      if (res.ok) {
        const friends = await res.json();
        setFriendsList((friends || []).map(normalizeFriend));
      }
    } catch (error) {
      console.error('Failed to refresh friends:', error);
    }
  };

  const handleRequest = async (friendshipId, acceptBool) => {
    try {
      const response = await fetch(`${API_BASE}/api/Friends/respond`, {
        method: 'POST',
        headers: getJsonHeaders(),
        body: JSON.stringify({
          requestId: friendshipId,
          accept: acceptBool
        })
      });

      if (!response.ok) {
        console.error('Failed to respond to request');
        return;
      }

      setFriendRequests((prev) =>
        prev.filter((req) => req.friendshipId !== friendshipId)
      );

      if (acceptBool) {
        await refreshFriends();
      }
    } catch (error) {
      console.error('Failed to respond to request:', error);
    }
  };

  const handleUnfriend = async () => {
    alert('Unfriend backend is not added yet.');
  };

  const openChat = async (friend) => {
    setActiveChat(friend);
    setIsMinimized(false);

    try {
      const res = await fetch(`${API_BASE}/api/Chat/${friend.userId}`, {
        headers: getAuthHeaders()
      });

      if (res.ok) {
        const data = await res.json();

        setChatHistories((prev) => ({
          ...prev,
          [friend.userId]: (data || []).map(mapChatMessage)
        }));

        await fetch(`${API_BASE}/api/Chat/${friend.userId}/read`, {
          method: 'POST',
          headers: getAuthHeaders()
        });

        setFriendsList((prev) =>
          prev.map((f) =>
            f.userId === friend.userId ? { ...f, unreadCount: 0 } : f
          )
        );
      } else {
        setChatHistories((prev) => ({
          ...prev,
          [friend.userId]: prev[friend.userId] || []
        }));
      }
    } catch (error) {
      console.error('Failed to open chat:', error);
      setChatHistories((prev) => ({
        ...prev,
        [friend.userId]: prev[friend.userId] || []
      }));
    }
  };

  const sendMessage = async () => {
    if (!chatMessage.trim() || !activeChat) return;

    const text = chatMessage.trim();

    try {
      const res = await fetch(`${API_BASE}/api/Chat/send`, {
        method: 'POST',
        headers: getJsonHeaders(),
        body: JSON.stringify({
          receiverId: activeChat.userId,
          message: text
        })
      });

      if (!res.ok) {
        console.error('Failed to send message');
        return;
      }

      const saved = await res.json();

      setChatHistories((prev) => ({
        ...prev,
        [activeChat.userId]: [
          ...(prev[activeChat.userId] || []),
          {
            id: saved.id,
            text: saved.message,
            sender: 'me',
            timestamp: saved.timestamp,
            readAt: saved.readAt ?? null
          }
        ]
      }));

      setChatMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '80vh' }}
      >
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
              <span className="status-value">
                {p.hearts !== undefined ? p.hearts : 5}
              </span>
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
                src={
                  resolveMediaUrl(p.avatarUrl) ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    p.username || 'User'
                  )}&background=random&color=fff&size=300`
                }
                alt="Profile"
                className="profile-avatar-img"
              />
            </div>

            <div className="identity-text-content">
              <div className="identity-header">
                <h3 className="display-name">{p.displayName || p.username}</h3>
                {p.isPremium && (
                  <span className="premium-badge-mini">
                    {t('profile.premium_badge')}
                  </span>
                )}
              </div>

              <p className="profile-email-display">{p.email}</p>
              <p className="member-since">
                {t('profile.member_since')}: {p.createdAt}
              </p>
            </div>

            <button
              className="settings-btn"
              onClick={() => navigate('/edit-profile')}
            >
              ✏️ {t('Edit Profile') || 'Edit Profile'}
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
                    <span className="version-badge">
                      {t('profile.sidebar.new_badge')}
                    </span>
                  </div>

                  <div className="request-body">
                    <div className="request-avatar">
                      <img
                        src={
                          resolveMediaUrl(req.avatarUrl) ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            req.username
                          )}&background=E0E7FF&color=4338CA`
                        }
                        alt={req.username}
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%'
                        }}
                      />
                    </div>

                    <div>
                      <h4
                        className="update-title"
                        style={{ marginBottom: '2px' }}
                      >
                        {req.username}
                      </h4>
                      <p className="update-details">
                        {t('profile.sidebar.request_msg')}
                      </p>
                    </div>
                  </div>

                  <div className="request-buttons">
                    <button
                      className="accept-mini"
                      onClick={() => handleRequest(req.friendshipId, true)}
                    >
                      {t('profile.sidebar.confirm')}
                    </button>

                    <button
                      className="decline-mini"
                      onClick={() => handleRequest(req.friendshipId, false)}
                    >
                      {t('profile.sidebar.delete')}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p
                className="text-muted ps-3"
                style={{ fontSize: '0.9rem', marginBottom: '20px' }}
              >
                No pending requests.
              </p>
            )}

            <h2 className="column-title" style={{ marginTop: '10px' }}>
              {t('profile.sidebar.friends_online')}
            </h2>

            <div className="friends-list-container">
              {friendsList.length > 0 ? (
                friendsList.map((friend) => (
                  <div key={friend.friendshipId} className="update-card friend-item-row">
                    <div className="friend-info-group">
                      <div
                        className={`friend-status-dot ${
                          friend.isOnline ? 'active' : ''
                        }`}
                      ></div>

                      <img
                        src={
                          resolveMediaUrl(friend.avatarUrl) ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            friend.username
                          )}&background=random`
                        }
                        alt="Friend"
                        className="friend-list-avatar"
                      />

                      <p className="friend-name">{friend.username}</p>
                    </div>

                    <div className="friend-actions">
                      <button
                        className="action-btn chat-btn"
                        onClick={() => openChat(friend)}
                        title="Chat"
                      >
                        💬
                      </button>

                      <button
                        className="action-btn unfriend-btn"
                        onClick={() => handleUnfriend(friend.friendshipId)}
                        title="Unfriend"
                      >
                        ❌
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted ps-3">No friends right now.</p>
              )}
            </div>

            {/* ITT VAN A FELTÉTEL: Csak akkor jelenik meg, ha nem prémium! */}
            {!p.isPremium && (
              <div className="promo-card mt-4">
                <h3>{t('profile.promo.title')}</h3>
                <button 
                  className="discord-btn"
                  onClick={() => navigate('/shop/subscriptions')} // Extraként hozzáadtam a kattintás funkciót is!
                >
                  {t('profile.promo.btn')}
                </button>
              </div>
            )}

          </div>
        </aside>
      </div>

      {activeChat && (
        <div className={`docked-chat-container ${isMinimized ? 'minimized' : ''}`}>
          <div
            className="chat-header"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            <div className="chat-user-info">
              <div
                className={`friend-status-dot small ${
                  activeChat.isOnline ? 'active' : ''
                }`}
              ></div>

              <img
                src={
                  resolveMediaUrl(activeChat.avatarUrl) ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    activeChat.username
                  )}&background=8b5cf6&color=fff`
                }
                alt="avatar"
                className="chat-mini-avatar"
              />

              <span className="chat-username">{activeChat.username}</span>
            </div>

            <div className="chat-controls">
              <button className="control-btn" type="button">
                {isMinimized ? '▲' : '▼'}
              </button>

              <button
                className="control-btn close"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveChat(null);
                }}
              >
                ✕
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="chat-messages-area">
                {(chatHistories[activeChat.userId] || []).length > 0 ? (
                  (chatHistories[activeChat.userId] || []).map((msg) => (
                    <div key={msg.id} className={`chat-bubble-wrapper ${msg.sender}`}>
                      <div className="chat-bubble">{msg.text}</div>
                    </div>
                  ))
                ) : (
                  <div className="chat-bubble-wrapper system">
                    <div className="chat-bubble">No messages yet.</div>
                  </div>
                )}
              </div>

              <div className="chat-input-bar">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button onClick={sendMessage} className="chat-send-icon" type="button">
                  ➤
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}