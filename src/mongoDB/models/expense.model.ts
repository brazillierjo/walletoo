import { ITransaction } from "@/src/interfaces/transaction";
import mongoose, { Schema } from "mongoose";

const ExpenseSchema: Schema = new Schema({
    id: { type: String, required: true },
    label: { type: String, required: true },
    amount: { type: Number, required: true },
});

// Check if the model exists before creating a new one
const ExpenseModel = mongoose.models.Expense || mongoose.model<ITransaction>("Expense", ExpenseSchema);

export default ExpenseModel;
