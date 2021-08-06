const asyncHandler = require("../utils/asyncHandler");
const { transactionService } = require("../services");
const httpStatus = require("http-status");

const getTransactionCommission = asyncHandler(async (req, res) => {
  const commission = await transactionService.getTransactionCommission(
    req.body
  );
  return res.json({
    ...commission
  });
});

const getTransactionCurrencies = asyncHandler(async (req, res) => {
  const currencies = await transactionService.fetchCurrencies();
  return res.json({
    currencies
  });
});

module.exports = {
  getTransactionCommission,
  getTransactionCurrencies
};
