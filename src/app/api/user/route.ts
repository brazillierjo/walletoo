import connectDB from "@/src/mongoDB/connect"
import UserModel from "@/src/mongoDB/userSchema"
import { sessionCheck } from "@/src/utils/sessionCheck"

export const dynamic = "force-dynamic"

export async function GET() {
  connectDB()

  try {
    const user = await sessionCheck()
    const userInformations = await UserModel.find({ email: user.email })

    return new Response(JSON.stringify({ data: userInformations[0], status: 200 }))
  } catch (error) {
    console.error(error)
    throw new Error("Internal Server Error")
  }
}

export async function PATCH(request: Request) {
  try {
    const user = await sessionCheck()
    const body = await request.json()
    const userInformations = await UserModel.findOneAndUpdate({ email: user.email }, { $set: body }, { new: true })

    return new Response(JSON.stringify({ data: userInformations[0], status: 200 }))
  } catch (error) {
    console.error(error)
    throw new Error("Internal Server Error")
  }
}

export async function DELETE() {
  try {
    const user = await sessionCheck()
    const userInformations = await UserModel.deleteOne({ email: user.email })

    return new Response(JSON.stringify({ data: userInformations, status: 200 }))
  } catch (error) {
    console.error(error)
    throw new Error("Internal Server Error")
  }
}
