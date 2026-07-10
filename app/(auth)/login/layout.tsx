import { Metadata } from 'next';
import React from 'react'
import "@/styles/login.css";

export const metadata: Metadata = {
    title: "Login",
};
export default function LoginLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            {children}
        </>


    )
}
