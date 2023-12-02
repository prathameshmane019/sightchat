"use client";
import {useTheme} from "next-themes";
import { useEffect, useState } from "react";
import {SunIcon,MoonIcon} from '@heroicons/react/24/solid'
export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null

  return (
    <div>
      <button onClick={() => setTheme(theme==='light'?'dark':'light')}>
        {theme==='dark'?<SunIcon className='text-orange-300 h-6 w-6 mx-auto' />:<MoonIcon className="h-6 w-6 text-slate-800 mx-auto"/>}
      </button>
     
    </div>
  )
};