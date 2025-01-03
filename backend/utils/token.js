const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = process.env;

const createAccessToken = (payload) => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET);
}

module.exports = {
  createAccessToken,
}
//Rj2S?RVe9[]8-dCS6A**&b5Tsg$gwbg~Bd{*QTK