const User = require("../models/User");
const jwt = require("../helpers/Jwt");
const bcrypt = require("bcrypt");

const register_user = async (req, res) => {
  try {
    const data = req.body;
    const userExisting = await User.findOne({
      where: { email: data.email },
    });
    if (userExisting) {
      return res.status(409).send({
        msg: "El correo ya existe en la base de datos",
        data: undefined,
      });
    }
    if (!data.password) {
      return res
        .status(400)
        .send({ msg: "No hay una contraseña", data: undefined });
    }

    const newUser = {
      nombres: data.nombres,
      apellidos: data.apellidos,
      email: data.email,
      password: await bcrypt.hash(data.password, 10),
      telefono: data.telefono,
      dni: data.dni,
    };

    await User.create(newUser);

    res.status(201).send({ data: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Error en el servidor", data: undefined });
  }
};

const login_user = async (req, res) => {
  try {
    const data = req.body;

    if (!data.email || data.email.trim() === "") {
      return res.status(400).send({
        msg: "El campo de correo está vacío o no se proporciona",
        data: undefined,
      });
    }

    const user = await User.findOne({ where: { email: data.email } });

    if (!user) {
      return res
        .status(404)
        .send({ msg: "El correo no está registrado", data: undefined });
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .send({ msg: "Contraseña incorrecta", data: undefined });
    }

    const token = jwt.createToken(user);
    res.status(200).send({ data: { user, token } });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error en el servidor", data: undefined });
  }
};

module.exports = {
  register_user,
  login_user,
};