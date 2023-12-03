'use client'
import { useRouter } from 'next/navigation';

import GlassCard from '../app/components/glasscard';

const Home = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  const handleSignup = () => {
    router.push('/signup');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to SightChat</h1>
        <p className="text-lg mb-8">Connect with friends and chat in real-time!</p>

        <GlassCard>
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">Already have an account?</h2>
            <button onClick={handleLogin} className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300">Login</button>
          </div>
        </GlassCard>

        <div className="mt-8">
        <p className="text-lg mb-4">Don&apos;t have an account yet?</p>

          <GlassCard>
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-4">Create a new account</h2>
              <button onClick={handleSignup} className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition duration-300">Signup</button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Home; 
