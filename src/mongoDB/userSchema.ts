import { IUser } from "@/src/interfaces/userInterface";
import mongoose, { Schema } from "mongoose";

export type PartialUserUpdate = Partial<IUser>;

const OperationSchema: Schema = new Schema({
  label: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String },
});

const UserSchema: Schema = new Schema({
  email: { type: String, required: true },
  fullName: { type: String, required: true },
  avatar: { type: String },
  isSubscribed: { type: Boolean, required: true, default: false },
  incomes: [OperationSchema],
  expenses: [OperationSchema],
  lang: { type: String, required: true, default: "fr" },
  currency: {
    name: { type: String, required: true, default: "EUR" },
    symbol: { type: String, required: true, default: "€" },
  },
  operationFormat: { type: String, required: true, default: "EU" },
  city: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

const UserModel = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default UserModel;
