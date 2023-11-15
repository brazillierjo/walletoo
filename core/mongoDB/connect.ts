import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
        throw new Error("No mongo URI found");
    }

    // Vérifiez si la connexion existe déjà
    if (mongoose.connection.readyState === 1) {
        console.log("Already connected to MongoDB");
        return;
    }

    try {
        await mongoose.connect(mongoUri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1);
    }
};

export default connectDB;
