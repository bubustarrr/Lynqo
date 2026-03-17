import React from 'react';

export default function DockedChat({
  activeChat, setActiveChat, isMinimized, setIsMinimized,
  chatHistories, chatMessage, setChatMessage, sendMessage, resolveMediaUrl, t // <-- Hozzáadva
}) {
  if (!activeChat) return null;

  return (
    <div className={`docked-chat-container ${isMinimized ? 'minimized' : ''}`}>
      {/* ... fejléc kód ugyanaz ... */}

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
                <div className="chat-bubble">{t('profilePage.chat.no_messages')}</div>
              </div>
            )}
          </div>

          <div className="chat-input-bar">
            <input
              type="text"
              placeholder={t('profilePage.chat.placeholder')}
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage} className="chat-send-icon" type="button">➤</button>
          </div>
        </>
      )}
    </div>
  );
}