'use client'
import { SessionProvider } from "next-auth/react";
import {NextUIProvider} from '@nextui-org/react'
import {ThemeProvider  } from "next-themes";

export const AuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export function Providers({children}) {
  return (
    <NextUIProvider>
    <ThemeProvider attribute="class" defaultTheme="dark">
      {children}
      </ThemeProvider>
    </NextUIProvider>
  )
}