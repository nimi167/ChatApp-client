// src/components/Chat.js
import React, { useEffect, useState, useRef, useCallback } from "react";
import useSocket from "../hooks/useSocket";
import UserList from "./UserList";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../utils/handleLogout";

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openNav = () => setIsOpen(true);
  const closeNav = () => setIsOpen(false);

  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const currentUser = localStorage.getItem("username");
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const handleUsers = useCallback(
    (users) => {
      const filtered = users.filter((user) => user !== currentUser);
      setUsers(filtered);
      setFilteredUsers(filtered);
    },
    [currentUser]
  );

  const handleMessage = useCallback((msg) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { ...msg, timestamp: new Date() },
    ]);
  }, []);

  const handleChatHistory = useCallback((chatHistory) => {
    setMessages(chatHistory);
  }, []);

  const socket = useSocket(handleUsers, handleMessage, handleChatHistory);

  useEffect(() => {
    if (selectedUser === null && users.length > 0 && users[0] !== currentUser) {
      setSelectedUser(users[0]);
      loadChat(users[0]);
    }
  }, [users, selectedUser, currentUser]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const loadChat = (user) => {
    setSelectedUser(user);
    setMessages([]);
    if (socket) {
      socket.emit("loadChat", user);
    }
  };

  const sendMessage = () => {
    if (selectedUser && message.trim()) {
      socket.emit("message", { to: selectedUser, message });
      setMessage("");
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = users.filter((user) =>
      user.toLowerCase().includes(searchTerm)
    );
    setFilteredUsers(filtered);
  };
  const onLogout = (e) => {
    handleLogout(navigate);
  };

  return (
    <div className="chat-container">
      <div>
        <div className={`sidenav ${isOpen ? "open" : ""}`}>
          <button  className="closebtn" onClick={closeNav}>
            &times;
          </button>
          <div className="sidebar-list">
            <h3>Users</h3>
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <ul>
              {filteredUsers.map((user) => (
                <li
                  key={user}
                  onClick={() => {
                    loadChat(user);
                    closeNav();
                  }}
                  className={selectedUser === user ? "active-user" : ""}
                >
                  {user}
                </li>
              ))}
            </ul>
            {isOpen && (
              <button
                style={{
                  position: "fixed",
                  border: "none",
                  top: 10,
                  left: 20,
                  color: "white",
                  background: "transparent",
                  height: "60px",
                  width: "60px",
                }}
                onClick={onLogout}
              >
                <svg
                  fill="none"
                  height="30"
                  viewBox="0 0 24 24"
                  width="30"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 16L21 12M21 12L17 8M21 12L7 12M13 16V17C13 18.6569 11.6569 20 10 20H6C4.34315 20 3 18.6569 3 17V7C3 5.34315 4.34315 4 6 4H10C11.6569 4 13 5.34315 13 7V8"
                    stroke="#8E90A5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      <UserList
        users={filteredUsers}
        selectedUser={selectedUser}
        onSelectUser={loadChat}
        searchTerm={searchTerm}
        onSearch={handleSearch}
        onLogout={onLogout}
        openNav={openNav}
      />
      <div className="chat-window">
        <div className="chat-header">
          <h3>
            <span
              className="toggle-icon"
              style={{ fontSize: "30px", cursor: "pointer" }}
              onClick={openNav}
            >
              &#9776;{" "}
            </span>
            {selectedUser || "Select a user to chat"}
          </h3>
        </div>
        <ChatMessages
          messages={messages}
          currentUser={currentUser}
          messagesEndRef={messagesEndRef}
        />
        <ChatInput
          message={message}
          onChange={(e) => setMessage(e.target.value)}
          onSend={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;