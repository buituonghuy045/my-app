/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const API_URL = "https://6a583b0d914a025dcff3b5ce.mockapi.io/api/customerdata/customers";
export function useCustomerData() {
    return useQuery({
        queryKey: ["customers"],
        queryFn: async () => {
            const res = await fetch(API_URL, {
                cache: "no-store"
            });

            if (!res.ok) throw new Error("Lỗi mạng khi tải dữ liệu");
            return res.json();
        }
    });
}

export function useCustomerMutations() {
    const queryClient = useQueryClient();

    // A. Thêm mới (POST)
    const addCustomer = useMutation({
        mutationFn: async (newCustomer: any) => {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCustomer)
            });
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["customers"] });
        }
    });

    // B. Sửa (PUT)
    const updateCustomer = useMutation({
        mutationFn: async (updatedCustomer: any) => {
            const res = await fetch(`${API_URL}/${updatedCustomer.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedCustomer)
            });
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["customers"] });
        }
    });

    // C. Xóa (DELETE)
    const deleteCustomer = useMutation({
        mutationFn: async (id: string | number) => {
            const res = await fetch(`${"https://6a583b0d914a025dcff3b5ce.mockapi.io/api/customerdata/customers"}/${id}`, {
                method: 'DELETE'
            });
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["customers"] });
        }
    });

    return { addCustomer, updateCustomer, deleteCustomer };
}