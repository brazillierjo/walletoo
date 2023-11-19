import NextAuth, { User } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import UserModel from "@/src/mongoDB/userSchema";
import connectDB from "@/src/mongoDB/connect";

export const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID ?? "",
            clientSecret: process.env.GOOGLE_SECRET ?? "",
        }),
    ],
    callbacks: {
        async signIn({ user }: { user: User }) {
            const { email, name, image } = user;

            if (!email) return false; // if no email, don't sign in

            await connectDB();

            const existingUser = await UserModel.findOne({ email });

            if (!existingUser) {
                // if user doesn't exist, create it
                await UserModel.create({
                    email,
                    fullName: name || "",
                    avatar: image || "",
                    incomes: [],
                    expenses: [],
                    currency: "EUR",
                });
            }

            return true;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
