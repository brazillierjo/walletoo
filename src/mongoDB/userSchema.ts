import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/userInterface";

export type PartialUserUpdate = Partial<IUser>;

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
    currency: {
        name: { type: String, required: true },
        symbol: { type: String, required: true },
    },
    createdAt: { type: Date, default: Date.now },
});

const UserModel = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default UserModel;
