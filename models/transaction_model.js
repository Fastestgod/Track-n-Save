const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  date: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  amount: {
    type: Number,
    require: true,
  },
  userId: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("transaction", transactionSchema);
