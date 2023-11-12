const mongoose = require("mongoose");

const mongoUri = process.env.MONGO_URI;

mongoUri
    ? mongoose
          .connect(mongoUri)
          .then(() => console.log("MongoDB connected successfully"))
          .catch((err) => console.error("MongoDB connection error:", err))
    : console.error("MongoDB URI not found");
