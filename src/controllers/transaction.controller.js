const asyncHandler = require("../utils/asyncHandler");
const { transactionService } = require("../services");
const { externalCurrencyService } = require("../external");

const getTransactionCommission = asyncHandler(async (req, res) => {
  const commission = await transactionService.getTransactionCommission(
    req.body
  );
  return res.json({
    ...commission
  });
});

const getTransactionCurrencies = asyncHandler(async (req, res) => {
  const { data } = await externalCurrencyService.getAllCurrencies();
  let currencies = [];
  if (data.rates) {
    currencies = Object.keys(data.rates);
  }
  return res.json({
    currencies
  });
});

module.exports = {
  getTransactionCommission,
  getTransactionCurrencies
};
