/* eslint-disable prefer-const */
'use client'
import { useCustomerData } from "@/app/hooks/use-customerData";
import { Bar } from "react-chartjs-2";
import { useMemo } from 'react';
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
} from 'chart.js';
import { useTranslation } from "react-i18next";

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

export default function GenderCustomerChart() {
    const { t } = useTranslation();

    const { data, isPending, isError } = useCustomerData();

    const chartData = useMemo<ChartData<'bar'> | null>(() => {
        const rawData = (Array.isArray(data) ? data : (data?.data || [])) as CustomerApiItem[];
        if (rawData.length === 0) return null;

        const genderCount = rawData.reduce<Record<string, number>>((acc, item) => {
            const gender = item.gender || 'Unknown';
            if (!acc[gender]) {
                acc[gender] = 0;
            }
            acc[gender] += 1;
            return acc;
        }, {});

        // Danh sách các giới tính (Trục X)
        const labels = Object.keys(genderCount);
        // Số lượng tương ứng (Trục Y)
        const dataPoints = Object.values(genderCount);

        // Cấu trúc mà Chart.js yêu cầu
        return {
            labels: labels,
            datasets: [
                {
                    label: 'Số lượng khách hàng',
                    data: dataPoints,
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(255, 206, 86, 0.7)',
                        'rgba(75, 192, 192, 0.7)',
                        'rgba(153, 102, 255, 0.7)',
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                    ],
                    borderWidth: 1,
                    borderRadius: 4,
                }
            ]
        };
    }, [data]);

    const options: ChartOptions<'bar'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                // Biểu đồ cột phân loại này thường không cần legend vì tên đã nằm ở trục X
                display: false
            },
            title: {
                display: true,
                text: t('customerChart.title1'),
                font: { size: 16 }
            },
            tooltip: {
                //  hover vào cột xem được số chính xác
                enabled: true
            }
        },
        scales: {
            y: {
                title: { display: true, text: t('customerChart.x1') },
                beginAtZero: true,
                // trục Y chỉ hiển thị số nguyên
                ticks: {
                    stepSize: 1
                }
            },
            x: {
                title: { display: true, text: t('customerTable.gender') }
            }
        }
    };


    if (isPending) return <div className="h-64 flex items-center justify-center">Đang tải biểu đồ...</div>;
    if (isError) return <div className="h-64 flex items-center justify-center text-red-500">Lỗi tải dữ liệu biểu đồ</div>;
    if (!chartData) return <div className="h-64 flex items-center justify-center text-gray-500">Không có dữ liệu hợp lệ để vẽ biểu đồ</div>;
    return (
        <div className="max-w-4xl w-xl mx-auto h-100 bg-white rounded-xl shadow-md">
            <Bar options={options} data={chartData} />
        </div>
    )
}
