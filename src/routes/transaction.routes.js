const express = require("express");
const { transactionController } = require("../controllers");
const { validationMiddleware } = require("../middlewares");
const { transactionSchema } = require("../validations");

const transactionRoutes = () => {
  const router = express.Router();
  router.post(
    "/",
    validationMiddleware(transactionSchema),
    transactionController.getTransactionCommission
  );

  router.get("/currencies", transactionController.getTransactionCurrencies);
  return router;
};

module.exports = transactionRoutes;
