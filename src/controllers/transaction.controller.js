const asyncHandler = require("../utils/asyncHandler");
const { transactionService, currencyService } = require("../services");

const getTransactionCommission = asyncHandler(async (req, res) => {
  const commission = await transactionService.getTransactionCommission(
    req.body
  );
  return res.json({
    ...commission
  });
});

const getTransactionCurrencies = asyncHandler(async (req, res) => {
  const currencies = await currencyService.fetchCurrencies();
  return res.json({
    currencies
  });
});

module.exports = {
  getTransactionCommission,
  getTransactionCurrencies
};
