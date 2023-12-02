import './../../../globals.css';
export default function RootLayout({ children }) {
  return (

    <div className="flex flex-col h-[100vh] bg-slate-200 dark:bg-neutral-950">
      <div className="  w-[73vw]  ">{children}</div>
    </div>


  )
}
