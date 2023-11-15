import mongoose, { Schema, Document } from "mongoose";

interface IIncome extends Document {
    userId: string;
    label: string;
    amount: number;
}

const IncomeSchema: Schema = new Schema({
    userId: { type: String, required: true },
    label: { type: String, required: true },
    amount: { type: Number, required: true },
});

const IncomeModel = mongoose.model<IIncome>("Income", IncomeSchema);

export default IncomeModel;
