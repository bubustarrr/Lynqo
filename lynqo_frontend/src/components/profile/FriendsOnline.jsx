import React from 'react';

export default function FriendsOnline({ friendsList, openChat, handleUnfriend, resolveMediaUrl, t }) {
  return (
    <>
      <h2 className="column-title" style={{ marginTop: '10px' }}>
        {t('profile.sidebar.friends_online')}
      </h2>

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
    </>
  );
}