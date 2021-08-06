const httpStatus = require("http-status");
const ApiError = require("../utils/apiError");
const axios = require("axios");

const getCurrencyRate = async (currency) => {
  try {
    if (currency === "EUR") {
      return 1;
    }
    const { rates } = await axios.get(config.currencyApi.url);
    const currencyRateToEuro = Object.keys(rates).find(
      (key) => rates[currency] === key
    );
    return currencyRateToEuro;
  } catch (e) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to fetch currencies"
    );
  }
};

module.exports = {
  getCurrencyRate
};
