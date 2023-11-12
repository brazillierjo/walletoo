const AppConfigModel = require("../models/appConfig.model");

// GET
exports.getAppConfig = async (req, res) => {
    try {
        const appConfig = await AppConfigModel.findOne({
            userId: req.params.userId,
        });
        if (appConfig) {
            res.status(200).json(appConfig);
        } else {
            res.status(404).json({ message: "App config not found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

// PUT
exports.editAppConfig = async (req, res) => {
    const userId = req.params.userId;
    const { appConfig } = req.body;

    try {
        const updatedConfig = await AppConfigModel.findOneAndUpdate({ userId }, { appConfig }, { new: true });

        if (updatedConfig) {
            res.status(200).json(updatedConfig.appConfig);
        } else {
            res.status(404).json({ message: "App config not found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

// CREATE APP CONFIG IF NOT EXISTS
exports.createAppConfig = async (req, res) => {
    const userId = req.params.userId;
    const { appConfig } = req.body;

    try {
        const appConfigExists = await AppConfigModel.findOne({ userId });

        if (appConfigExists) res.status(200).json(appConfigExists.appConfig);
        else {
            const newAppConfig = new AppConfigModel({ userId, appConfig });
            const savedAppConfig = await newAppConfig.save();
            res.status(200).json(savedAppConfig.appConfig);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};
