const httpStatus = require("http-status");
const ApiError = require("../utils/apiError");
const axios = require("axios");
const config = require("../config/config");
const { transactionConstants } = require("../constants");

class CurrencyService {
  constructor(url) {
    this.url = url;
  }

  async getAllCurrencies() {
    try {
      return await axios.get(this.url);
    } catch (e) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, e.message, e.stack);
    }
  }

  async getCurrencyRateToEuro(currency) {
    try {
      if (currency === transactionConstants.euroCurrency) {
        return 1;
      }
      const { data } = await axios.get(this.url);
      return Object.entries(data.rates).find((key) => key[0] === currency)[1];
    } catch (e) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, e.message, e.stack);
    }
  }
}

module.exports = new CurrencyService(config.currencyApi.url);
