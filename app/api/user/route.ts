import UserModel from "@/src/mongoDB/userSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/utils/authOptions";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) throw new Error("Unauthorized");

        const userEmail = session.user.email;
        const userInformations = await UserModel.find({ email: userEmail });

        return new Response(JSON.stringify(userInformations));
    } catch (error) {
        console.error(error);
        throw new Error("Internal Server Error");
    }
}

export async function PATCH(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) throw new Error("Unauthorized");

        const userEmail = session.user.email;
        const body = await request.json();

        const userInformations = await UserModel.findOneAndUpdate({ email: userEmail }, { $set: body }, { new: true });

        return new Response(JSON.stringify(userInformations));
    } catch (error) {
        console.error(error);
        throw new Error("Internal Server Error");
    }
}

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
