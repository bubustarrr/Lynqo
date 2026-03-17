import React from 'react';

export default function FriendsOnline({ friendsList, openChat, handleUnfriend, resolveMediaUrl, t }) {
  return (
    <>
      <h2 className="column-title" style={{ marginTop: '10px' }}>{t('profilePage.friends.title')}</h2>
      <div className="friends-list-container">
        {friendsList.length > 0 ? (
          friendsList.map((friend) => (
            <div key={friend.friendshipId} className="update-card friend-item-row">
                          <div className="friend-info-group">
                <div className={`friend-status-dot ${friend.isOnline ? 'active' : ''}`}></div>

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
                <button className="action-btn chat-btn" onClick={() => openChat(friend)} title={t('profilePage.friends.chat_tooltip')}>
                  💬
                </button>
                <button className="action-btn unfriend-btn" onClick={() => handleUnfriend(friend.userId)} title={t('profilePage.friends.unfriend_tooltip')}>
                  ❌
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted ps-3">{t('profilePage.friends.empty')}</p>
        )}
      </div>
    </>
  );
}