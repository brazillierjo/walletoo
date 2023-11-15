import mongoose from "mongoose";

const IncomeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    label: {
        type: String,
        required: [true, "Label is required."],
    },
    amount: {
        type: Number,
        required: [true, "Amount is required."],
    },
});

export default mongoose.models.Income || mongoose.model("Income", IncomeSchema);
