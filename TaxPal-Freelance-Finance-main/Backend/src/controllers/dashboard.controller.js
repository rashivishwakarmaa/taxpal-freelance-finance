const mongoose = require("mongoose");
const UserModel = require("../models/user.model");
const IncomeModel = require("../models/income.model");
const ExpenseModel = require("../models/expense.model");
const { estimateTax } = require("../services/tax.service");

async function getStats(req, res) {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);
    const user = await UserModel.findById(req.userId).select("country").lean();
    const country = user?.country || "US";

    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59);

    const incomeAgg = await IncomeModel.aggregate([
      { $match: { userId: userId, date: { $gte: startOfYear, $lte: endOfYear } } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const expenseAgg = await ExpenseModel.aggregate([
      {
        $match: {
          userId: userId,
          date: { $gte: startOfYear, $lte: endOfYear },
          isTaxDeductible: true,
        },
      },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalExpenseAgg = await ExpenseModel.aggregate([
      {
        $match: {
          userId: userId,
          date: { $gte: startOfYear, $lte: endOfYear },
        },
      },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalIncome = incomeAgg[0]?.total ?? 0;
    const totalDeductibleExpenses = expenseAgg[0]?.total ?? 0;
    const totalExpenses = totalExpenseAgg[0]?.total ?? 0;

    const taxEstimate = estimateTax(totalIncome, totalDeductibleExpenses, country);

    return res.status(200).json({
      stats: {
        totalIncome,
        totalExpenses,
        totalDeductibleExpenses,
        estimatedTax: taxEstimate.estimatedTotalTax,
        netProfit: totalIncome - totalExpenses,
        taxBreakdown: taxEstimate,
        country,
      },
      year: now.getFullYear(),
      status: "success",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Failed to fetch dashboard stats",
      status: "failed",
    });
  }
}

module.exports = { getStats };
