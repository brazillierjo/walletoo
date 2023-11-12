const express = require("express");
const expensesController = require("../controllers/expenses.controller");
const router = express.Router();

// INCOMES ROUTES
router.post("/create", expensesController.addExpense);
router.get("/read/:userId", expensesController.getExpenses);
router.put("/update/:id", expensesController.updateExpense);
router.delete("/delete/:id", expensesController.deleteExpense);

module.exports = router;
