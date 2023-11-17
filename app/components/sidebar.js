'use client'
import React from 'react'
import SearchBar from './search'
import Users from './users'
import { useState,useEffect } from 'react'

export default function() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/user');
        const data = await response.json();
        setUsers(data.users);
      
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);
  return (
    <div className='w-[23vw] h-[100vh] border-2 ml-[3vw] border-sky-500 flex flex-col overflow-x-hidden overflow-y-auto'>
        <div className='text-white text-xl bg-primary-500 text-start h-[7vh] align-middle '>
          <h2 className='ml-4 text-start'  >ChatWave</h2></div>

    <SearchBar />
    <Users users={users} />
  </div>
  )
}


