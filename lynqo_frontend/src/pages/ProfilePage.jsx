import React, { useState } from 'react'; // ÚJ: useState importálása
import { useTranslation } from 'react-i18next';
import { Spinner, Button } from 'react-bootstrap'; // ÚJ: Button importálása
import './ProfilePage.css';

import { useProfileData } from '../hooks/useProfileData';

import ProfileMainCard from '../components/profile/ProfileMainCard';
import Achievements from '../components/profile/Achievements';
import FriendRequests from '../components/profile/FriendRequests';
import FriendsOnline from '../components/profile/FriendsOnline';
import DockedChat from '../components/profile/DockedChat';
import ProfileStatusBar from '../components/profile/ProfileStatusBar';
import PremiumPromoCard from '../components/profile/PremiumPromoCard';

// ÚJ: A Modal komponens importálása
import AddFriendModal from '../components/profile/AddFriendModal';

export default function ProfilePage() {
  const { t } = useTranslation();
  
  // ÚJ: Állapot a Modal nyitásához/zárásához
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);

  const {
    profileData, friendsList, friendRequests, loading,
    activeChat, setActiveChat, isMinimized, setIsMinimized,
    chatMessage, setChatMessage, chatHistories,
    handleRequest, handleUnfriend, openChat, sendMessage, resolveMediaUrl,
    navigate
  } = useProfileData();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  const p = profileData || {};

  return (
    <div className="profile-page-container">
      <header className="profile-header">
        <h1 className="profile-hero-title">{t('profile.dashboard')}</h1>
        <ProfileStatusBar p={p} t={t} />
      </header>

      <div className="profile-layout">
        <section className="main-profile-column">
          <ProfileMainCard p={p} t={t} navigate={navigate} resolveMediaUrl={resolveMediaUrl} />
          <Achievements t={t} />
        </section>

        <aside className="profile-sidebar-column">
          
          {/* ÚJ: Egy szép, széles gomb a sidebara tetején a barátkereső modal megnyitásához */}
          <Button 
            variant="primary" 
            className="w-100 mb-4 fw-bold shadow-sm" 
            onClick={() => setShowAddFriendModal(true)}
          >
            <i className="bi bi-person-plus-fill me-2"></i> 
            Barát hozzáadása
          </Button>

          <FriendRequests 
            friendRequests={friendRequests} 
            handleRequest={handleRequest} 
            resolveMediaUrl={resolveMediaUrl} 
            t={t} 
          />
          <FriendsOnline 
            friendsList={friendsList} 
            openChat={openChat} 
            handleUnfriend={handleUnfriend} 
            resolveMediaUrl={resolveMediaUrl} 
            t={t} 
          />
          <PremiumPromoCard isPremium={p.isPremium} t={t} navigate={navigate} />
        </aside>
      </div>

      <DockedChat 
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        isMinimized={isMinimized}
        setIsMinimized={setIsMinimized}
        chatHistories={chatHistories}
        chatMessage={chatMessage}
        setChatMessage={setChatMessage}
        sendMessage={sendMessage}
        resolveMediaUrl={resolveMediaUrl}
      />

      {/* ÚJ: A Modal komponens, ami alapból rejtett, de a gomb megnyitja */}
      <AddFriendModal 
        show={showAddFriendModal} 
        handleClose={() => setShowAddFriendModal(false)} 
        t={t} 
      />

    </div>
  );
}