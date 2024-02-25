const jwt = require("jsonwebtoken");
const { addDays, getUnixTime } = require("date-fns");

const secret = process.env.JWT_SECRET;

exports.createToken = (user) => {
  const payload = {
    sub: user.id,
    nombres: user.nombres,
    apellidos: user.apellidos,
    email: user.email,
    iat: getUnixTime(new Date()),
    exp: getUnixTime(addDays(new Date(), 7)),
  };

  return jwt.sign(payload, secret);
};