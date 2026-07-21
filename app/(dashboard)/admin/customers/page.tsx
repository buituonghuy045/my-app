/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { useTranslation } from "react-i18next";
import DataTable from "@/components/common/DataTable";
import { useCustomerData, useCustomerMutations } from "@/app/hooks/use-customerData";
import { useEffect, useState } from "react";
import { Popconfirm, message } from "antd";
import GenericModal from "@/components/common/Modal";
import CustomerForm from "@/components/common/customer/CustomerForm";

export default function CustomerManagementPage() {
    const { t } = useTranslation();
    const { data, isPending, isError, error } = useCustomerData();
    const { addCustomer, updateCustomer, deleteCustomer } = useCustomerMutations();
    const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);
    const [messageApi, contextHolder] = message.useMessage();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");
    const [editingCustomer, setEditingCustomer] = useState<any>(null);

    useEffect(() => {
        const storedRole = localStorage.getItem("role");
        setCurrentUserRole(storedRole ? storedRole : "STAFF");
    }, []);

    const handleOpenAdd = () => {
        setModalMode("add");
        setEditingCustomer(null);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (customer: any) => {
        setModalMode("edit");
        setEditingCustomer(customer);
        setIsModalOpen(true);
    };

    const handleSave = (formData: any) => {
        if (modalMode === "add") {
            addCustomer.mutate(formData, {
                onSuccess: () => {
                    setIsModalOpen(false);

                    setTimeout(() => {
                        messageApi.success("Đã thêm khách hàng mới thành công!");
                    }, 50);
                }
            });
        } else {
            updateCustomer.mutate(formData, {
                onSuccess: () => {
                    setIsModalOpen(false);

                    setTimeout(() => {
                        messageApi.success("Đã cập nhật dữ liệu trên server!");
                    }, 50);
                }
            });
        }
    };

    const handleDelete = (id: number | string) => {
        deleteCustomer.mutate(id, {
            onSuccess: () => {
                setTimeout(() => {
                    messageApi.success("Đã xóa khỏi hệ thống!");
                }, 50);
            }
        });
    };
    const handleExportCSV = () => {
        if (!data || data.length === 0) {
            messageApi.warning(t('Không có dữ liệu để xuất!'));
            return;
        }

        const headers = ["ID", "Ngày đăng ký", "Họ Tên", "Email", "Giới tính", "Chi tiêu"];

        const csvRows = data.map((customer: any) => {
            return [
                customer.id,
                customer.date,
                `"${customer.full_name || ''}"`,
                customer.email,
                customer.gender,
                customer.spending
            ].join(",");
        });

        const csvString = [headers.join(","), ...csvRows].join("\n");

        const blob = new Blob(["\uFEFF" + csvString], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;

        link.setAttribute("download", `danh_sach_khach_hang_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        messageApi.success("Đã xuất file CSV thành công!");
    };

    if (!currentUserRole || isPending) {
        return <div className="p-10 text-center text-xl font-semibold">{t('customerTable.loading')}</div>;
    }

    if (isError) {
        return <div className="p-4 text-center text-red-500">{t('customerTable.error')} : {error?.message}</div>;
    }

    const columns = [
        { title: t('customerTable.id'), dataIndex: 'id', key: 'id' },
        { title: t('customerTable.date'), dataIndex: 'date', key: 'date' },
        { title: t('customerTable.full_name'), dataIndex: 'full_name', key: 'full_name' },
        { title: t('customerTable.email'), dataIndex: 'email', key: 'email' },
        { title: t('customerTable.gender'), dataIndex: 'gender', key: 'gender' },
        { title: t('customerTable.spending'), dataIndex: 'spending', key: 'spending' },

        ...(currentUserRole === 'ADMIN' ? [
            {
                title: t('customerTable.action'),
                key: 'action',
                render: (_: any, record: any) => (
                    <div className="flex gap-2">
                        <button className="btn btn-sm btn-warning" onClick={() => handleOpenEdit(record)}>
                            {t('customerTable.edit')}
                        </button>
                        <Popconfirm
                            title={t('customerTable.deleteTitle')}
                            description={t('customerTable.deleteDesc')}
                            onConfirm={() => handleDelete(record.id)}
                            okText={t('customerTable.yes')}
                            cancelText={t('customerTable.no')}
                            placement="topRight"
                        >
                            <button className="btn btn-sm btn-error text-white">
                                {t('customerTable.delete')}
                            </button>
                        </Popconfirm>
                    </div>
                ),
            }
        ] : []),
    ];

    return (
        <div>
            {contextHolder}
            <DataTable
                title={t('customerTable.title')}
                data={data}
                columns={columns}
                onAdd={handleOpenAdd}
                role={currentUserRole}
                handleExportCSV={handleExportCSV}
            />

            <GenericModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={modalMode === "add" ? "Thêm Khách Hàng Mới" : "Chỉnh Sửa Thông Tin"}
            >
                <CustomerForm
                    mode={modalMode}
                    initialData={editingCustomer}
                    onSave={handleSave}
                />
            </GenericModal>
        </div>
    );
}