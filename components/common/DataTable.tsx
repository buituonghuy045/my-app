'use client'
import { Button, ConfigProvider, Table } from "antd";
import { useTranslation } from "react-i18next";

type DataTableProps = {
    title: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    columns: any[];
    onAdd?: () => void;
    handleExportCSV?: () => void;
    role?: string;
};

export default function DataTable({ title, data, columns, onAdd, role, handleExportCSV }: DataTableProps) {
    const { t } = useTranslation();

    return (
        <div className="mx-15 px-4 mt-40 border-2 border-base-300 bg-base-100">
            <div className="p-10">
                <div className="flex justify-between mb-6">
                    <h1 className="font-bold text-4xl mb-4">{t(title)}</h1>
                    <div className="flex gap-5">
                        {role === 'ADMIN' && onAdd && (
                            <Button type="primary" onClick={onAdd}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                {t("add")}
                            </Button>
                        )}
                        <Button type="primary" onClick={handleExportCSV} disabled={!data || data.length === 0}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                            {t("export")}
                        </Button>
                    </div>

                </div>

                <ConfigProvider
                    theme={{
                        components: {
                            Table: {

                                headerBg: 'var(--color-base-100)',
                                headerColor: 'var(--color-base-content)',

                                colorBgContainer: 'var(--color-base-100)',
                                colorText: 'var(--color-base-content)',

                                rowHoverBg: 'var(--color-base-200)',
                            },
                        },
                    }}
                >
                    <Table
                        dataSource={data}
                        columns={columns}
                        rowKey="id"
                        pagination={{ pageSize: 5 }}
                    />
                </ConfigProvider>
            </div>
        </div>
    )
}