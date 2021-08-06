const Joi = require("joi");

const transactionSchema = Joi.object().keys({
  date: Joi.string().required(),
  amount: Joi.string().regex(/^\d+$/).required(),
  currency: Joi.string().required(),
  client_id: Joi.number().required()
});

module.exports = {
  transactionSchema
};
