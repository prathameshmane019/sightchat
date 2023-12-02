"use client"
import React, { useState } from 'react';
import { Input, Button} from '@nextui-org/react';
import { signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { data: session } = useSession();

  if (session) {
    router.push("/chats");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.ok) {
        console.log("Login successful");
        router.push("/chats");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignup = () => {
    router.push("/signup");
  };
  return (
    <div className='gap-6 flex flex-col justify-center mb-6 md:mb-0 border-2  p-8 rounded-3xl bg-opacity-50  backdrop-filter backdrop-blur-md'>
      <form onSubmit={handleSubmit}>
        <div className='my-4 text-4xl text-center'>
          <h2>Sign In Form</h2>
        </div>
        <div className="flex flex-col w-full md:w-[30vw] mb-6">
          <Input
            color='primary'
            type="email"
            variant='filled'
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="flex flex-col w-full md:w-[30vw] mb-6">
          <Input
            color='primary'
            type="password"
            variant='filled'
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="flex flex-row justify-center w-full gap-6">
          <Button color='default' variant='flat' className='w-[10vw]' onClick={() => router.push('/')}>
            Cancel
          </Button>
          <Button type='submit' color="primary" variant="ghost" className='w-[10vw]'>
            Sign In
          </Button>
        </div>
      </form>
      <div className="text-center mt-4">
        <p>Don<span>&#39;</span>t have an account? <span className="text-secondary-500 cursor-pointer" onClick={handleSignup}>Sign Up</span></p>
      </div>
    </div>
  );
};
export default Login;