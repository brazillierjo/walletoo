import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
    label: string;
    amount: number;
    category?: string;
}

export interface IUserSchema extends Document {
    email: string;
    fullName: string;
    avatar: string;
    incomes: ITransaction[];
    expenses: ITransaction[];
    currency: string;
    createdAt: Date;
}

const TransactionSchema: Schema = new Schema({
    label: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String },
});

const UserSchema: Schema = new Schema({
    email: { type: String, required: true },
    fullName: { type: String, required: true },
    avatar: { type: String },
    incomes: [TransactionSchema],
    expenses: [TransactionSchema],
    currency: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const UserModel = mongoose.models.User || mongoose.model<IUserSchema>("User", UserSchema);

export default UserModel;
