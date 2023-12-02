'use client'
import { useState, useEffect, Suspense } from 'react';
import Header from './../../../../components/header';
import Chat from '@/app/components/message';
import { useSession } from 'next-auth/react';
import ProfileSkeleton from '@/app/components/skeletons/user';

const YourComponent = ({ params }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState([]);
  const [data, setData] = useState(null);
  const [chats, setChats] = useState([]);
  const id = params.userId;
  const email = session?.user?.email;
  const messages = chats
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/contact', {
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

      } catch (error) {
        console.error('Error fetching user data:', error);
        
      }
    };
    if (!data) {
      fetchData();
    }

    if (data) {
      

      const fetchSender = async () => {
        try {
          const response = await fetch('/api/sender', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
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
      fetchSender();
    }
  }, [id, data, email]);
  return (
    <div className=" h-100">
      <Suspense fallback={<ProfileSkeleton />}>
        <Header user={data} />
        <Chat reciver={data} chats={messages} sender={user}  />
      </Suspense>
    </div>
  );
};

export default YourComponent;