
"use client"
import React, { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
const signup = () => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault()
        if (!name || !phone || !email || !password) {
            console.log('Please fill in all fields.');
            return;
        }
        const res = await fetch("api/register", {
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
          const form = e.target;
          form.reset();
          router.push("/login");
        console.log('Sign up with email:', email, 'and password:', password);
    };

    return (
        <div className='gap-6 flex flex-col  justify-center mb-6 md:mb-0 border-2 border-sky-600 p-8 rounded-3xl'>
            <div className='text-sky-600 text-4xl text-center'><h2 >Sign Up Form</h2></div>
            <form onSubmit={handleSubmit}>
            <div className="flex flex-col w-[30vw]  md:flex-nowrap mb-6 md:mb-0">
                <Input color='primary' type="text" variant='bordered' label="Name" onChange={(e) => setName(e.target.value)} value={name}/>
            </div>
            <div className="flex flex-col w-[30vw]  md:flex-nowrap mb-6 md:mb-0">
                <Input color='primary' type="tel" variant='bordered' label="Phone" onChange={(e) => setPhone(e.target.value)} value={phone}/>
            </div>
            <div className="flex flex-col w-[30vw]  md:flex-nowrap mb-6 md:mb-0">
                <Input color='primary' type="email" variant='bordered' label="Email" onChange={(e) => setEmail(e.target.value)} value={email}/>
            </div>
            <div className="flex flex-col w-[30vw]  md:flex-nowrap mb-6 md:mb-0">
                <Input color='primary' type="password" variant='bordered' label="Password" onChange={(e) => setPassword(e.target.value)} value={password}/>
            </div>
            <div className="flex flex-row justify-center w-full gap-12 md:flex-nowrap mb-6 md:mb-0">
                <Button type='submit'  variant='flat' className='w-[10vw]' > 
                    Cancel
                </Button>
                <Button type='submit'  color="primary" variant="ghost" className='w-[10vw]'>
                    Sign Up
                </Button>
            </div>
            </form>
        </div>
    )
}

export default signup
