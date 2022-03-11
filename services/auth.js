require('dotenv').config();
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const JWT_CONFIG = {
  expiresIn: 60,
  algorithm: 'HS256',
};

const genAuthToken = (userData) => {
  const token = jwt.sign({ data: userData }, JWT_SECRET, JWT_CONFIG);

  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { email } = decoded.data;

    return email;
  } catch (err) {
    return null;
  }
};

module.exports = {
  genAuthToken,
  verifyToken,
};