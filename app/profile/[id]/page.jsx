import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ProfileId } from "@components";

export default function ProfileIdPage({params}) {
    const { getUser } = getKindeServerSession();
    const user = getUser();

    return <ProfileId currentUser={user} profileUserId={params.id} />
}