import Book from "models/book";
import { connectToDB } from "utils/database";

// api to get book by id
export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const book = await Book.findById(params.id).populate("owner")
        if (!book) return new Response("Book Not Found", { status: 404 });

        return new Response(JSON.stringify(book), { status: 200 })
    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

// api to update existing book by ID
export const PATCH = async (request, { params }) => {
    const { title, desc, src, price, offer } = await request.json();

    try {
        await connectToDB();

        // Find the existing book by ID
        const existingBook = await Book.findById(params.id)
        if(!existingBook) return new Response("Book not found", { status: 404 });

        // Update the book with new data
        existingBook.title = title;
        existingBook.desc = desc;
        existingBook.src = src;
        existingBook.price = price;
        existingBook.offer = offer;
        await existingBook.save();

        return new Response("Successfully updated Book", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Book", { status: 500 })
    }
}

// api to delete existing book by ID
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the Book by ID and remove it
        await Book.findByIdAndRemove(params.id);

        return new Response("Book deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting book", { status: 500 });
    }
};