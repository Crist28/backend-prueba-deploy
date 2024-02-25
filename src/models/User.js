const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/conexiondb");

const User = sequelize.define("user", {
  nombres: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellidos: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("La tabla User ha sido sincronizada con la base de datos.");
  })
  .catch((err) => {
    console.error("Error al sincronizar la tabla User:", err);
  });

module.exports = User;