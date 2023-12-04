'use client'
import React, { useState, useEffect } from 'react';
import SearchBar from './search';
import Users from './users';
import ProfileSkeleton from './skeletons/user';
export default function Sidebar({ loggedInUser }) {
  const [currentPath,setPath]= useState()
 
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const email = loggedInUser?.email;
  
  const shouldHideSidebar = currentPath?.startsWith('/chats/conversation');

  // Fetch users on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Get the current URL path
       setPath(window.location.pathname)
    } 
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/user');
        const data = await response.json();
        setUsers(data.users.filter(user => user?.email !== email));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [email]);

  // Render the sidebar component
  return (
    <div className={`${shouldHideSidebar ? 'hidden' : 'flex'} sm:flex w-[100vw] sm:w-[23vw] h-[100vh] flex-col overflow-x-hidden overflow-y-auto bg-slate-100 dark:bg-neutral-900`}>
      <div className='text-xl h-[7vh] bg-secondary-700 flex items-center '>
        <h2 className='ml-2 text-slate-200'>SightChat</h2>
      </div> 
      <SearchBar />
      {loading ? (
        <>
          <ProfileSkeleton />
          <ProfileSkeleton />
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
  );
}
