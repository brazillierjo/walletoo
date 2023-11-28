import { NextRequest } from "next/server";
import { DynamicUrlParams } from "@/src/enums/dynamicUrlParams";
import { sessionCheck } from "@/src/utils/sessionCheck";
import { requestCheck } from "@/src/utils/requestCheck";
import { ITransaction } from "@/src/interfaces/transactionInterface";

export async function POST(req: NextRequest, config: { params: { type: string } }) {
    try {
        const user = await sessionCheck();
        const { type } = config.params;
        const { label, amount } = await req.json();
        const newTransaction = { label, amount };

        requestCheck(req, type);

        if (type === DynamicUrlParams.INCOMES) {
            user.incomes.push(newTransaction);
            await user.save();
            return new Response(JSON.stringify({ data: user.incomes[user.incomes.length - 1], message: "Transaction added.", status: 200 }));
        }

        if (type === DynamicUrlParams.EXPENSES) {
            user.expenses.push(newTransaction);
            await user.save();
            return new Response(JSON.stringify({ data: user.expenses[user.expenses.length - 1], message: "Transaction added.", status: 200 }));
        }

        return new Response(JSON.stringify({ message: "There was an error during the POST request.", status: 500 }));
    } catch (error) {
        console.error(error);

        if (error instanceof Error) {
            return new Response(JSON.stringify({ message: error.message, status: 500 }));
        }

        return new Response(JSON.stringify({ message: "Internal Server Error", status: 500 }));
    }
}

export async function DELETE(req: NextRequest, config: { params: { type: string } }) {
    try {
        const user = await sessionCheck();
        const { type } = config.params;
        const { id: _id } = await req.json();

        requestCheck(req, type);

        if (type === DynamicUrlParams.INCOMES) user.incomes = user.incomes.filter((income: ITransaction) => income._id?.toString() !== _id);
        if (type === DynamicUrlParams.EXPENSES) user.expenses = user.expenses.filter((expense: ITransaction) => expense._id?.toString() !== _id);

        await user.save();

        return new Response(JSON.stringify({ message: "Transaction deleted.", status: 200 }));
    } catch (error) {
        console.error(error);

        if (error instanceof Error) {
            return new Response(JSON.stringify({ message: error.message }), {
                status: 500,
            });
        }

        return new Response(JSON.stringify({ message: "Internal Server Error", status: 500 }));
    }
}
