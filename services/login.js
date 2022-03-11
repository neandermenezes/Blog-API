const { Users } = require('../models');
const authService = require('./auth');

const login = async (data) => {
  const user = await Users.findOne({ where: { email: data.email } });

  if (!user) return false;

  const token = authService.genAuthToken(user);

  return { token };
};

module.exports = {
  login,
};