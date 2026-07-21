'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                // 1. staleTime: Thời gian dữ liệu được coi là "còn tươi"
                // Mặc định là 0. Chỉnh thành 1 phút (60 * 1000ms).
                // Trong 1 phút này, dù người dùng có qua tab khác rồi quay lại, 
                // hoặc chuyển trang, React Query sẽ dùng cache mà không gọi lại API.
                staleTime: 60 * 1000,

                // 2. gcTime (trước đây là cacheTime): Thời gian lưu cache trên bộ nhớ
                // Mặc định là 5 phút. Sau 5 phút không ai đụng tới, data sẽ bị xóa khỏi RAM.
                gcTime: 5 * 60 * 1000,

                // 3. Tự động fetch lại khi người dùng quay lại tab trình duyệt
                // Rất hữu ích cho Admin. Nó chỉ gọi API nếu data đã "hết tươi" (vượt quá staleTime).
                refetchOnWindowFocus: true,

                // 4. Giới hạn số lần thử gọi lại khi API lỗi
                // Mặc định nó thử 3 lần. Đặt 1 hoặc 2 để UI báo lỗi nhanh hơn, tránh treo máy.
                retry: 1,
            },
        },
    }))


    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}