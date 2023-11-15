import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Expense", ExpenseSchema);
