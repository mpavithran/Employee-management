const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USERNAME,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    benchmark: false,
    logging: false,
    dialect: "mysql",
    dialectModule: require("mysql2"),
    dialectOptions: {
      charset: "utf8mb4",
      connectTimeout: 10000,
    },
    timezone: "+05:30",
    pool: {
      max: process.env?.CONNECTION_LIMIT
        ? parseInt(process.env?.CONNECTION_LIMIT)
        : 60,
      min: 5,
    },
  }
);

let connection;

if (!connection)
  sequelize
    .authenticate()
    .then(() => {
      console.log("Database Connected Successfully");
      connection = true;
    })
    .catch((err) => {
      console.error("Database Connection Error:", err);
    });

module.exports = sequelize;
