import { getServerSession } from "next-auth";
import connectDB from "@/src/mongoDB/connect";
import UserModel from "@/src/mongoDB/userSchema";

export async function GET() {
    await connectDB();

    try {
        const session = await getServerSession();

        if (!session?.user?.email) throw new Error("Unauthorized");

        const userEmail = session.user.email;
        const userInformations = await UserModel.find({ email: userEmail });

        return new Response(JSON.stringify(userInformations), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error(error);
        throw new Error("Internal Server Error");
    }
}
