// components/Chat.js
'use client'
import './../globals.css';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const isClient = typeof window !== 'undefined';
  const [input, setInput] = useState('');
  const [userId, setUserId] = useState(
    isClient ? localStorage.getItem('userId') || '' : ''
  );
  const [username, setUsername] = useState('');

  const socket = io('http://localhost:5000', {
    transports: ['websocket'],
  });

  useEffect(() => {
    const fetchUsername = () => {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      } else {
        const usernameInput = prompt('Please enter your name:');
        if (usernameInput) {
          setUsername(usernameInput);
          localStorage.setItem('username', usernameInput);
        }
      }
    };

    const fetchUserId = () => {
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId);
      } else {
        const newUserId = generateUserId();
        setUserId(newUserId);
        localStorage.setItem('userId', newUserId);
      }
    };

    fetchUsername();
    fetchUserId();

    socket.emit('user-connected', userId, username);

    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket, userId, username]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newMessage = {
      text: input,
      senderId: userId,
      username: username,
    };

    socket.emit('message', newMessage);
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    setInput('');
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const generateUserId = () => {
    return Math.random().toString(36).substring(7);
  };

  return (
    <div className='h-[95vh] flex flex-col'>
      <div className='flex-1  overflow-y-auto w-[100%]  '>
        {messages.map((message, index) => (
          <div className={`${
              message.senderId === userId ? 'block float-right w-[100%]' : ' block float-left w-[100%]'
            }`}
            >
          <div
            key={index}
            className={`mb-4  max-w-xs mx-auto p-2 rounded-lg  ${
              message.senderId === userId ? 'sender-chat-bubble chatBubble' : ' receiver-chat-bubble chatBubble'
            }`}
          >
            {message.senderId !== userId && (
              <span className='text-xs'>{message.username}</span>
            )}
            <p className='mt-1'>{message.text}</p>
          </div>
          </div>
        ))}
      </div>
      <div className='p-4'>
        <form onSubmit={handleSubmit} className='flex'>
          <input
            type='text'
            value={input}
            onChange={handleInputChange}
            className='flex-1 border rounded-l p-2'
            placeholder='Type your message...'
          />
          <button type='submit' className='bg-blue-500 text-white rounded-r p-2 ml-2'>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
