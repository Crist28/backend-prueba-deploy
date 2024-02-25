const express = require("express");
const cors = require("cors");

const { sequelize } = require("./database/conexiondb");

class Server {
    constructor() {
      this.app = express();
  
      this.port = process.env.PORT || 3000;

      this.routesUser = "/api"
  
      this.middlewares();
      this.conexiondb();
      this.routes();
    }
    middlewares() {
      this.app.use(cors());
      this.app.use(express.json());
    }
    conexiondb() {
      sequelize;
    }
    routes() {
      this.app.use(this.routesUser, require("./routes/User"));
    }
    listen() {
      this.app.listen(this.port, () => {
        console.log("Servidor corriendo en el puerto:", this.port);
      });
    }
  }
  
  module.exports = { Server };