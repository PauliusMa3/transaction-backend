const defaultCommissionPercentageValue = 0.5 / 100;

const calculateCommissionValue = (
  currencyRate,
  amount,
  hightTurnoverDiscountUser,
  discountedClient
) => {
  if (hightTurnoverDiscountUser) {
    return 0.03;
  }

  if (discountedClient) {
    return 0.05;
  }

  const calculatedCommissionAmount = amount * defaultCommissionPercentageValue;
  const amount = amount / currencyRate;

  return calculatedCommissionAmount < 0.05 ? 0.05 : calculatedCommissionAmount;
};

module.exports = {
  calculateCommissionValue
};
