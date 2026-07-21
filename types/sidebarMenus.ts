import { ComponentType, SVGProps } from "react";

export interface SidebarMenu {
    title: string;
    href: string;
    role: "ADMIN" | "STAFF";
    icon: ComponentType<SVGProps<SVGSVGElement>>
}