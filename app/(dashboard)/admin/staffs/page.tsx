/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useState, useEffect } from "react";
import { message, Popconfirm, Image } from "antd";
import DataTable from "@/components/common/DataTable";
import GenericModal from "@/components/common/Modal";
import StaffForm from "@/components/common/staff/StaffForm";
import { Staff } from "@/types/staffs";
import { useTranslation } from "react-i18next";
import { useStaffData, useStaffMutations } from "@/app/hooks/use-staffData";

export default function StaffManagementPage() {
    const { t } = useTranslation();

    const { data, isPending, isError, error } = useStaffData();
    const { addStaff, updateStaff, deleteStaff } = useStaffMutations();
    const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);
    const [messageApi, contextHolder] = message.useMessage();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");
    const [editingStaff, setEditingStaff] = useState<any>(null);
    useEffect(() => {
        const storedRole = localStorage.getItem("role");
        setCurrentUserRole(storedRole ? storedRole : "STAFF");
    }, []);

    const handleOpenAdd = () => {
        setModalMode("add");
        setEditingStaff(null);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (staff: any) => {
        setModalMode("edit");
        setEditingStaff(staff);
        setIsModalOpen(true);
    };

    const handleSave = (formData: any) => {
        if (modalMode === "add") {
            addStaff.mutate(formData, {
                onSuccess: () => {
                    setIsModalOpen(false);

                    setTimeout(() => {
                        messageApi.success("Đã thêm khách hàng mới thành công!");
                    }, 50);
                }
            });
        } else {
            updateStaff.mutate(formData, {
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
        deleteStaff.mutate(id, {
            onSuccess: () => {
                setTimeout(() => {
                    messageApi.success("Đã xóa khỏi hệ thống!");
                }, 50);
            }
        });
    };

    if (!currentUserRole || isPending) {
        return <div className="p-10 text-center text-xl font-semibold">{t('staffTable.loading')}</div>;
    }

    if (isError) {
        return <div className="p-4 text-center text-red-500">{t('staffTable.error')} : {error?.message}</div>;
    }

    const columns = [
        { title: t('staffTable.id'), dataIndex: 'id', key: 'id' },
        {
            title: t('staffTable.avatar'),
            dataIndex: 'avatar',
            key: 'avatar',
            render: (text: string, record: Staff) => (
                <Image
                    width={50}
                    height={50}
                    style={{ borderRadius: '50%', objectFit: 'cover' }}
                    src={text}
                    alt={record.name}
                    fallback="https://via.placeholder.com/50"
                />
            ),
        },
        { title: t('staffTable.name'), dataIndex: 'name', key: 'name' },
        { title: t('staffTable.role'), dataIndex: 'role', key: 'role' },
        { title: t('staffTable.email'), dataIndex: 'email', key: 'email' },
        { title: t('staffTable.gender'), dataIndex: 'gender', key: 'gender' },
        ...(currentUserRole === 'ADMIN' ? [
            {
                title: t('staffTable.action'),
                key: 'action',
                render: (_: any, record: Staff) => (
                    <div className="flex gap-2">
                        <button className="btn btn-sm btn-warning" onClick={() => handleOpenEdit(record)}>
                            {t('staffTable.edit')}
                        </button>

                        <Popconfirm
                            title={t('staffTable.deleteTitle')}
                            description={t('staffTable.deleteDesc')}
                            onConfirm={() => handleDelete(record.id)}
                            okText={t('staffTable.yes')}
                            cancelText={t('staffTable.no')}
                            placement="topRight"
                        >
                            <button className="btn btn-sm btn-error text-white">
                                {t('staffTable.delete')}
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
                title={t('staffManagement')}
                data={data}
                columns={columns}
                onAdd={handleOpenAdd}
                role={currentUserRole}
            />

            <GenericModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={modalMode === "add" ? t('staffTable.addStaff') : t('staffTable.editStaff')}
            >
                <StaffForm
                    mode={modalMode}
                    initialData={editingStaff}
                    onSave={handleSave}
                />
            </GenericModal>
        </div>
    );
}