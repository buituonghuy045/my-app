import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarMenu } from "@/types/sidebarMenus";
import { useTranslation } from "react-i18next";
type LinkProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    menuList: SidebarMenu[];
}
export default function LinkItem({ menuList }: LinkProps) {
    const pathname = usePathname();
    const { t } = useTranslation();

    return (
        <>
            {menuList.map((menu) => {
                const Icon = menu.icon;
                return (
                    <Link
                        key={menu.id}
                        href={menu.href}
                        className={`
                                sidebar-items
                                flex
                                items-center
                                gap-4
                                rounded-lg
                                px-3
                                py-3
                                transition-all
                                ${pathname === menu.href
                                ? "bg-base-200 text-base-content"
                                : "text-base-content hover:bg-base-200"
                            }
    `}
                    >
                        <Icon className="size-6" />
                        {t(menu.title)}
                    </Link>
                );
            })}
        </>
    );
}
