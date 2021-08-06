const config = require("./config/config");
const { startServer } = require("./startServer");

startServer({port: config.app.port});