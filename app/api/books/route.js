import Book from "@models/book";
import { connectToDB } from "utils/database";

export const GET = async (request) => {
    try {
        await connectToDB()

        const prompts = await Book.find({}).populate('owner').sort({ "_id": -1 }).limit(15)

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 