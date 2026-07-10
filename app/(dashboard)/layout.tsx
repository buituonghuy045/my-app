
import { Metadata } from 'next';
import React from 'react'
import Sidebar from '../../components/dashboard/Sidebar';
import "@/styles/dashboard.css";
import Modal from '@/components/common/Modal';
export const metadata: Metadata = {
    title: "Dashboard",
};

export default function DashboardLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="grid grid-cols-12 m-0">
            <Sidebar />
            <div className="col-span-10 px-0 bg-base-200">
                {children}
            </div>
            <Modal />
        </div>
    )
}
