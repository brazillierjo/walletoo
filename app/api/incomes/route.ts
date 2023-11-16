import { getServerSession } from "next-auth";
import IncomeModel from "@/src/mongoDB/models/incomes.model";
import connectDB from "@/src/mongoDB/connect";

export async function GET() {
    await connectDB();

    try {
        const session = await getServerSession();

        if (!session?.user?.email) throw new Error("Unauthorized");

        const userEmail = session.user.email;
        const incomes = await IncomeModel.find({ id: userEmail });

        return new Response(JSON.stringify(incomes), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error(error);
        throw new Error("Internal Server Error");
    }
}
