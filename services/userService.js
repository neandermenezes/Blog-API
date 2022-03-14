const { Users } = require('../models');

const listById = async (id) => {
  const user = await Users.findByPk(id);

  if (!user) return false;

  delete user.password;

  return user;
};

const exclude = async (id) => {
  await Users.destroy({ where: { id } });

  return true;
};

module.exports = {
  listById,
  exclude,
};