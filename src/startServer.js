const app = require("express")();
const appRoutes = require("./routes");
const logger = require("loglevel");
const cors = require("cors");
const config = require("./config/config");
const mongoose = require("mongoose");
const express = require("express");
const options = {
  autoIndex: false,
  poolSize: 10,
  bufferMaxEntries: 0,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

function startServer() {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  app.use("/api", appRoutes());
  app.use(errorMiddleware);

  return new Promise((resolve) => {
    mongoose
      .connect(config.db.host, options)
      .then(() => {
        console.log("MongoDB Successfully connected!");
        const server = app.listen(config.app.port, () => {
          console.log(`App running on port port ${server.address().port}`);
          const serverClose = server.close.bind(server);
          server.close = () => {
            return new Promise((resolveServerClose) => {
              serverClose(resolveServerClose);
            });
          };

          setupExitHandler(server);
          resolve(server);
        });
      })
      .catch((e) => {
        logger.error("Failed to connect to MongoDB!");
      });
  });

  function errorMiddleware(error, req, res, next) {
    logger.error(error);
    res.status(error.statusCode || 500);
    res.json({
      message: error.message,
      ...(process.env.NODE_ENV === "production"
        ? null
        : {
            stack: error.stack
          })
    });
  }
}

function setupExitHandler(server) {
  async function exitHandler({ options = {} }) {
    await server
      .close()
      .then(() => {
        logger.info("Server successfully closed");
      })
      .catch((err) => {
        logger.error("Something went wrong closing the server", err.stack);
      });
    if (options.exit) process.exit();
  }

  process.on("SIGINT", exitHandler.bind(null, { exit: true }));
  process.on("SIGTERM", exitHandler.bind(null, { exit: true }));

  process.on("uncaughtException", (err) => {
    log.error("There was uncaught error: ", err);
    process.exit(1);
  });
}

module.exports = { startServer };
