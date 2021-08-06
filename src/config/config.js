require("dotenv").config();

const env = process.env.NODE_ENV || "development";
const development = {
  db: {
    host: process.env.DEV_MONGO_HOST
  },
  app: {
    port: process.env.DEV_APP_PORT,
    frontendUrl: process.env.DEV_FRONTEND_URL
  },
  currencyApi: {
    url: "https://api.exchangerate.host/2021-01-01"
  }
};

const config = {
  development
};

module.exports = config[env];
