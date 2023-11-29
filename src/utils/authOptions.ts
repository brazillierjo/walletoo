import connectDB from "@/src/mongoDB/connect";
import UserModel from "@/src/mongoDB/userSchema";
import { NextAuthOptions, User } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
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
  session: {
    maxAge: 24 * 60 * 60, // 1 day
    updateAge: 12 * 60 * 60, // 12 hours
  },
  callbacks: {
    async signIn({ user }: { user: User }) {
      const { email, name, image } = user;

      if (!email) return false; // if no email, don't sign in

      await connectDB();

      const userDoc = await UserModel.findOneAndUpdate(
        { email },
        {
          email,
          fullName: name || "",
          avatar: image || "",
          currency: { name: "EUR", symbol: "€" },
          transactionFormat: "EU",
        },
        { upsert: true, new: true }
      );

      return !!userDoc;
    },
  },
};
