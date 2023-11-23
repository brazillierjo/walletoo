import UserModel from "@/src/mongoDB/userSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/utils/authOptions";
import { NextRequest } from "next/server";
import { DynamicUrlParams } from "@/src/enums/dynamicUrlParams";

export async function POST(req: NextRequest, config: { params: { type: string } }) {
    try {
        const session = await getServerSession(authOptions);
        const user = await UserModel.findOne({ email: session?.user?.email });
        const { type } = config.params;

        if (!user) {
            return new Response(JSON.stringify({ message: "User not found" }), {
                status: 404,
            });
        }

        if (type !== DynamicUrlParams.INCOMES && type !== DynamicUrlParams.EXPENSES) {
            return new Response(JSON.stringify({ message: "Invalid type" }), {
                status: 400,
            });
        }

        const { label, amount } = await req.json();
        const nexTransaction = { label, amount };

        if (type === DynamicUrlParams.INCOMES) user.incomes.push(nexTransaction);
        if (type === DynamicUrlParams.EXPENSES) user.expenses.push(nexTransaction);

        await user.save();

        return new Response(JSON.stringify({ message: "Transaction added.", status: 200 }));
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), {
            status: 500,
        });
    }
}
