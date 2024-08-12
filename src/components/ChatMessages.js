// src/components/ChatMessages.js
import React from 'react';
import { formatDate, groupMessagesByDate } from '../utils/messageUtils';
import dayjs from 'dayjs';

const ChatMessages = ({ messages, currentUser, messagesEndRef }) => {
  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="chat-messages" id="style-3">
      {Object.keys(groupedMessages).map((date) => (
        <div key={date} className="message-container">
          <div className="date-badge">
            <span>{formatDate(date)}</span>
          </div>
          {groupedMessages[date].map((msg, index) => (
            <div
              key={index}
              className={
                msg.from === currentUser
                  ? 'message sent'
                  : 'message received'
              }
            >
              <div className="message-content">
                <div className="message-text">{msg.message}</div>
                {msg.timestamp && (
                  <div className="message-time">
                    {dayjs(msg.timestamp).format('h:mm A')}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
