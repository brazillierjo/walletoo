import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import IncomeModel from "@/core/mongoDB/models/incomes.model";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        const session = await getSession({ req });

        if (!session?.user?.email) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const userEmail = session.user.email;

        const incomes = await IncomeModel.find({ userId: userEmail });

        return res.status(200).json(incomes);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
