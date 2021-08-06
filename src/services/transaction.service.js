const { Transaction } = require("../models");
const { getCurrencyRate } = require("./rates.service");

const discountClientIds = [42];

const getTransactionCommission = async ({
  date,
  currency,
  amount,
  clientId
}) => {
  const fromDate = moment().subtract(1, "months").format("YYYY-MM-DD");
  const toDate = moment().format("YYYY-MM-DD");

  const existingClient = await Transaction.findOne({
    client_id: clientId
  });

  let userMonthlyTransactionAmount = 0;

  if (existingClient) {
    userMonthlyTransactionAmount = await Transaction.aggregate([
      {
        $match: { date: { $gte: fromDate, $lte: toDate }, client_id: clientId }
      },
      { $group: { _id: null, amount: { $sum: "$amount" } } }
    ]);
  } else {
    await Transaction.create({
      date,
      currency,
      amount,
      client_id: clientId
    });
  }

  const hightTurnoverDiscountUser = userMonthlyTransactionAmount > 1000;
  const discountedClient = discountClientIds.includes(clientId);

  const currencyRate = getCurrencyRate(currency);

  const commissionRate = calculatedCommissionAmount(
    currencyRate,
    amount,
    hightTurnoverDiscountUser,
    discountedClient
  );

  return {
    amount: commissionRate,
    currency
  };
};

module.exports = {
  getTransactionCommission
};
