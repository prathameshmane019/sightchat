import './../../../globals.css';
export default function RootLayout({ children }) {
  return (

    <div className="flex flex-col h-[94vh] sm:h-[100vh] bg-slate-200 dark:bg-neutral-950">
      <div className="w-[100vw]  md:w-[75vw]  ">{children}</div>
    </div>


  )
}
