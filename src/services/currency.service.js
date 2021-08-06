const fetchCurrencies = async () => {
  try {
    const currencies = await axios.get(config.currencyApi.url);
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
