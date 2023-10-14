import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { connectToDB } from "./database";
import User from "@models/user";

const checkUser = async () => {
    const { getUser } = getKindeServerSession();
    const user = getUser();

    if (user){
        // console.log(user);
        try {
            await connectToDB();
            // check if user exists
            const userExists = await User.findOne({
                _id: user.id
            })
            //create new user
            if (!userExists) {
                await User.create({
                    _id: user.id,
                    email: user.email,
                    given_name: user.given_name,
                    family_name: user.family_name,
                    picture: user.picture,
                });
            }

            return true;
        } catch (error) {
            console.log("Error checking if user exists: ", error.message);
            return false;
        }
    }
}

export default checkUser;
