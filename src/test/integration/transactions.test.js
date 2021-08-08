const chai = require("chai");
const chaiHttp = require("chai-http");
const { Transaction } = require("../../models");
const { startServer } = require("../../startServer");

chai.use(chaiHttp);
chai.should();

const { expect } = chai;
let server;

before(async function () {
  server = await startServer();
});

after(async () => {
  await Transaction.collection.drop();
});

describe("Transactions", () => {
  describe("/POST transaction", function () {
    it("it should post transaction & return commission", async function () {
      let transaction = {
        date: "2021-07-05",
        amount: "600.00",
        currency: "EUR",
        client_id: 999
      };
      const expectedResult = {
        amount: 3,
        currency: transaction.currency
      };
      const res = await chai
        .request(server)
        .post("/api/transaction")
        .send(transaction);

      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal(expectedResult);
    });

    it("it should return 0.05 transaction commission for discount user", async function () {
      let transaction = {
        date: "2021-07-05",
        amount: "100.00",
        currency: "EUR",
        client_id: 42
      };
      const expectedResult = {
        amount: 0.05,
        currency: transaction.currency
      };
      const res = await chai
        .request(server)
        .post("/api/transaction")
        .send(transaction);

      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal(expectedResult);
    });

    it("it should return lowest commission for high Turnover customer", async function () {
      let transaction = {
        date: "2021-07-25",
        amount: "1200.00",
        currency: "EUR",
        client_id: 523
      };

      let transaction2 = {
        date: "2021-08-07",
        amount: "500.00",
        currency: "EUR",
        client_id: 523
      };
      const firstTransactionExpectedResult = {
        amount: 6,
        currency: transaction.currency
      };

      const highTurnoverExpectedResult = {
        amount: 0.03,
        currency: transaction.currency
      };
      const firstTransactionRes = await chai
        .request(server)
        .post("/api/transaction")
        .send(transaction);

      expect(firstTransactionRes.status).to.equal(200);
      expect(firstTransactionRes.body).to.deep.equal(
        firstTransactionExpectedResult
      );

      const secondTransactionRes = await chai
        .request(server)
        .post("/api/transaction")
        .send(transaction2);

      expect(secondTransactionRes.status).to.equal(200);
      expect(secondTransactionRes.body).to.deep.equal(
        highTurnoverExpectedResult
      );
    });
  });
});
