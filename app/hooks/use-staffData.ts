import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Staff } from "@/types/staffs";

const API_URL = "https://6a583b0d914a025dcff3b5ce.mockapi.io/api/customerdata/staffs";

export function useStaffData() {
    return useQuery({
        queryKey: ["staffs"],
        queryFn: async () => {
            const res = await fetch(API_URL, { cache: "no-store" });
            if (!res.ok) throw new Error("Lỗi mạng khi tải dữ liệu");
            return res.json();
        }
    });
}

export function useStaffMutations() {
    const queryClient = useQueryClient();

    // A. Thêm mới (POST)
    const addStaff = useMutation({
        // Dùng Omit để loại bỏ 'id' vì khi tạo mới thường server sẽ tự gen ID
        mutationFn: async (newStaff: Omit<Staff, 'id'>) => {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newStaff)
            });
            if (!res.ok) throw new Error("Không thể thêm nhân viên");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["staffs"] });
        }
    });

    // B. Sửa (PUT)
    const updateStaff = useMutation({
        mutationFn: async (updatedStaff: Staff) => {
            const res = await fetch(`${API_URL}/${updatedStaff.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedStaff)
            });
            if (!res.ok) throw new Error("Không thể cập nhật nhân viên");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["staffs"] });
        }
    });

    // C. Xóa (DELETE)
    const deleteStaff = useMutation({
        mutationFn: async (id: string | number) => {
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            if (!res.ok) throw new Error("Không thể xóa nhân viên");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["staffs"] });
        }
    });

    return { addStaff, updateStaff, deleteStaff };
}