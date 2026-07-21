
import { SidebarMenu } from "@/types/sidebarMenus";
import {
    HomeIcon,
    BellIcon,
    ArchiveBoxIcon,
    UserGroupIcon,
    UserIcon,
}
    from "@heroicons/react/24/outline";

export const menus: SidebarMenu[] = [
    {
        title: "dashboard",
        href: "/admin/dashboard",
        role: "ADMIN",
        icon: HomeIcon,
    },
    {
        title: "staffManagement",
        href: "/admin/staffs",
        role: "ADMIN",
        icon: UserGroupIcon
    },
    {
        title: "productManagement",
        href: "/admin/products",
        role: "ADMIN",
        icon: ArchiveBoxIcon
    },
    {
        title: "customerManagement",
        href: "/admin/customers",
        role: "ADMIN",
        icon: UserIcon,
    },
    {
        title: "dashboard",
        href: "/staff/dashboard",
        role: "STAFF",
        icon: HomeIcon,
    },
    {
        title: "productList",
        href: "/staff/products",
        role: "STAFF",
        icon: ArchiveBoxIcon
    },
    {
        title: "customerManagement",
        href: "/staff/customers",
        role: "STAFF",
        icon: UserIcon,
    },
]