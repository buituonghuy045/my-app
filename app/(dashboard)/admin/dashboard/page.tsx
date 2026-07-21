'use client';
import { useCustomerData } from "@/app/hooks/use-customerData";
import GenderCustomerChart from "@/components/common/GenderCustomerChart";
import Block from "@/components/dashboard/Block";
import { useTranslation } from "react-i18next";
import MonthlyIncomeChart from "@/components/common/MonthlyIncomeChart";

export default function AdminPage() {
    const { data, isPending, isError, error } = useCustomerData();
    const { t } = useTranslation();
    if (isPending) {
        return (
            <div className="p-4 text-center text-gray-500">
                <p>{t('customerTable.loading')}</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-4 text-center text-red-500">
                <p>{t('customerTable.error')} : {error?.message}</p>
            </div>
        );
    }

    return (
        <div>
            <Block />
            <div className='flex items-baseline-last gap-2 mt-10'>
                <MonthlyIncomeChart />
                <GenderCustomerChart />
            </div>

        </div>
    );
}