'use client'
import React from 'react'
import SearchBar from './search'
import Users from './users'
import { useState, useEffect } from 'react'
import ProfileSkeleton from './skeletons/user'

export default function Sidebar({loggedInUser}) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/user');
        const data = await response.json();
        setUsers(data.users.filter(user => user.email !== loggedInUser.email))
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
      }

    };
    fetchUsers();
  }, [loggedInUser?.email]);
  return (
    <div className='w-[23vw] h-[100vh]  flex flex-col overflow-x-hidden overflow-y-auto bg-slate-100 dark:bg-neutral-900 '>
      <div className='text-xl h-[7vh] bg-secondary-700 flex items-center '>
    <h2 className='ml-2 text-slate-200'>SightChat</h2>
  </div> 
      <SearchBar />
      {loading ? (
        // Render a loading indicator while waiting for data
        <><ProfileSkeleton />
          <ProfileSkeleton />
          <ProfileSkeleton />
          <ProfileSkeleton />
          <ProfileSkeleton />
          <ProfileSkeleton />
          <ProfileSkeleton />
          <ProfileSkeleton />
        </>
      ) : (
        <Users users={users} loggedInUser={loggedInUser} />
      )}

    </div>
  )
}


