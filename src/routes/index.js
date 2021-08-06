const express = require("express");
const transactionRoutes = require("./transaction.routes");

function appRoutes() {
  const router = express.Router();
  router.use("/transaction", transactionRoutes());
  return router;
}

module.exports = appRoutes;
