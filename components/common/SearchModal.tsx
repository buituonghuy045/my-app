'use client'
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { staffs } from "@/data/staffs";
import { Staff } from "@/types/staffs";
import { useRouter } from "next/navigation";

type SearchModalProps = {
    dialogRef: React.RefObject<HTMLDialogElement | null>;
};

export default function SearchModal({ dialogRef }: SearchModalProps) {
    const { t } = useTranslation();
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Staff[]>([]);

    const [role, setRole] = useState("");
    const router = useRouter();

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setRole(localStorage.getItem("role") || "");
    }, []);

    useEffect(() => {
        if (query.trim() === "") {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setResults([]);
            return;
        }

        const lowerQuery = query.toLowerCase();
        const filtered = staffs.filter(staff =>
            String(staff.id).includes(lowerQuery) ||
            staff.name.toLowerCase().includes(lowerQuery) ||
            staff.email.toLowerCase().includes(lowerQuery) ||
            staff.role.toLowerCase().includes(lowerQuery)
        );

        setResults(filtered);
    }, [query]);

    const handleClose = () => {
        setQuery("");
        dialogRef.current?.close();
    };

    const handleSelectResult = (staffId: number) => {
        let targetUrl = "";

        if (role === "ADMIN") {
            targetUrl = `/admin/dashboard#staff-${staffId}`;
        } else {
            targetUrl = `/staff/dashboard#staff-${staffId}`;
        }

        router.push(targetUrl);
        handleClose();
    };

    return (
        <dialog ref={dialogRef} className="modal backdrop-blur-sm">
            <div className="modal-box max-w-2xl h-[500px] flex flex-col pt-10 shadow-2xl">
                <div
                    className="p-1 absolute top-4 right-4 font-bold text-xl cursor-pointer text-base-content hover:text-error"
                    onClick={handleClose}
                >
                    ✕
                </div>

                <div className="flex items-center border-b-2 border-base-300 pb-4 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-3 text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Type to search ID, name, email..."
                        className="input input-ghost w-full text-xl focus:outline-none focus:bg-transparent px-0"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>

                <div className="overflow-y-auto flex-1 custom-scrollbar">
                    {query && results.length === 0 ? (
                        // eslint-disable-next-line react/no-unescaped-entities
                        <p className="text-center text-gray-400 mt-10">No results found for "{query}"</p>
                    ) : (
                        <ul className="menu bg-base-100 w-full rounded-box p-0">
                            {results.map(staff => (
                                <li key={staff.id} className="border-b border-base-200 last:border-0">
                                    <button
                                        onClick={() => handleSelectResult(staff.id)}
                                        className="flex flex-col items-start gap-1 p-3 hover:bg-base-200 w-full text-left"
                                    >
                                        <span className="font-bold text-lg">
                                            {staff.name}
                                            <span className="badge badge-sm badge-info ml-2">{staff.role}</span>
                                        </span>
                                        <span className="text-sm opacity-70">
                                            ID: {staff.id} | Email: {staff.email}
                                        </span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <form method="dialog" className="modal-backdrop">
                <button onClick={() => setQuery("")}>close</button>
            </form>
        </dialog>
    )
}