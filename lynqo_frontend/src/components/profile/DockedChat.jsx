import React from 'react';

export default function DockedChat({
  activeChat,
  setActiveChat,
  isMinimized,
  setIsMinimized,
  chatHistories,
  chatMessage,
  setChatMessage,
  sendMessage,
  resolveMediaUrl
}) {
  if (!activeChat) return null; // Ha nincs aktív chat, nem renderelünk semmit

  return (
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
  );
}