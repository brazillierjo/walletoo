import mongoose from "mongoose"

const connectDB = async (): Promise<void> => {
  const mongoUri = process.env.MONGO_URI

  if (!mongoUri) {
    throw new Error("No mongo URI found")
  }

  if (mongoose.connection.readyState === 1) {
    return
  }

  try {
    await mongoose.connect(mongoUri)
    console.log("Connected to MongoDB")
  } catch (error) {
    console.error("Failed to connect to MongoDB", error)
    process.exit(1)
  }
}

export default connectDB
