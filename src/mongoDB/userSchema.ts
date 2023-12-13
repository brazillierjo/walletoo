import { IUser } from "@/src/interfaces/userInterface";
import mongoose, { Schema } from "mongoose";

export type PartialUserUpdate = Partial<IUser>;

const OperationSchema: Schema = new Schema({
  label: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String },
});

const UserSchema: Schema = new Schema({
  avatar: { type: String },
  city: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  currency: { type: String, required: true, default: "EUR" },
  email: { type: String, required: true },
  expenses: [OperationSchema],
  fullName: { type: String, required: true },
  incomes: [OperationSchema],
  isSubscribed: { type: Boolean, required: true, default: false },
  lang: { type: String, required: true, default: "fr" },
  notes: { type: String, default: "" },
  operationFormat: { type: String, required: true, default: "EU" },
  temperatureUnit: { type: String, required: true, default: "Celsius" },
});

const UserModel = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default UserModel;
