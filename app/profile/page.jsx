import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Profile } from "@components";

export default function ProfilePage() {
    const { getUser } = getKindeServerSession();
    const user = getUser();

    return <Profile user={user} />
}