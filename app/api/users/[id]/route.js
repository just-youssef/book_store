import User from "models/user";
import { connectToDB } from "utils/database";

// api to get the details of certain user by id
export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const user = await User.findById(params.id)
        if (!user) return new Response(JSON.stringify("User Not Found"), { status: 404 });

        return new Response(JSON.stringify(user), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}