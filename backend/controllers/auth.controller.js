const UserModel = require("../models/user.model");
const AppConfigModel = require("../models/appConfig.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Income = require("../models/income.model");
const Expense = require("../models/expense.model");
const AppConfig = require("../models/appConfig.model");
const User = require("../models/user.model");

module.exports.signUp = async (req, res) => {
    const { email, password, firstname, lastname } = req.body;
    const user = await UserModel.findOne({ email });

    if (user) {
        return res.status(400).json({
            message: "email already exists.",
        });
    }
    const newUser = new UserModel({
        email,
        password,
        firstname,
        lastname,
    });

    await newUser.save();

    // Create AppConfig for the new user
    const defaultAppConfig = new AppConfigModel().appConfig;
    const newAppConfig = new AppConfigModel({
        userId: newUser._id,
        appConfig: defaultAppConfig,
    });

    await newAppConfig.save();

    res.status(201).json({
        message: "User created.",
    });
};

module.exports.signIn = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
        return res.status(400).json({
            message: "User not found.",
        });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        return res.status(400).json({
            message: "Invalid password.",
            error: res.error,
        });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "2h",
    });

    res.status(200).json({
        message: "User logged in.",
        token,
        user: {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        },
    });
};

module.exports.getUser = async (req, res) => {
    const { userId } = req.params;
    const user = await UserModel.findById(userId).select("-password");

    if (!user) {
        return res.status(400).json({
            message: "User not found.",
        });
    }

    res.status(200).json(user);
};

module.exports.updateUser = async (req, res) => {
    const { userId } = req.params;
    const { email, firstname, lastname } = req.body;

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            {
                _id: userId,
            },
            {
                email,
                firstname,
                lastname,
            },
            {
                new: true,
            }
        );

        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports.deleteUser = async (req, res) => {
    const { userId } = req.params;
    const session = await mongoose.startSession();

    try {
        await session.withTransaction(async () => {
            await Income.deleteMany({ userId }, { session });

            await Expense.deleteMany({ userId }, { session });

            await AppConfig.findOneAndDelete({ userId }, { session });

            await User.findByIdAndDelete(userId, { session });
        });

        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while deleting the user. Error : " + error.message);
    } finally {
        session.endSession();
    }
};

module.exports.updatePassword = async (req, res) => {
    const { userId } = req.params;
    const { oldPassword, newPassword } = req.body;

    try {
        const user = await User.findById(userId);

        const isPasswordValid = await user.isValidPassword(oldPassword);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Incorrect old password" });
        }

        const salt = await bcrypt.genSalt(10);
        const newHashedPassword = await bcrypt.hash(newPassword, salt);
        const oldHashedPassword = user.password;

        if (oldHashedPassword === newHashedPassword) {
            return res.status(400).json({
                message: "New password should not be the same as old password",
            });
        }

        user.password = newPassword;
        await user.save();

        return res.json({ message: "Password updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports.forgetPassword = async (req, res) => {
    const { email } = req.body;
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

    try {
        const user = await UserModel.findOneAndUpdate({ email }, { resetCode });

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ message: "Reset code generated", userId: user._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports.resetPasword = async (req, res) => {
    const { userId } = req.params;
    const { resetCode, newPassword } = req.body;

    try {
        const user = await UserModel.findById(userId);

        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.resetCode !== resetCode) return res.status(400).json({ message: "Invalid reset code" });

        user.password = newPassword;
        user.resetCode = null;

        await user.save();

        res.json({ message: "Password updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
