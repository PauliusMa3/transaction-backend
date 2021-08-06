const httpStatus = require("http-status");
const ApiError = require("../utils/apiError");
const axios = require("axios");

const fetchCurrencies = async () => {
  try {
    const { data: currencies } = await axios(config.currencyApi.url);
    return currencies;
  } catch (e) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to fetch currencies"
    );
  }
};

module.exports = {
  fetchCurrencies
};
