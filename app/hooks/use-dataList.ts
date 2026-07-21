import { useQuery } from "@tanstack/react-query";

export function useDataList() {
    return useQuery({
        queryKey: ["smartCars"],
        queryFn: async () => {
            const res = await fetch("https://jsonplaceholder.typicode.com/users");

            if (!res.ok) {
                throw new Error(`Đã có lỗi xảy ra: ${res.status}`);
            }
            return res.json();
        }
    });
}