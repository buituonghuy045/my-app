/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

type CustomerFormProps = {
    mode: "add" | "edit";
    initialData?: any;
    onSave: (data: any) => void;
};

type CustomerFormData = {
    id: string;
    full_name: string;
    email: string;
    gender: string;
    spending: number | string;
    date: string;
};

export default function CustomerForm({ mode, initialData, onSave }: CustomerFormProps) {
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CustomerFormData>({
        defaultValues: { id: "", full_name: "", email: "", gender: "Male", spending: 0, date: new Date().toISOString().split('T')[0] }
    });

    useEffect(() => {
        if (mode === "edit" && initialData) {
            reset(initialData);
        } else {
            reset({ id: "", full_name: "", email: "", gender: "Male", spending: 0, date: new Date().toISOString().split('T')[0] });
        }
    }, [mode, initialData, reset]);

    const onSubmit = (data: CustomerFormData) => {
        const payload = {
            ...data,
            spending: Number(data.spending),
        };
        onSave(payload);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="py-5 text-base-content">
            <div className="flex flex-col gap-8 w-xl">

                {/* Khối Họ và Tên */}
                <label htmlFor="customerName" className="grid grid-cols-12 items-center">
                    <span className="col-span-3">{t('customerTable.full_name', 'Họ Tên')}:</span>
                    <input
                        type="text"
                        id="customerName"
                        className="col-span-9 border-2 border-base-300 p-2 w-full"
                        {...register("full_name", { required: "Vui lòng nhập họ và tên" })}
                    />
                </label>
                {errors.full_name && (
                    <p className="text-error text-sm col-span-9 col-start-4 -mt-6">
                        {errors.full_name.message}
                    </p>
                )}

                {/* Khối Email */}
                <label htmlFor="customerEmail" className="grid grid-cols-12 items-center">
                    <span className="col-span-3">{t('customerTable.email', 'Email')}:</span>
                    <input
                        type="email"
                        id="customerEmail"
                        className="col-span-9 border-2 border-base-300 p-2 w-full"
                        {...register("email", {
                            required: "Vui lòng nhập email",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Email không hợp lệ"
                            }
                        })}
                    />
                </label>
                {errors.email && (
                    <p className="text-error text-sm col-span-9 col-start-4 -mt-6">
                        {errors.email.message}
                    </p>
                )}

                {/* Khối Giới tính */}
                <label htmlFor="customerGender" className="grid grid-cols-12 items-center">
                    <span className="col-span-3">{t('customerTable.gender', 'Giới tính')}:</span>
                    <select
                        id="customerGender"
                        className="col-span-9 border-2 border-base-300 p-2 w-full bg-base-100 text-base-content"
                        {...register("gender")}
                    >
                        <option value={t('male')} className="bg-base-100 text-base-content">{t('customerTable.male')}</option>
                        <option value={t('female')} className="bg-base-100 text-base-content">{t('customerTable.female')}</option>
                    </select>
                </label>

                {/* Khối Chi Tiêu (Bị khóa hoàn toàn) */}
                <label htmlFor="customerSpending" className="grid grid-cols-12 items-center">
                    <span className="col-span-3 text-gray-500">{t('customerTable.spending', 'Chi tiêu ($)')}:</span>
                    <input
                        type="number"
                        id="customerSpending"
                        className="col-span-9 border-2 border-base-300 p-2 w-full bg-base-200 text-gray-500 cursor-not-allowed"
                        disabled
                        {...register("spending")}
                    />
                </label>

                {/* Khối Ngày Tham Gia (Khóa khi ở chế độ Sửa) */}
                <label htmlFor="customerDate" className="grid grid-cols-12 items-center">
                    <span className={`col-span-3 ${mode === 'edit' ? 'text-gray-500' : ''}`}>
                        {t('customerTable.date', 'Ngày đăng ký')}:
                    </span>
                    <input
                        type="date"
                        id="customerDate"
                        className={`col-span-9 border-2 border-base-300 p-2 w-full ${mode === 'edit' ? 'bg-base-200 text-gray-500 cursor-not-allowed' : ''}`}
                        disabled={mode === 'edit'}
                    />
                </label>
                {errors.date && (
                    <p className="text-error text-sm col-span-9 col-start-4 -mt-6">
                        {errors.date.message}
                    </p>
                )}

                {/* Nút Submit */}
                <div className="text-center mt-4">
                    <button type="submit" className="btn btn-info w-64">
                        {mode === "add" ? "Thêm Khách Hàng" : "Lưu Thay Đổi"}
                    </button>
                </div>

            </div>
        </form>
    );
}