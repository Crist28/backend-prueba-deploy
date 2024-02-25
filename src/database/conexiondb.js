const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "postgres",
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch((err) => {
    console.error("Error al conectarse en la base de datos", err);
    process.exit(1);
  });

module.exports = {
  sequelize,
};