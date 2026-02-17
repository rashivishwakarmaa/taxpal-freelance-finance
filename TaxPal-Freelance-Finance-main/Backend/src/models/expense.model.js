const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount cannot be negative"],
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    category: {
      type: String,
      trim: true,
      default: "Other",
      enum: [
        "Software",
        "Equipment",
        "Office",
        "Travel",
        "Marketing",
        "Education",
        "Insurance",
        "Other",
      ],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    isTaxDeductible: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

expenseSchema.index({ userId: 1, date: -1 });

const ExpenseModel = mongoose.model("expense", expenseSchema);

module.exports = ExpenseModel;
