'use client'
import { useState, useEffect,useRef } from 'react';
import io from 'socket.io-client';
import { useSession } from 'next-auth/react';
import '../globals.css';
import dateFind from '../utils/dateFind'
const Chat = ({ reciver, sender }) => {
  const [messages, setMessages] = useState([]);
  const { data: session } = useSession();
  const [input, setInput] = useState('');
  const reciverid = reciver?._id
  const senderid = sender?._id
  const sendername = sender?.name
  const [conversationId, setconversationId] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const socket = io('http://localhost:5000', {
    transports: ['websocket'],
  });

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/fetchmessages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            senderId: senderid,
            reciverId: reciverid
          }),
        }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const { messages, conversationId } = await response.json();
        setconversationId(conversationId)
        setMessages(messages);
      } catch (error) {
        console.error('Error fetching initial messages:', error);
      }
    };
    fetchMessages()
  }
    , [senderid, reciverid]
  )
  useEffect(() => {
    socket.emit('join', conversationId)
    if (sender) {
      socket.emit('user-connected', senderid, sendername, conversationId);
    }

    return () => {

      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, [socket, senderid, sendername, session, conversationId]);

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
          reciverId: reciverid,
          conversationId: conversationId,
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
      reciverId: reciverid,
      conversationId: conversationId,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    socket.emit('message', newMessage);
    setInput('');
  };

  const handleInputChange = async (event) => {
    setInput(event.target.value);
  }

  return (
    <div className='h-[93vh] flex flex-col bg-chat ' >
      <div className='flex-1  overflow-y-auto w-[100%]  '>
        {messages.map((message, index) => (
           <div key={index}>
           {index === 0 || dateFind(messages[index - 1].createdAt).day !== dateFind(message.createdAt).day ? (
             <div className='text-xs text-center mt-2'>
              
             {dateFind(message.createdAt).day}
           </div>
           ) : null}
           <div
           ref={messagesEndRef}
             key={index}
             className={`${message.senderId === senderid ? 'block float-right w-[100%]' : ' block float-left w-[100%]'} `}
           >
             <div
               className={`mb-4 max-w-xs mx-auto p-2 rounded-lg  ${message.senderId === senderid ? 'sender-chat-bubble chatBubble bg-secondary-700' : ' receiver-chat-bubble chatBubble '}`}
             >
               {message.senderId !== senderid && (
                 <span className='text-xs'>{message.username}</span>
               )}
               <p className='mt-1'>{message.text}</p>
               <p className={`text-xs ${message.senderId === senderid ? 'text-slate-200' : 'text-slate-900'}`}>
                 <span>{dateFind(message.createdAt).time}</span>
               </p>
             </div>
           </div>
         </div>
        ))}
      </div>
      <div className='bg-transparent mx-2 mb-4'>
        <form onSubmit={handleSubmit} className='flex items-center  backdrop-filter backdrop-blur-md  rounded-xl bg-transparent'>
          <input
            type='text'
            value={input}
            onChange={handleInputChange}
            className='flex-1  border-blue-500 rounded-l p-2 outline-none bg-opacity-30 focus:bg-opacity-40 text-base placeholder-gray-400'
            placeholder='Type your message...'
          />
          <button type='submit' className='bg-blue-500 text-white rounded-r p-2 ml-2 hover:bg-opacity-80 transition-all'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
