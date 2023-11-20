import { getServerSession } from "next-auth";
import { authOptions } from "@/src/utils/authOptions";
import UserModel from "@/src/mongoDB/userSchema";

export async function DELETE() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) throw new Error("Unauthorized");

        const userEmail = session.user.email;
        const userInformations = await UserModel.deleteOne({ email: userEmail });

        return new Response(JSON.stringify(userInformations));
    } catch (error) {
        console.error(error);
        throw new Error("Internal Server Error");
    }
}
