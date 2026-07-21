
import { Metadata } from 'next';
import React from 'react'
import Sidebar from '../../components/dashboard/Sidebar';
import "@/styles/dashboard.css";
export const metadata: Metadata = {
    title: "Dashboard",
};

export default function DashboardLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="grid grid-cols-12 m-0">
            <Sidebar />
            <div className='col-span-1 bg-base-200'></div>
            <div className="col-span-8 px-0 bg-base-100">
                {children}
            </div>
            <div className='col-span-1 bg-base-200'></div>
        </div>
    )
}
