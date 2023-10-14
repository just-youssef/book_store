import Book from "models/book";
import { connectToDB } from "utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const books = await Book.find({ owner: params.id }).populate('owner').sort({ "_id": -1 })

        return new Response(JSON.stringify(books), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch user books", { status: 500 })
    }
} 