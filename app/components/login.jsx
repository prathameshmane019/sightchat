
"use client"
import React, { useState } from 'react';
import { Input, Button} from '@nextui-org/react';
import { signIn, useSession } from "next-auth/react";
const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

        const handleSubmit = async (e) => {
            e.preventDefault();
        
            try {
              const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
              });
              
        if (!email || !password) {
            console.log('Please fill in all fields.');
            return;
        }
        console.log('Sign up with email:', email, 'and password:', password);
            }
            catch(e){
                console.log(e);
            }
        }

    return (
        <div className='gap-6 flex flex-col  justify-center mb-6 md:mb-0 border-2 border-sky-600 p-8 rounded-3xl'>
            <form onSubmit={handleSubmit}>
            <div className='text-sky-600 text-4xl text-center'><h2 >Sign In Form</h2></div>            
            <div className="flex flex-col w-[30vw]  md:flex-nowrap mb-6 md:mb-0">
                <Input color='primary' type="email" variant='bordered' label="Email" onChange={(e) => setEmail(e.target.value)} value={email}/>
            </div>
            <div className="flex flex-col w-[30vw]  md:flex-nowrap mb-6 md:mb-0">
                <Input color='primary' type="password" variant='bordered' label="Password" onChange={(e) => setPassword(e.target.value)} value={password}/>
            </div>
            <div className="flex flex-row justify-center w-full gap-12 md:flex-nowrap mb-6 md:mb-0">
                <Button type='' color='default' variant='flat' className='w-[10vw]' > 
                    Cancel
                </Button>
                <Button type='submit' color="primary" variant="ghost" className='w-[10vw]'>
                    Sign In
                </Button>
            </div>
            </form>
        </div>
    )
}

export default Login
