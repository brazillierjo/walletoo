import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "@/ui/interfaces/User";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Provide an email."],
        unique: true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Please, provide a valid email."],
    },
    password: {
        type: String,
        required: [true, "Password is required."],
    },
    firstname: {
        type: String,
        required: [true, "Firstname is required."],
    },
    lastname: {
        type: String,
        required: [true, "Lastname is required."],
    },
    resetCode: {
        type: String,
        default: null,
    },
});

UserSchema.pre<IUser>("save", async function (next) {
    const user = this;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
});

UserSchema.methods.isValidPassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
