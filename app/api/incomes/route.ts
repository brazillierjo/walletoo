import IncomeModel from "@/core/mongoDB/models/incomes.model";
import { getSession } from "next-auth/react";

export async function GET(request: Request) {
    const session = await getSession({ req: request });

    if (!session || !session.user) return res.status(401).json({ message: "Unauthorized" });

    const userEmail = session.user.email;

    const income = await IncomeModel.find({ userEmail: userEmail });
    return res.status(200).json(income);
}

// export async function GET(request: Request) {
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get("id");
//     const res = await fetch(`https://data.mongodb-api.com/product/${id}`, {
//         headers: {
//             "Content-Type": "application/json",
//             "API-Key": process.env.DATA_API_KEY,
//         },
//     });
//     const product = await res.json();

//     return Response.json({ product });
// }
