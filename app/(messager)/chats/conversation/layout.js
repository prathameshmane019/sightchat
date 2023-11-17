import './../../../globals.css';
import Header from '@/app/components/header';

export default function RootLayout({ children }) {
  return (
  
        <div className="flex flex-col h-[90vh]">
            <div className="  w-[70vw]  bg-slate-300 ">{children}</div>
          </div>
      
  
  )
}
