import Book from "models/book";
import { connectToDB } from "utils/database";

// api to create new book
export const POST = async (request) => {
    const { userId, title, desc, src, price, offer } = await request.json();

    try {
        await connectToDB();
        const newBook = new Book({ owner: userId, title, desc, src, price, offer });

        await newBook.save();
        return new Response(JSON.stringify(newBook), { status: 201 })
    } catch (error) {
        console.log(error);
        return new Response("Failed to create a new Book", { status: 500 });
    }
}