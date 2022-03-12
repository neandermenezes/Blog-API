require('dotenv').config();
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const JWT_CONFIG = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const genAuthToken = (userData) => {
  const token = jwt.sign({ data: userData }, JWT_SECRET, JWT_CONFIG);

  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { id } = decoded.data;

    return id;
  } catch (err) {
    return null;
  }
};

module.exports = {
  genAuthToken,
  verifyToken,
};