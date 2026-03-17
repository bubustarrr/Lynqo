import React from 'react';

export default function FriendRequests({ friendRequests, handleRequest, resolveMediaUrl, t }) {
  return (
    <>
      <h2 className="column-title">{t('profilePage.requests.title')}</h2>
      <div className="sidebar-wrapper">
        {friendRequests.length > 0 ? (
          friendRequests.map((req) => (
            <div key={req.friendshipId} className="update-card request-card">
              <div className="update-header">
                <span className="version-badge">{t('profilePage.requests.new')}</span>
              </div>
              <div className="request-body">
                {/* ... avatar kód ugyanaz ... */}
                <div>
                  <h4 className="update-title" style={{ marginBottom: '2px' }}>{req.username}</h4>
                  <p className="update-details">{t('profilePage.requests.message')}</p>
                </div>
              </div>
              <div className="request-buttons">
                <button className="accept-mini" onClick={() => handleRequest(req.friendshipId, true)}>
                  {t('profilePage.requests.confirm')}
                </button>
                <button className="decline-mini" onClick={() => handleRequest(req.friendshipId, false)}>
                  {t('profilePage.requests.delete')}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-requests-text ps-3">{t('profilePage.requests.empty')}</p>
        )}
      </div>
    </>
  );
}