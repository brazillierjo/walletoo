import NextAuth from "next-auth";
import { authOptions } from "@/src/utils/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
