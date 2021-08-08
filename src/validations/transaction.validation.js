const Joi = require("joi").extend(require("@joi/date"));

const transactionSchema = Joi.object().keys({
  date: Joi.date().format("YYYY-MM-DD").required(),
  amount: Joi.custom((value, helper) => {
    if (!isNaN(value) && !isNaN(parseFloat(value))) {
      return true;
    } else {
      return helper.message("Please enter valid amount");
    }
  }).required(),
  currency: Joi.string().required(),
  client_id: Joi.number().required()
});

module.exports = {
  transactionSchema
};
