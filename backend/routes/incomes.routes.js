const express = require("express");
const incomesController = require("../controllers/incomes.controller");
const router = express.Router();

// INCOMES ROUTES
router.post("/create", incomesController.addIncome);
router.get("/read/:userId", incomesController.getIncomes);
router.put("/update/:id", incomesController.updateIncome);
router.delete("/delete/:id", incomesController.deleteIncome);

module.exports = router;
