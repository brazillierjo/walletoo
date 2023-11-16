import { ITransaction } from "@/src/interfaces/transaction";
import mongoose, { Schema } from "mongoose";

const IncomeSchema: Schema = new Schema({
    id: { type: String, required: true },
    label: { type: String, required: true },
    amount: { type: Number, required: true },
});

// Check if the model exists before creating a new one
const IncomeModel = mongoose.models.Income || mongoose.model<ITransaction>("Income", IncomeSchema);

export default IncomeModel;
