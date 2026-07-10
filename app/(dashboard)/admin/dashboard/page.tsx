'use client';

import Table from "@/components/common/Table";
import Block from "@/components/dashboard/Block";
import { staffs } from "@/data/staffs";

export default function AdminPage() {

    const staffColumns = [
        {
            header: "ID",
            accessor: "id",
        },
        {
            header: "staffs",
            accessor: "name",
        },
        {
            header: "role",
            accessor: "role",
        },
        {
            header: "Email",
            accessor: "email",
        },
    ];

    return (
        <div>
            <Block />
            <Table
                data={staffs}
                columns={staffColumns}
                title={"staffManagement"}
            />
        </div>
    );
}