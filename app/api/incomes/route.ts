import { getServerSession } from "next-auth";
import IncomeModel from "@/core/mongoDB/models/incomes.model";
import { NextResponse } from "next/server";
import connectDB from "@/core/mongoDB/connect";

export async function GET() {
    await connectDB();

    try {
        const session = await getServerSession();

        if (!session?.user?.email) {
            throw new Error("Unauthorized");
        }

        const userEmail = session.user.email;
        const incomes = await IncomeModel.find({ userId: userEmail });

        return NextResponse.json(incomes);
    } catch (error) {
        console.error(error);
        throw new Error("Internal Server Error");
    }
}
