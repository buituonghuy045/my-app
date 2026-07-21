/* eslint-disable prefer-const */
import { useMemo } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
    ChartData
}
    from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useCustomerData } from "@/app/hooks/use-customerData";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface CustomerApiItem {
    id: string;
    date: string;
    full_name: string;
    email: string;
    gender: string;
    spending: string;
}

export default function TopCustomerChart() {
    const { data, isPending, isError } = useCustomerData();

    const chartData = useMemo<ChartData<'bar'> | null>(() => {
        const rawData = (Array.isArray(data) ? data : (data?.data || [])) as CustomerApiItem[];
        if (rawData.length === 0) return null;

        // Chuyển spending từ string sang number
        const cleanData = rawData.map(item => ({
            name: item.full_name || 'Khách vô danh',
            spendingNumber: parseFloat(item.spending) || 0
        }));

        //Sắp xếp giảm dần theo số tiền chi tiêu
        cleanData.sort((a, b) => b.spendingNumber - a.spendingNumber);

        //lấy Top 5 khách hàng chi tiêu cao nhất
        const top5 = cleanData.slice(0, 5);

        // Đảo ngược mảng
        const displayData = top5.reverse();

        return {
            // Trục Y sẽ hiển thị Tên khách hàng
            labels: displayData.map(item => item.name),
            datasets: [
                {
                    label: 'Tổng chi tiêu (USD)',
                    // Trục X sẽ hiển thị Số tiền tương ứng
                    data: displayData.map(item => item.spendingNumber),
                    backgroundColor: 'rgba(75, 192, 192, 0.7)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    borderRadius: 6,
                }
            ]
        };
    }, [data]);

    const options: ChartOptions<'bar'> = {
        // CỘT NGANG
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false //Ẩn ghi chú
            },
            title: {
                display: true,
                text: 'Top 5 Khách Hàng Chi Tiêu Nhiều Nhất',
                font: { size: 18, weight: 'bold' }
            },
            tooltip: {
                callbacks: {
                    // Định dạng số tiền khi di chuột vào cột
                    label: function (context) {
                        let value = context.raw as number;
                        return ` Chi tiêu: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)}`;
                    }
                }
            }
        },
        scales: {
            x: {
                title: { display: true, text: 'Tổng chi tiêu (USD)', font: { weight: 'bold' } },
                beginAtZero: true
            },
            y: {
                title: { display: true, text: 'Tên Khách Hàng', font: { weight: 'bold' } }
            }
        }
    };

    if (isPending) return <div className="h-64 flex items-center justify-center font-medium">Đang tải dữ liệu...</div>;
    if (isError) return <div className="h-64 flex items-center justify-center text-red-500 font-medium">Lỗi tải dữ liệu</div>;
    if (!chartData) return <div className="h-64 flex items-center justify-center text-gray-500 font-medium">Không có dữ liệu</div>;

    return (
        <div className="w-full mx-auto h-100 p-6 bg-white rounded-xl shadow-md border border-gray-100">
            <Bar options={options} data={chartData} />
        </div>
    );
}
