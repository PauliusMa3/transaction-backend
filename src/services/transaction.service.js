const moment = require("moment");
const { transactionConstants } = require("../constants");
const { externalCurrencyService } = require("../external");
const { calculateCommissionValue } = require("./commission.service");
const { transactionRepository } = require("../repositories");

const getTransactionCommission = async ({
  date,
  currency,
  amount,
  client_id
}) => {
  const fromDate = moment().subtract(1, "months").format("YYYY-MM-DD");
  const toDate = moment().format("YYYY-MM-DD");
  const { discountClientIds, hightTurnoverTransactionAmount } =
    transactionConstants;

  try {
    const existingClient = await transactionRepository.getTransactionByClientId(
      client_id
    );
    let userMonthlyTransactionAmount = 0;

    if (existingClient) {
      const fetchedMonthlyAMount =
        await transactionRepository.getClientTotalAmountOverTimePeriod(
          client_id,
          fromDate,
          toDate
        );
      console.log("fetchedMonthlyAMount: ", fetchedMonthlyAMount);
      userMonthlyTransactionAmount =
        fetchedMonthlyAMount.length > 0 ? fetchedMonthlyAMount[0].amount : 0;
    }

    await transactionRepository.createNewTransaction({
      date,
      currency,
      amount,
      client_id
    });

    const hightTurnoverDiscountUser =
      userMonthlyTransactionAmount >= hightTurnoverTransactionAmount;

    const discountedClient = discountClientIds.includes(client_id);

    const currencyRate = await externalCurrencyService.getCurrencyRateToEuro(
      currency
    );

    const commissionRate = calculateCommissionValue(
      currencyRate,
      amount,
      hightTurnoverDiscountUser,
      discountedClient
    );

    return {
      amount: commissionRate,
      currency
    };
  } catch (e) {
    throw e;
  }
};

module.exports = {
  getTransactionCommission
};
