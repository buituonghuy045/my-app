/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useRouter, usePathname } from "next/navigation";

import { products } from "@/data/products";

import { useStaffData } from "@/app/hooks/use-staffData";
import { useCustomerData } from "@/app/hooks/use-customerData";

type SearchModalProps = {
    dialogRef: React.RefObject<HTMLDialogElement | null>;
};

type SearchResult = {
    id: string | number;
    title: string;
    badge: string;
    description: string;
    targetUrl: string;
};

// 2. CẤU HÌNH TÌM KIẾM
const searchConfig: Record<string, any> = {
    customers: {
        filterMatch: (item: any, q: string) =>
            String(item.id).includes(q) || (item.full_name && item.full_name.toLowerCase().includes(q)) || (item.email && item.email.toLowerCase().includes(q)),
        formatResult: (item: any, path: string) => ({
            id: item.id, title: item.full_name, badge: "Customer",
            description: `ID: ${item.id} | Email: ${item.email}`, targetUrl: `${path}#customer-${item.id}`
        })
    },
    products: {
        filterMatch: (item: any, q: string) =>
            String(item.id).includes(q) || (item.name && item.name.toLowerCase().includes(q)),
        formatResult: (item: any, path: string) => ({
            id: item.id, title: item.name, badge: "Product",
            description: `ID: ${item.id} | Price: $${item.price}`, targetUrl: `${path}#product-${item.id}`
        })
    },
    staffs: {
        filterMatch: (item: any, q: string) =>
            String(item.id).includes(q) || (item.name && item.name.toLowerCase().includes(q)) || (item.email && item.email.toLowerCase().includes(q)),
        formatResult: (item: any, path: string) => ({
            id: item.id, title: item.name, badge: item.role,
            description: `ID: ${item.id} | Email: ${item.email}`, targetUrl: `${path}#staff-${item.id}`
        })
    }
};

export default function SearchModal({ dialogRef }: SearchModalProps) {
    const { t } = useTranslation();
    const router = useRouter();
    const pathname = usePathname();

    const [query, setQuery] = useState("");

    const { data: staffsData = [] } = useStaffData();
    const { data: customersData = [] } = useCustomerData();

    const results = useMemo<SearchResult[]>(() => {
        if (!query.trim()) return [];

        const lowerQuery = query.toLowerCase();

        let currentEntity = "staffs";
        let sourceData = staffsData;

        if (pathname.includes("/customers")) {
            currentEntity = "customers";
            sourceData = customersData;

        } else if (pathname.includes("/products")) {
            currentEntity = "products";
            sourceData = products;
        }

        const strategy = searchConfig[currentEntity];

        if (!Array.isArray(sourceData)) return [];

        return sourceData
            .filter((item: any) => strategy.filterMatch(item, lowerQuery))
            .map((item: any) => strategy.formatResult(item, pathname));

    }, [query, pathname, staffsData, customersData]);

    const handleClose = () => {
        setQuery("");
        dialogRef.current?.close();
    };

    return (
        <dialog ref={dialogRef} className="modal backdrop-blur-sm">
            <div className="modal-box max-w-2xl h-[500px] flex flex-col pt-10 shadow-2xl">
                <div className="p-1 absolute top-4 right-4 font-bold text-xl cursor-pointer text-base-content hover:text-error" onClick={handleClose}>
                    ✕
                </div>

                <div className="flex items-center border-b-2 border-base-300 pb-4 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-3 text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <input
                        type="text"
                        placeholder={t("Type to search ID, name, email...")}
                        className="input input-ghost w-full text-xl focus:outline-none focus:bg-transparent px-0"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>

                <div className="overflow-y-auto flex-1 custom-scrollbar">
                    {query && results.length === 0 ? (
                        <p className="text-center text-gray-400 mt-10">No results found for &quot;{query}&quot;</p>
                    ) : (
                        <ul className="menu bg-base-100 w-full rounded-box p-0">
                            {results.map(item => (
                                <li key={item.id} className="border-b border-base-200 last:border-0">
                                    <button
                                        onClick={() => { router.push(item.targetUrl); handleClose(); }}
                                        className="flex flex-col items-start gap-1 p-3 hover:bg-base-200 w-full text-left"
                                    >
                                        <span className="font-bold text-lg">
                                            {item.title} <span className="badge badge-sm badge-info ml-2">{item.badge}</span>
                                        </span>
                                        <span className="text-sm opacity-70">{item.description}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={handleClose}>close</button>
            </form>
        </dialog>
    );
}