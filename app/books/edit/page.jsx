import { EditBook } from "@components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default function EditBookPage() {
    const { getUser } = getKindeServerSession();
    const user = getUser();

    return <EditBook user={user} />
  }