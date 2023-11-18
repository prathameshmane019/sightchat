'use client'
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useSession } from 'next-auth/react';
import '../globals.css';
const Chat = ({ reciver }) => {
  const { data: session } = useSession();
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [user, setUsers] = useState();
  const [input, setInput] = useState('');

  const socket = io('http://localhost:5000', {
    transports: ['websocket'],
  });
  const sendername = session?.user?.name;
  const senderid = user?._id

  const reciverid = reciver?._id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/fetchmessages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            senderId: senderid,
            reciverId: reciverid,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const initialMessages = await response.json();
        setChats(initialMessages)
      } catch (error) {
        console.error('Error fetching initial messages:', error);
      }
      try {
        const response = await fetch('/api/sender', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: session?.user?.email }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const userData = await response.json();

        setUsers(userData.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };


    if (user) {
      socket.emit('user-connected', user._id, sendername);
    }

    socket.on('message', async (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    fetchData();
    return () => {
      // Check if component is still mounted before disconnecting socket
      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, [socket, senderid, sendername, session]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: input,
          senderId: senderid,
          username: sendername,
          reciverId: reciverid
        }
        ),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
    const newMessage = {
      text: input,
      senderId: senderid,
      username: sendername,
      reciverId: reciverid
    };

    socket.emit('message', newMessage);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput('');
  };

  const handleInputChange = async (event) => {
    setInput(event.target.value);
  }

  return (
    <div className='h-[90vh] flex flex-col bg-chat'>
      <div className='flex-1  overflow-y-auto w-[100%]  '>
        {chats.map((message, index) => (
          <div
            key={index}
            className={`${message.senderId === senderid ? 'block float-right w-[100%]' : ' block float-left w-[100%]'
              }`}
          >
            <div
              className={`mb-4  max-w-xs mx-auto p-2 rounded-lg  ${message.senderId === senderid ? 'sender-chat-bubble chatBubble' : ' receiver-chat-bubble chatBubble'
                }`}
            >
              {message.senderId !== senderid && (
                <span className='text-xs'>{message.username}</span>
              )}
              <p className='mt-1'>{message.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='p-2'>
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
