const mongoose = require("mongoose");
const UserModel = require("../models/user.model");
const IncomeModel = require("../models/income.model");
const ExpenseModel = require("../models/expense.model");
const { estimateTax, getSupportedCountries } = require("../services/tax.service");

async function getCountries(req, res) {
  try {
    const countries = getSupportedCountries();
    return res.status(200).json({ countries, status: "success" });
  } catch (err) {
    return res.status(500).json({ message: err.message || "Failed to fetch countries", status: "failed" });
  }
}

async function getTaxEstimate(req, res) {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);
    const user = await UserModel.findById(req.userId).select("country").lean();
    const country = user?.country || "US";
    const { startDate, endDate } = req.query;

    let incomeFilter = { userId };
    let expenseFilter = { userId, isTaxDeductible: true };

    if (startDate || endDate) {
      const dateFilter = {};
      if (startDate) dateFilter.$gte = new Date(startDate);
      if (endDate) dateFilter.$lte = new Date(endDate);
      incomeFilter.date = dateFilter;
      expenseFilter.date = dateFilter;
    } else {
      const now = new Date();
      incomeFilter.date = {
        $gte: new Date(now.getFullYear(), 0, 1),
        $lte: new Date(),
      };
      expenseFilter.date = {
        $gte: new Date(now.getFullYear(), 0, 1),
        $lte: new Date(),
      };
    }

    const incomeAgg = await IncomeModel.aggregate([
      { $match: incomeFilter },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const expenseAgg = await ExpenseModel.aggregate([
      { $match: expenseFilter },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalIncome = incomeAgg[0]?.total ?? 0;
    const totalDeductibleExpenses = expenseAgg[0]?.total ?? 0;

    const estimate = estimateTax(totalIncome, totalDeductibleExpenses, country);

    return res.status(200).json({
      estimate,
      country,
      status: "success",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Failed to compute tax estimate",
      status: "failed",
    });
  }
}

module.exports = { getTaxEstimate, getCountries };
