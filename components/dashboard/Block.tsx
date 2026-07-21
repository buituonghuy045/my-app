import { useTranslation } from "react-i18next";
import { staffs } from "@/data/staffs";
import { products } from "@/data/products";
import { useDataList } from "@/app/hooks/use-dataList";
export default function Block() {
    const { t } = useTranslation();
    const { data, isPending, isError, error } = useDataList();
    if (isPending) return <p>{t('customerTable.loading')}</p>
    if (isError) return <p>{t('customerTable.error')} : {error.message}</p>
    return (
        <div className="grid grid-cols-4 gap-6 mx-15 mt-10">

            <div className="grid grid-cols-3 bg-[#ea1e63] rounded">
                <div className="col-span-1 bg-[#d11350] p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-22 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                    </svg>
                </div>
                <div className="col-span-2 flex flex-col gap-2 p-2">
                    <p className="text-bold text-3xl text-white m-0">{t("staff")}</p>
                    <p className="text-bold text-4xl text-white m-0">{staffs.length}</p>
                </div>
            </div>
            <div className="grid grid-cols-3 bg-[#00bcd7] rounded">
                <div className="col-span-1 bg-[#00a5bb] p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-22 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                    </svg>

                </div>
                <div className="col-span-2 flex flex-col gap-2 p-2">
                    <p className="text-bold text-3xl text-white m-0">{t("products")}</p>
                    <p className="text-bold text-4xl text-white m-0">{products.length}</p>
                </div>
            </div>
            <div className="grid grid-cols-3 bg-[#8dc64a] rounded">
                <div className="col-span-1 bg-[#7bad41] p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-22 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                    </svg>

                </div>
                <div className="col-span-2 flex flex-col gap-2 p-2">
                    <p className="text-bold text-3xl text-white m-0">{t("customers")}</p>
                    <p className="text-bold text-4xl text-white m-0">{data.length}</p>
                </div>
            </div>
            <div className="grid grid-cols-3 bg-[#fc9401] rounded">
                <div className="col-span-1 bg-[#e58601] p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-22 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                </div>
                <div className="col-span-2 flex flex-col gap-2 p-2">
                    <p className="text-bold text-3xl text-white m-0">{t("profits")}</p>
                    <p className="text-bold text-4xl text-white m-0">10</p>
                </div>
            </div>
        </div>
    )
}
