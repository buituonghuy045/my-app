import Table from "@/components/common/Table";
import Block from "@/components/dashboard/Block";
import { staffs } from "@/data/staffs";

const staffColumns = [
    {
        header: "ID",
        accessor: "id",
    },
    {
        header: "Name",
        accessor: "name",
    },
    {
        header: "Role",
        accessor: "role",
    },
    {
        header: "Email",
        accessor: "email",
    },
];

export default function StaffPage() {
    return (
        <div>
            <Block />
            <Table data={staffs}
                columns={staffColumns}
                title="Staff Management"
            />
        </div>


    )
}
