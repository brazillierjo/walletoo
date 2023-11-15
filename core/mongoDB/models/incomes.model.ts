import mongoose, { Schema, Document } from "mongoose";

export interface IIncome extends Document {
    userId: string;
    label: string;
    amount: number;
}

const IncomeSchema: Schema = new Schema({
    userId: { type: String, required: true },
    label: { type: String, required: true },
    amount: { type: Number, required: true },
});

// Check if the model exists before creating a new one
const IncomeModel = mongoose.models.Income || mongoose.model<IIncome>("Income", IncomeSchema);

export default IncomeModel;
