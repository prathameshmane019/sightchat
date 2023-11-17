'use client'
import Chats from "@/app/components/chats";
import { useEffect,useState } from "react";
export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/user');
        const data = await response.json();
        setUsers(data.users);
      
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);
  return (
    <div>
   <Chats users={users}/>
    </div>
  );
}
