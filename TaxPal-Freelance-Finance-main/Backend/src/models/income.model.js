const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema(
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
      enum: ["Freelance", "Contract", "Consulting", "Royalties", "Other"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    source: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

incomeSchema.index({ userId: 1, date: -1 });

const IncomeModel = mongoose.model("income", incomeSchema);

module.exports = IncomeModel;
