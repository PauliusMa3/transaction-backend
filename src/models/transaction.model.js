const mongoose = require("mongoose");
const { Schema } = mongoose;

const transactionSchema = new Schema({
  date: {
    type: Date,
    trim: true,
    required: true
  },

  client_id: {
    type: Number,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    trim: true
  },
  currency: {
    type: String,
    required: true,
    trim: true
  }
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
