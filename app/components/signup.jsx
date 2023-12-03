"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button, Link } from '@nextui-org/react';

const Signup = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      console.log('Invalid email format.');
      return;
    }

    if (!name || !phone || !email || !password) {
      console.log('Please fill in all fields.');
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
        }),
      });

      const data = await res.json();
      console.log('API Response:', data);

      const form = e.target;
      form.reset();
      router.push("/login");
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className='gap-6 flex flex-col justify-center mb-6 md:mb-0 border-2  p-8 rounded-3xl backdrop-filter backdrop-blur-md bg-opacity-20'>
      <div className=' text-4xl text-center mb-4'><h2>Sign Up Form</h2></div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col w-full md:w-[30vw] mb-6">
          <Input color='primary' type="text" variant='filled' label="Name" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="flex flex-col w-full md:w-[30vw] mb-6">
          <Input color='primary' type="tel" variant='filled' label="Phone" onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="flex flex-col w-full md:w-[30vw] mb-6">
          <Input type="text" variant='filled' label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="flex flex-col w-full md:w-[30vw] mb-6">
          <Input color='primary' type="password" variant='filled' label="Password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="flex justify-center w-full gap-6 md:flex-nowrap mb-6">
          <Button variant='flat' color="error"  className='w-[10vw]' onClick={() => router.push('/')}>
            Cancel
          </Button>
          <Button type='submit' color="primary" variant="ghost" className='w-[10vw]'>
            Sign Up
          </Button>
        </div>
      </form>
      <div className='text-center'>
        <p className=''>
          Already have an account?{' '}
          <Link href="/login" color='primary'>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
