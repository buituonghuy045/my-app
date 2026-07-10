'use client'
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type Column = {
    header: string;
    accessor: string;
};

type TableProps = {
    title: string;
    columns: Column[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any[];
};

export default function Table({ title, data, columns }: TableProps) {
    const { t } = useTranslation();
    const [role, setRole] = useState("");
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setRole(localStorage.getItem("role") || "");
    }, []);
    return (
        <div className="mx-15 px-4 mt-5 border-2 border-base-300 bg-base-100">
            <div className="p-10">
                <div className="flex justify-between">
                    <h1 className="text-bold text-4xl mb-4">{t(title)}</h1>
                    {role == 'ADMIN' &&
                        <button className="btn btn-success text-2xl">{t("add")}</button>}
                </div>
                <table className="table text-center">
                    <thead>
                        <tr>
                            {columns.map((col) => (
                                <th key={col.accessor}>
                                    {t(col.header)}
                                </th>
                            ))}
                            <th>{t("actions")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row) => (
                            <tr key={row.id}>
                                {columns.map((col) => (
                                    <td key={col.accessor}>
                                        {row[col.accessor]}
                                    </td>
                                ))}
                                <td>
                                    {role == 'ADMIN' &&
                                        <div>
                                            <button className="btn btn-warning m-2">{t("edit")}</button>
                                            <button className="btn btn-error m-2">{t("delete")}</button>
                                        </div>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
