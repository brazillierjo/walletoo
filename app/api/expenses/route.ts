import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import ExpenseModel from "@/src/mongoDB/models/expense.model";
import connectDB from "@/src/mongoDB/connect";

export async function GET() {
    await connectDB();

    try {
        const session = await getServerSession();

        if (!session?.user?.email) throw new Error("Unauthorized");

        const userEmail = session.user.email;
        const expenses = await ExpenseModel.find({ id: userEmail });

        return new Response(JSON.stringify(expenses), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error(error);
        throw new Error("Internal Server Error");
    }
}
