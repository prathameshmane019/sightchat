import { Inter } from 'next/font/google'
import '../globals.css';
import Sidebar from './../../app/components/sidebar';

export default function RootLayout({ children }) {
  return (
  
        <div className="flex flex-row h-[100vh]">
            <div className="w-[3vw] bg-violet-500" >
              <Sidebar />
            </div>
            <div className=" ml-[23vw] w-[75vw]  bg-slate-300 ">{children}</div>
          </div>
  
  )
}
