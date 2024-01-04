import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const socket = io('http://localhost:5000'); // Replace with your server URL

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages([...messages, msg]);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [messages]);

  const sendMessage = (message) => {
    socket.emit('chat message', message);
  };

  return (
    // Render your chat UI and handle sending/receiving messages
    <></>
  );
};

export default ChatComponent;
