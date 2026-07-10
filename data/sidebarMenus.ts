
import { SidebarMenu } from "@/types/sidebarMenus";
import {
    HomeIcon,
    BellIcon,
    MagnifyingGlassIcon,
}
    from "@heroicons/react/24/outline";

export const menus: SidebarMenu[] = [
    {
        id: 1,
        title: "search",
        href: "/admin/search",
        role: "ADMIN",
        icon: MagnifyingGlassIcon,
    },
    {
        id: 2,
        title: "dashboard",
        href: "/admin/dashboard",
        role: "ADMIN",
        icon: HomeIcon,
    },
    {
        id: 3,
        title: "notification",
        href: "/admin/notification",
        role: "ADMIN",
        icon: BellIcon,
    },
    {
        id: 4,
        title: "search",
        href: "/staff/search",
        role: "STAFF",
        icon: MagnifyingGlassIcon,
    },
    {
        id: 5,
        title: "dashboard",
        href: "/staff/dashboard",
        role: "STAFF",
        icon: HomeIcon,
    },
    {
        id: 6,
        title: "notification",
        href: "/staff/notification",
        role: "STAFF",
        icon: BellIcon,
    },
]