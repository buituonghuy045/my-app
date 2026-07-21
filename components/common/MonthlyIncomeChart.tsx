/* eslint-disable prefer-const */
'use client';

import { useMemo } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
    ChartData
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useCustomerData } from "@/app/hooks/use-customerData";
import { useTranslation } from 'react-i18next';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
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

export default function MonthlyIncomeChart() {
    const { t } = useTranslation();
    const { data, isPending, isError } = useCustomerData();

    const chartData = useMemo<ChartData<'line'> | null>(() => {
        const rawData = (Array.isArray(data) ? data : (data?.data || [])) as CustomerApiItem[];
        if (rawData.length === 0) return null;

        // Object để cộng dồn tiền theo tháng (Ví dụ: { "2025-10": 1251.69 })
        const aggregatedData: Record<string, number> = {};

        rawData.forEach(item => {
            if (!item.date) return;

            // chuyển đổi chuỗi ISO "2025-10-10T..." thành Date chuẩn
            const itemDate = new Date(item.date);
            if (isNaN(itemDate.getTime())) return;

            // Lấy Năm và Tháng để làm key gom nhóm
            const year = itemDate.getFullYear();
            // padStart(2, '0') đảm bảo tháng luôn có 2 chữ số (VD: "07", "10")
            const month = String(itemDate.getMonth() + 1).padStart(2, '0');
            const monthYearKey = `${year}-${month}`;

            // Chuyển đổi chuỗi spending thành số thực (Float)
            const spendingNumber = parseFloat(item.spending) || 0;

            // Cộng dồn dữ liệu vào tháng tương ứng
            if (!aggregatedData[monthYearKey]) {
                aggregatedData[monthYearKey] = 0;
            }
            aggregatedData[monthYearKey] += spendingNumber;
        });

        // Sắp xếp các tháng theo thứ tự thời gian
        const sortedMonths = Object.keys(aggregatedData).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

        return {
            labels: sortedMonths.map(monthKey => {
                // Tách "2025-10" ra để format nhãn hiển thị cho đẹp (VD: "Thg 10, 2025")
                const [yyyy, mm] = monthKey.split('-');
                const d = new Date(Number(yyyy), Number(mm) - 1);
                return d.toLocaleDateString('vi-VN', { month: 'short', year: 'numeric' });
            }),
            datasets: [
                {
                    label: t('customerChart.lable'),
                    data: sortedMonths.map(monthKey => aggregatedData[monthKey]),
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    tension: 0.3, // Làm đường nối mềm mại hơn một chút
                    pointRadius: 5,
                    pointHoverRadius: 7,
                },
            ],
        };
    }, [data]);

    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' },
            title: {
                display: true,
                text: t('customerChart.title2'),
                font: { size: 18, weight: 'bold' }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let value = context.raw as number;
                        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
                    }
                }
            }
        },
        scales: {
            y: {
                title: { display: true, text: t('customerChart.y2'), font: { weight: 'bold' } },
                beginAtZero: true
            },
            x: {
                title: { display: true, text: t('customerChart.x2'), font: { weight: 'bold' } }
            }
        }
    };

    if (isPending) return <div className="h-64 flex items-center justify-center font-medium">Đang tải dữ liệu biểu đồ...</div>;
    if (isError) return <div className="h-64 flex items-center justify-center text-red-500 font-medium">Lỗi tải dữ liệu</div>;
    if (!chartData) return <div className="h-64 flex items-center justify-center text-gray-500 font-medium">Chưa có dữ liệu để hiển thị</div>;

    return (
        <div className="max-w-4xl w-xl mx-auto h-100 p-6 bg-white rounded-xl shadow-md border border-gray-100">
            <Line options={options} data={chartData} />
        </div>
    );
}