"use client"
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
const YourComponent = () => {
  const { data: session } = useSession();
const router =useRouter()
  const handleSignOut = async () => {
    await signOut(); 
    router.push('/')
  };

  return (
    <div className='flex '>

      {session ? (
<>
        <button onClick={handleSignOut} className='flex '><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-4 ">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
      </svg><span className=''>Logout</span>
      </button>
      
      </>
      ) : (
        <p>Not signed in</p>
      )}
    </div>
  );
};

export default YourComponent;
