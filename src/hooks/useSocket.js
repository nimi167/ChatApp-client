// src/hooks/useSocket.js
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const useSocket = (onUsers, onMessage, onChatHistory) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3001", {
      auth: { token: localStorage.getItem("token") },
    });
    setSocket(newSocket);

    newSocket.on("connect", () => console.log("Connected to server"));
    newSocket.on("users", onUsers);
    newSocket.on("message", onMessage);
    newSocket.on("chatHistory", onChatHistory);
    newSocket.on("disconnect", () => console.log("Disconnected from server"));

    return () => {
      newSocket.disconnect();
    };
  }, [onUsers, onMessage, onChatHistory]); // Ensure these callbacks are stable

  return socket;
};

export default useSocket;
