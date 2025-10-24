import { TableListUser } from "@/components/tables/user";
import { user } from "@/core/actions/user"
import { User } from "@/core/schemas/user";

export default async function UsersPage() {
    const result = await user.findMany();

    let users: User[] = [];
    if (result.success) {
        result.data.forEach(item => users.push(item))
    }

    return <TableListUser data={users} />
}