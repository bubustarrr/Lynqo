import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Spinner, Button } from 'react-bootstrap';
import './ProfilePage.css';
import { useProfileData } from '../hooks/useProfileData';
import ProfileMainCard from '../components/profile/ProfileMainCard';
import Achievements from '../components/profile/Achievements';
import FriendRequests from '../components/profile/FriendRequests';
import FriendsOnline from '../components/profile/FriendsOnline';
import DockedChat from '../components/profile/DockedChat';
import ProfileStatusBar from '../components/profile/ProfileStatusBar';
import PremiumPromoCard from '../components/profile/PremiumPromoCard';
import AddFriendModal from '../components/profile/AddFriendModal';

export default function ProfilePage() {
  const { t } = useTranslation();
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  const {
    profileData, friendsList, friendRequests, loading,
    activeChat, setActiveChat, isMinimized, setIsMinimized,
    chatMessage, setChatMessage, chatHistories,
    handleRequest, handleUnfriend, openChat, sendMessage, resolveMediaUrl, navigate
  } = useProfileData();

  if (loading) return <div className="text-center p-5"><Spinner animation="border" /></div>;

  return (
    <div className="profile-page-container">
      <header className="profile-header">
        <h1 className="profile-hero-title">{t('profile.dashboard')}</h1>
        <ProfileStatusBar p={profileData} t={t} />
      </header>

      <div className="profile-layout">
        <section className="main-profile-column">
          <ProfileMainCard p={profileData} t={t} navigate={navigate} resolveMediaUrl={resolveMediaUrl} />
          <Achievements t={t} />
        </section>

        <aside className="profile-sidebar-column">
          <Button className="add-friend-btn w-100 mb-4 animate-pop-in" onClick={() => setShowAddFriendModal(true)}>
            <i className="bi bi-person-plus-fill"></i> Add Friend
          </Button>
          <FriendRequests friendRequests={friendRequests} handleRequest={handleRequest} resolveMediaUrl={resolveMediaUrl} t={t} />
          <FriendsOnline friendsList={friendsList} openChat={openChat} handleUnfriend={handleUnfriend} resolveMediaUrl={resolveMediaUrl} t={t} />
          <PremiumPromoCard isPremium={profileData.isPremium} t={t} navigate={navigate} />
        </aside>
      </div>

      <DockedChat 
        activeChat={activeChat} setActiveChat={setActiveChat} isMinimized={isMinimized} setIsMinimized={setIsMinimized}
        chatHistories={chatHistories} chatMessage={chatMessage} setChatMessage={setChatMessage} sendMessage={sendMessage} resolveMediaUrl={resolveMediaUrl}
      />
      <AddFriendModal show={showAddFriendModal} handleClose={() => setShowAddFriendModal(false)} t={t} />
    </div>
  );
}