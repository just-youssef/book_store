import Dashboard from "models/dashboard";
import { connectToDB } from "utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const dashboard = await Dashboard.findOne({user: params.id}).populate("user")
        if (!dashboard) return new Response(JSON.stringify("Dashboard Not Found"), { status: 404 });

        return new Response(JSON.stringify(dashboard), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const POST = async (request) => {
    const { userId, balance, book_selling, top_selling } = await request.json();

    try {
        await connectToDB();
        const newDashboard = new Dashboard({ user: userId, balance, book_selling, top_selling });

        await newDashboard.save();
        return new Response(JSON.stringify(newDashboard), { status: 201 })
    } catch (error) {
        console.log(error);
        return new Response("Failed to create a new Dashboard", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const { balance, book_selling, top_selling } = await request.json();

    try {
        await connectToDB();

        // Find the existing dashboard by user ID
        const existingDashboard = await await Dashboard.findOne({user: params.id})
        if(!existingDashboard) return new Response("Dashboard not found", { status: 404 });

        // Update the book with new data
        existingDashboard.balance = balance;
        existingDashboard.book_selling = book_selling;
        existingDashboard.top_selling = top_selling;
        await existingDashboard.save();

        return new Response("Successfully updated dashboard", { status: 200 });
    } catch (error) {
        return new Response("Error Updating dashboard", { status: 500 })
    }
}

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the Dashboard by ID and remove it
        await Dashboard.findOneAndRemove({user: params.id});

        return new Response("Dashboard deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting Dashboard", { status: 500 });
    }
};