'use client'
import "@/styles/sidebar.css"
import ToggleTheme from '../common/ToggleTheme';
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { menus } from "@/data/sidebarMenus";
import LinkItem from "../common/LinkItem";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../common/LanguageSwitcher";
import SearchModal from "../common/SearchModal";

export default function Sidebar() {
    const { t } = useTranslation();
    const [role, setRole] = useState("");
    const searchModalRef = useRef<HTMLDialogElement>(null);
    const menuList = menus.filter(
        menu => menu.role === role
    );
    const handleOpenSearch = () => {
        searchModalRef.current?.showModal();
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setRole(localStorage.getItem("role") || "");
    }, []);
    return (
        <div className="col-span-2 sidebar h-screen sticky top-0 flex flex-col bg-base-300 text-base-content">
            {/* Avatar */}
            <SearchModal dialogRef={searchModalRef} />
            <div className='flex flex-col items-center gap-4 mt-10 pb-2 border-b-2 border-base-100'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-18 text-center ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                <h1 className="sidebar-title text-base-content">{role}</h1>
            </div>
            <div className="px-4 mt-4">
                <button
                    onClick={handleOpenSearch}
                    className="btn w-full flex justify-start gap-4 bg-base-100 border-2 border-base-200 hover:border-info text-gray-500 text-2xl py-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <span>Search... </span>
                </button>
            </div>
            {/*Menu*/}
            <div className="flex flex-col gap-4 flex-1 px-4 mt-6">
                <div className='flex flex-col gap-4'>
                    <LinkItem menuList={menuList} />
                </div>
            </div>
            {/*Tiện ích*/}
            <div className="mt-auto px-6 border-t-2 border-base-100 pt-3 text-base-content">
                <div className="sidebar-item-darkmode inline-flex items-center justify-between w-full">
                    <p className='text-bold text-xl inline-flex items-center gap-4 mb-0 pl-0'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                        </svg>
                        {t("darkMode")}
                    </p>
                    <ToggleTheme />
                </div>
                <div className='sidebar-item-darkmode inline-flex items-center justify-between w-full mt-4'>
                    <p className='text-bold text-xl inline-flex items-center gap-4 mb-0 pl-0'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
                        </svg>
                        {t("language")}
                    </p>
                    <LanguageSwitcher />
                </div>
                <div className='sidebar-items mt-10 pl-0'>
                    <Link href="/login" className='inline-flex items-center gap-4 text-base-content'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 gap-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                        </svg>
                        {t("logout")}
                    </Link>
                </div>
            </div>
        </div >
    )
}
