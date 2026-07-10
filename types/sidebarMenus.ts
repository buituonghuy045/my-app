import { ComponentType, SVGProps } from "react";

export interface SidebarMenu {
    id: number;
    title: string;
    href: string;
    role: "ADMIN" | "STAFF";
    icon: ComponentType<SVGProps<SVGSVGElement>>
}