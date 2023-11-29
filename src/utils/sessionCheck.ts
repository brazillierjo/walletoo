import UserModel from "@/src/mongoDB/userSchema"
import { getServerSession } from "next-auth"

import { authOptions } from "./authOptions"

export async function sessionCheck() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    throw new Error("Unauthorized")
  }

  const user = await UserModel.findOne({ email: session.user.email })
  if (!user) {
    throw new Error("User not found")
  }

  return user
}
