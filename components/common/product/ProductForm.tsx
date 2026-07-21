'use client'
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Product } from "@/types/products";

type ProductFormProps = {
    mode: "add" | "edit";
    initialData?: Product | null;
    onSave: (data: Product) => void;
};
type ProductFormData = {
    id: string;
    categoryID: string;
    name: string;
    price: number | string;
};

export default function ProductForm({ mode, initialData, onSave }: ProductFormProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProductFormData>({
        defaultValues: { id: "", categoryID: "", name: "", price: "" }
    });

    useEffect(() => {
        if (mode === "edit" && initialData) {
            reset(initialData);
        } else {
            reset({ id: "", categoryID: "", name: "", price: "" });
        }
    }, [mode, initialData, reset]);

    const onSubmit = (data: ProductFormData) => {
        const payload: Product = {
            ...data,
            price: Number(data.price),
        };
        onSave(payload);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="py-5 text-base-content">
            <div className="flex flex-col gap-8 w-xl">

                {/* Khối ID */}
                <label htmlFor="productID" className="grid grid-cols-12 items-center">
                    <span className="col-span-2">ID:</span>
                    <input
                        type="text"
                        id="productID"
                        className="col-span-10 border-2 border-base-300 p-2 w-full"
                        disabled={mode === 'edit'}
                        {...register("id", { required: "ID is required" })}
                    />
                </label>
                {errors.id && (
                    <p className="text-error text-sm col-span-10 col-start-3 -mt-6">
                        {errors.id.message}
                    </p>
                )}

                {/* Khối Name */}
                <label htmlFor="productName" className="grid grid-cols-12 items-center ">
                    <span className="col-span-2">Name:</span>
                    <input
                        type="text"
                        id="productName"
                        className="col-span-10 border-2 border-base-300 p-2 w-full"
                        {...register("name", { required: "Name is required" })}
                    />
                </label>
                {errors.name && (
                    <p className="text-error text-sm col-span-10 col-start-3 -mt-6">
                        {errors.name.message}
                    </p>
                )}

                {/* Khối Category */}
                <label htmlFor="productCategory" className="grid grid-cols-12 items-center">
                    <span className="col-span-2">Category:</span>
                    <select
                        id="productCategory"
                        className="col-span-10 border-2 border-base-300 p-2 w-full"
                        {...register("categoryID", { required: "Category ID is required" })}
                    >
                        <option value="" className="bg-base-100 text-base-content">-- Select Category --</option>
                        <option value="CAT_MAIN" className="bg-base-100 text-base-content">CAT_MAIN</option>
                        <option value="CAT_DRINK" className="bg-base-100 text-base-content">CAT_DRINK</option>
                        <option value="CAT_DESSERT" className="bg-base-100 text-base-content">CAT_DESSERT</option>
                    </select>
                </label>
                {errors.categoryID && (
                    <p className="text-error text-sm col-span-10 col-start-3 -mt-6">
                        {errors.categoryID.message}
                    </p>
                )}

                {/* Khối Price */}
                <label htmlFor="productPrice" className="grid grid-cols-12 items-center">
                    <span className="col-span-2">Price:</span>
                    <input
                        type="number"
                        id="productPrice"
                        className="col-span-10 border-2 border-base-300 p-2 w-full"
                        {...register("price", {
                            required: "Price is required",
                            valueAsNumber: true
                        })}
                    />
                </label>
                {errors.price && (
                    <p className="text-error text-sm col-span-10 col-start-3 -mt-6">
                        {errors.price.message}
                    </p>
                )}

                <div className="text-center">
                    <button type="submit" className="btn btn-info w-20">
                        {mode === "add" ? "Add" : "Save"}
                    </button>
                </div>

            </div>
        </form>
    );
}