const { Users } = require('../models');

const listById = async (id) => {
  const user = await Users.findByPk(id);

  if (!user) return false;

  delete user.password;

  return user;
};

module.exports = {
  listById,
};