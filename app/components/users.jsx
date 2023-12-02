'use client'
import React from "react";
import {Avatar, AvatarIcon} from "@nextui-org/react";
import { useRouter } from "next/navigation";
export default function Users({users}) {
  const router = useRouter();
  const handleUserClick = (userId) => {
    router.push(`/chats/conversation/${userId}`);
  };
  
  return (
    <div>
      {users.map((user) => (
        <div key={user._id} className="flex items-center bg-indigo-300 mx-4 my-1  p-3 rounded-xl  bg-opacity-20  backdrop-filter backdrop-blur-md" onClick={() => handleUserClick(user._id, user.name)}>
          
          <Avatar
            icon={<AvatarIcon />}
            classNames={{
              base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
              icon: "",
            }}
          />
          <div className="ml-6 ">{user.name}</div>
        </div>
      ))}
    </div>
  );
};