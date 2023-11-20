'use client'
import { useState, useEffect } from 'react';
import Header from './../../../../components/header';
import Chat from '@/app/components/message';
import { useSession } from 'next-auth/react';
const YourComponent = ({ params }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState([]);
  const [data, setData] = useState(null); // Initialize data as null
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const id = params.userId;
  const email = session?.user?.email
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const { user } = await response.json();
        setData(user);
        setLoading(false); // Set loading to false after fetching user data
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false); // Set loading to false on error
      }

      if (data) {
        try {
          const response = await fetch('http://localhost:3000/api/fetchmessages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              senderId: id,
              reciverId: data._id,
            }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const initialMessages = await response.json();
          setChats(initialMessages);
        } catch (error) {
          console.error('Error fetching initial messages:', error);
        }
      }

      try {
        const response = await fetch('/api/sender', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify( {email} ),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const userData = await response.json();

        setUser(userData.user);

      } catch (error) {
        console.error('Error fetching user data:', error);
      }

    };

    fetchData();
  }, [id, data]); // Include 'data' in the dependency array
  return (
    <div>
      {loading ? (
        // Render a loading indicator while waiting for data
        <p>Loading...</p>
      ) : (
        <>
          <Header user={data} />
          <Chat reciver={data} chats={chats} sender={user} />
        </>
      )}
    </div>
  );
};

export default YourComponent;
