const { Sequelize } = require("sequelize");

const { db_username, db_password, db_database, db_host } = process.env;

const dialect = "postgres";

const sequelize = new Sequelize(db_database, db_username, db_password, {
  host: `${db_host}`,
  dialect,
  logging: false,
});

sequelize
  .authenticate()
  .then((err) => {
    console.log("db is connected..");
    return { code: 200, status: "success" };
  })
  .catch((err) => {
    console.log("Error connecting db", err);
    return { code: 400, status: "failure", message: err.parent.message };
  });

module.exports = sequelize;
