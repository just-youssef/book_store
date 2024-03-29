import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Navbar from "./Navbar";

export default function NavbarExtended() {
    const { getUser } = getKindeServerSession();
    const user = getUser();
    // console.log(user);

    return <Navbar user={user} />
}