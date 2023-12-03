'use client'
import '../globals.css';
import Sidebar from './../../app/components/sidebar';
import { ThemeSwitcher } from '../components/theme-toggle';
import { useSession } from 'next-auth/react';
import SignOut from '../components/signout';
import { useEffect, useState } from 'react';
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

export default function RootLayout({ children }) {
  const { data: session } = useSession();
  const email = session?.user?.email
  const [user, setUser] = useState();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

 
  useEffect(() => {
    const fetchSender = async () => {
      try {
        const response = await fetch('/api/sender', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const userData = await response.json();
        setUser(userData.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchSender()
  }, [email])

  return (
    <div className="flex flex-col h-[100vh] sm:flex-row overflow-y">
      <div className="flex flex-row-reverse   sm:w-[2vw]   sm:flex-col-reverse p-auto items-center justify-items-center bg-slate-200 dark:bg-gray-950 " >
        <ThemeSwitcher />
        <>
          <button onClick={onOpen} className='m-4'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>

          </button>
          <Modal
  backdrop="opaque"
  isOpen={isOpen}
  onOpenChange={onOpenChange}
  classNames={{
    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
  }}
>
  <ModalContent>
    {(onClose) => (
      <>
        <ModalHeader className="flex flex-col gap-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4">
          <h1 className="text-2xl font-bold">Profile</h1>
          
        </ModalHeader>

        <ModalBody>
          <div className="mt-3">
            <h3 className="text-2xl font-bold">{user?.name}</h3>
            <div className="flex flex-row my-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-500 mx-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
              <p className="text-gray-500">Phone:</p>
              {user?.phone}
            </div>

            <div className="flex flex-row my-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-500 mx-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              <p className="text-gray-500">Email:</p> {user?.email}
            </div>
          </div>
          <SignOut />
        </ModalBody>

        <ModalFooter className="flex justify-end">
          <Button
            color="danger"
            variant="light"
            onPress={onClose}
            className="mr-2"
          >
            Close
          </Button>
        </ModalFooter>
      </>
    )}
  </ModalContent>
</Modal>

        </>
      </div>
      <Sidebar loggedInUser={user}  />
      <div className=" md:w-[75vw] ">{children}</div>
    </div>

  )
}
