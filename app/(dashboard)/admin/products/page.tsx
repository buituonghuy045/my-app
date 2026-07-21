/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useState, useEffect } from "react";
import { Popconfirm } from "antd";
import { useTranslation } from "react-i18next";
import DataTable from "@/components/common/DataTable";
import GenericModal from "@/components/common/Modal";
import ProductForm from "@/components/common/product/ProductForm";
import { products as initialProducts } from "@/data/products";
import { Product } from "@/types/products";

export default function ProductManagementPage() {
    const { t } = useTranslation();

    const [productList, setProductList] = useState<Product[]>(initialProducts);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);

    useEffect(() => {
        const storedRole = localStorage.getItem("role");
        setCurrentUserRole(storedRole ? storedRole : "STAFF");
    }, []);

    const handleOpenAdd = () => {
        setModalMode("add");
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (product: Product) => {
        setModalMode("edit");
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleSave = (data: Product) => {
        if (modalMode === "add") {
            setProductList([data, ...productList]);
        } else {
            setProductList(productList.map(item => item.id === data.id ? data : item));
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id: string | number) => {
        setProductList(productList.filter(item => item.id !== id));
    };

    if (!currentUserRole) {
        return <div className="p-10 text-center text-xl font-semibold">{t('productTable.loading')}</div>;
    }

    const columns = [
        { title: t('productTable.id'), dataIndex: 'id', key: 'id' },
        { title: t('productTable.categoryID'), dataIndex: 'categoryID', key: 'categoryID' },
        { title: t('productTable.name'), dataIndex: 'name', key: 'name' },
        { title: t('productTable.price'), dataIndex: 'price', key: 'price' },

        ...(currentUserRole === 'ADMIN' ? [
            {
                title: t('productTable.action'),
                key: 'action',
                render: (_: any, record: Product) => (
                    <div className="flex gap-2">
                        <button className="btn btn-sm btn-warning" onClick={() => handleOpenEdit(record)}>
                            {t('productTable.edit')}
                        </button>

                        <Popconfirm
                            title={t('productTable.deleteTitle')}
                            description={t('productTable.deleteDesc')}
                            onConfirm={() => handleDelete(record.id)}
                            okText={t('productTable.yes')}
                            cancelText={t('productTable.no')}
                            placement="topRight"
                        >
                            <button className="btn btn-sm btn-error text-white">
                                {t('productTable.delete')}
                            </button>
                        </Popconfirm>
                    </div>
                ),
            }
        ] : []),
    ];

    return (
        <div>
            <DataTable
                title={t('productTable.title')}
                data={productList}
                columns={columns}
                onAdd={handleOpenAdd}
                role={currentUserRole}
            />

            <GenericModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={modalMode === "add" ? t('productTable.addProduct') : t('productTable.editProduct')}
            >
                <ProductForm
                    mode={modalMode}
                    initialData={editingProduct}
                    onSave={handleSave}
                />
            </GenericModal>
        </div>
    );
}