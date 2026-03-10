import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const useProfileData = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const API_BASE = 'https://localhost:7118';

  // Állapotok (State)
  const [profileData, setProfileData] = useState(null);
  const [friendsList, setFriendsList] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeChat, setActiveChat] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistories, setChatHistories] = useState({});

  // Segédfüggvények
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
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:') || url.startsWith('blob:')) {
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

  // Adatok betöltése
  useEffect(() => {
    if (!token) return;

    const fetchAllData = async () => {
      try {
        const headers = getAuthHeaders();
        const [profileRes, statsRes, friendsRes, requestsRes] = await Promise.all([
          fetch(`${API_BASE}/api/Profile/me`, { headers }),
          fetch(`${API_BASE}/api/User/me`, { headers }), 
          fetch(`${API_BASE}/api/Friends`, { headers }),
          fetch(`${API_BASE}/api/Friends/requests`, { headers })
        ]);

        if (profileRes.status === 401 || friendsRes.status === 401 || requestsRes.status === 401) {
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
            isPremium: stats.isPremium ?? stats.IsPremium ?? (prev?.isPremium || false)
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

  // Akciók
  const refreshFriends = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/Friends`, { headers: getAuthHeaders() });
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
        body: JSON.stringify({ requestId: friendshipId, accept: acceptBool })
      });

      if (!response.ok) {
        console.error('Failed to respond to request');
        return;
      }

      setFriendRequests((prev) => prev.filter((req) => req.friendshipId !== friendshipId));
      if (acceptBool) await refreshFriends();
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
      const res = await fetch(`${API_BASE}/api/Chat/${friend.userId}`, { headers: getAuthHeaders() });
      if (res.ok) {
        const data = await res.json();
        setChatHistories((prev) => ({ ...prev, [friend.userId]: (data || []).map(mapChatMessage) }));
        await fetch(`${API_BASE}/api/Chat/${friend.userId}/read`, { method: 'POST', headers: getAuthHeaders() });
        setFriendsList((prev) => prev.map((f) => f.userId === friend.userId ? { ...f, unreadCount: 0 } : f));
      } else {
        setChatHistories((prev) => ({ ...prev, [friend.userId]: prev[friend.userId] || [] }));
      }
    } catch (error) {
      console.error('Failed to open chat:', error);
      setChatHistories((prev) => ({ ...prev, [friend.userId]: prev[friend.userId] || [] }));
    }
  };

  const sendMessage = async () => {
    if (!chatMessage.trim() || !activeChat) return;
    const text = chatMessage.trim();

    try {
      const res = await fetch(`${API_BASE}/api/Chat/send`, {
        method: 'POST',
        headers: getJsonHeaders(),
        body: JSON.stringify({ receiverId: activeChat.userId, message: text })
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
          { id: saved.id, text: saved.message, sender: 'me', timestamp: saved.timestamp, readAt: saved.readAt ?? null }
        ]
      }));
      setChatMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  // Visszaadjuk mindazt, amire a komponensnek szüksége van
  return {
    profileData, friendsList, friendRequests, loading,
    activeChat, setActiveChat, isMinimized, setIsMinimized,
    chatMessage, setChatMessage, chatHistories,
    handleRequest, handleUnfriend, openChat, sendMessage, resolveMediaUrl,
    navigate
  };
};