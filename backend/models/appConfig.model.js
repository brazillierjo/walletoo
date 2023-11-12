const mongoose = require("mongoose");

const AppConfigSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    appConfig: {
        currency: {
            type: String,
            default: "EUR",
        },
        theme: {
            darkMode: {
                type: Boolean,
                default: false,
            },
            font: {
                type: String,
                default: "Roboto",
            },
        },
    },
});

module.exports = mongoose.model("AppConfig", AppConfigSchema);
