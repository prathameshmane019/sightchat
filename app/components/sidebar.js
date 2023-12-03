// Import necessary modules
import React, { useState, useEffect } from 'react';
import SearchBar from './search';
import Users from './users';
import ProfileSkeleton from './skeletons/user';
import { useRouter } from 'next/navigation';

// Sidebar component
export default function Sidebar({ loggedInUser }) {
  // Get the router instance
  const router = useRouter();

  // Use the optional chaining operator (?.) to guard against undefined values
  const shouldHideSidebar = router?.pathname?.startsWith('/chats/conversation');

  // State for users and loading
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const email = loggedInUser?.email;

  // Fetch users on component mount
  useEffect(() => {
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
          {/* (Rest of the skeleton components) */}
        </>
      ) : (
        <Users users={users} loggedInUser={loggedInUser} />
      )}
    </div>
  );
}
