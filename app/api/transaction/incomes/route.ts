import { getServerSession } from "next-auth";
import { authOptions } from "@/src/utils/authOptions";
import UserModel from "@/src/mongoDB/userSchema";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        const user = await UserModel.findOne({ email: session?.user?.email });

        const { label, amount, category } = JSON.parse(JSON.stringify(req.body));

        const newIncome = {
            label,
            amount,
            category,
        };

        user.incomes.push(newIncome);
        await user.save();

        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        console.error(error);
        throw new Error("Internal Server Error");
    }
}
