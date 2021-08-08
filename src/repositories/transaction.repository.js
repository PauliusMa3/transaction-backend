const { Transaction } = require("../models");

class TransactionRepository {
  constructor() {}

  createNewTransaction({ date, currency, amount, client_id }) {
    return Transaction.create({
      date,
      currency,
      amount,
      client_id
    });
  }

  getTransactionByClientId(client_id) {
    return Transaction.findOne({
      client_id
    });
  }

  getClientTotalAmountOverTimePeriod(client_id, fromDate, toDate) {
    return Transaction.aggregate([
      {
        $match: {
          $and: [
            {
              date: {
                $gte: new Date(fromDate),
                $lt: new Date(toDate)
              }
            },
            { client_id: client_id }
          ]
        }
      },
      { $group: { _id: null, amount: { $sum: "$amount" } } },
      {
        $project: {
          amount: "$amount"
        }
      }
    ]);
  }
}

module.exports = new TransactionRepository();
