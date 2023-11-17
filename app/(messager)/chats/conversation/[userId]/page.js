'use client'
import { useState, useEffect } from 'react';
import Header from './../../../../components/header'
import Chat from '@/app/components/message';
const YourComponent = ({ params }) => {
  const [data, setData] = useState(null);
  const id = params.userId;
 
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
    // Fetch all users from the database
        const {user} = await response.json();
        setData(user)
        console.log(data);
        if (response.ok) {
        } else {
          console.error('Error fetching data:', result.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);


  return (
    <div>
      <Header user={data}/>
      <Chat reciver={data}/>
    </div>
  );
};

export default YourComponent;