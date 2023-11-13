import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/core/mongoDB/connect";
import User from "@/core/mongoDB/models/User";

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
        CredentialsProvider({
            name: "Email et mot de passe",
            credentials: {
                email: { label: "E-mail", type: "text", placeholder: "e-mail" },
                password: { label: "Mot de passe", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) return null;

                await connectDB();

                try {
                    const user = await User.findOne({ email: credentials.email });
                    if (!user) return null;

                    const isValid = await user.isValidPassword(credentials.password);
                    if (!isValid) return null;

                    return { id: user.id, name: user.firstname + " " + user.lastname, email: user.email };
                } catch (error) {
                    throw new Error("Erreur lors de la connexion");
                }
            },
        }),
    ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
