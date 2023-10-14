import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import AddBook from "@components/AddBook";

export default function AddBookPage() {
    const { getUser } = getKindeServerSession();
    const user = getUser();

    return <AddBook user={user} />
  }