'use client'
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Staff } from "@/types/staffs";
import { useTranslation } from "react-i18next";

type StaffFormProps = {
    mode: "add" | "edit";
    initialData?: Staff | null;
    onSave: (data: Staff) => void;
    onCancel?: () => void;
};

type StaffFormData = {
    id: number | string;
    name: string;
    role: string;
    email: string;
    avatar: string;
};

export default function StaffForm({ mode, initialData, onSave }: StaffFormProps) {
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<StaffFormData>({
        defaultValues: { id: "", name: "", role: "", email: "", avatar: "" }
    });

    useEffect(() => {
        if (mode === "edit" && initialData) {
            reset(initialData);
        } else {
            reset({ id: "", name: "", role: "", email: "", avatar: "" });
        }
    }, [mode, initialData, reset]);

    const onSubmit = (data: StaffFormData) => {
        const staffData: Staff = {
            ...data,
            id: Number(data.id), // Ép kiểu ID về number như ban đầu
        };
        onSave(staffData);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="py-5 text-base-content">
            <div className="flex flex-col gap-8 w-xl">
                {/* Khối Avatar */}
                <label htmlFor="staffImg" className="grid grid-cols-12 items-center">
                    <span className="col-span-3">{t("staffTable.avatar")}:</span>
                    <input
                        type="file"
                        id="staffImg"
                        className="col-span-9 border-2 border-base-300 p-2 w-full"
                        accept="image/*"
                        {...register("avatar", {
                            required: mode === 'add' ? "Image is required" : false,
                        })}
                    />
                </label>
                {errors.avatar && (
                    <p className="text-error text-sm col-span-9 col-start-4 -mt-6">
                        {errors.avatar.message}
                    </p>
                )}

                {/* Khối Name */}
                <label htmlFor="staffName" className="grid grid-cols-12 items-center">
                    <span className="col-span-3">{t("staffTable.name")}:</span>
                    <input
                        type="text"
                        id="staffName"
                        className="col-span-9 border-2 border-base-300 p-2 w-full"
                        {...register("name", { required: "Name is required" })}
                    />
                </label>
                {errors.name && (
                    <p className="text-error text-sm col-span-9 col-start-4 -mt-6">
                        {errors.name.message}
                    </p>
                )}

                {/* Khối Role */}
                <label htmlFor="staffRole" className="grid grid-cols-12 items-center">
                    <span className="col-span-3">{t("staffTable.role")}:</span>
                    <select
                        id="staffRole"
                        className="col-span-9 border-2 border-base-300 p-2 w-full bg-base-100 text-base-content"
                        {...register("role", { required: "Role is required" })}
                    >
                        <option value="" className="bg-base-100 text-base-content">-- Select Role --</option>
                        <option value="ADMIN" className="bg-base-100 text-base-content">ADMIN</option>
                        <option value="STAFF" className="bg-base-100 text-base-content">STAFF</option>
                    </select>
                </label>
                {errors.role && (
                    <p className="text-error text-sm col-span-9 col-start-4 -mt-6">
                        {errors.role.message}
                    </p>
                )}

                {/* Khối Email */}
                <label htmlFor="staffEmail" className="grid grid-cols-12 items-center">
                    <span className="col-span-3">{t("staffTable.email")}:</span>
                    <input
                        type="email"
                        id="staffEmail"
                        className="col-span-9 border-2 border-base-300 p-2 w-full"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            }
                        })}
                    />
                </label>
                {errors.email && (
                    <p className="text-error text-sm col-span-9 col-start-4 -mt-6">
                        {errors.email.message}
                    </p>
                )}

                {/* Nút Submit */}
                <div className="text-center mt-4">
                    <button type="submit" className="btn btn-info w-64">
                        {mode === "add" ? "Thêm Nhân Viên" : "Lưu Thay Đổi"}
                    </button>
                </div>

            </div>
        </form>
    );
}