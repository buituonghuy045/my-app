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
    role?: string;
};

export default function DataTable({ title, data, columns, onAdd, role }: DataTableProps) {
    const { t } = useTranslation();

    return (
        <div className="mx-15 px-4 mt-40 border-2 border-base-300 bg-base-100">
            <div className="p-10">
                <div className="flex justify-between mb-6">
                    <h1 className="font-bold text-4xl mb-4">{t(title)}</h1>
                    {role === 'ADMIN' && onAdd && (
                        <Button type="primary" className="bg-success text-lg h-10" onClick={onAdd}>
                            {t("add")}
                        </Button>
                    )}
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