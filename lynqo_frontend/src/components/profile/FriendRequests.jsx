import React from 'react';

export default function FriendRequests({ friendRequests, handleRequest, resolveMediaUrl, t }) {
  return (
    <>
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
                    style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                  />
                </div>

                <div>
                  <h4 className="update-title" style={{ marginBottom: '2px' }}>
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
          <p className="no-requests-text ps-3">
  No pending requests.
</p>
        )}
      </div>
    </>
  );
}