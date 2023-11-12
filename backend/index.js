require("dotenv").config({ path: __dirname + "/.env.local" });
const express = require("express");
const userRoutes = require("./routes/auth.routes");
const incomesRoutes = require("./routes/incomes.routes");
const expensesRoutes = require("./routes/expenses.routes");
const appConfigRoutes = require("./routes/appConfig.routes");
const { verifyToken } = require("./middlewares/auth.middleware");
const cors = require("cors");
require("./config/db");

const app = express();
const port = process.env.PORT || 5000;
console.log(process.env.PORT);
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

// TEST ROUTE
app.get("/", (req, res) => {
    res.send("Hello World 🌏");
});

// USER ROUTES
app.use("/user", userRoutes);

// INCOMES ROUTES
app.use("/incomes", verifyToken, incomesRoutes);

// EXPENSES ROUTES
app.use("/expenses", verifyToken, expensesRoutes);

// APP CONFIG ROUTES
app.use("/app-config", verifyToken, appConfigRoutes);

// PORT APP
app.listen(port, () => {
    console.log("Server running on port " + port);
});
