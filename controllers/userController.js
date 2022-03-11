const { Users } = require('../models');
const authService = require('../services/auth');

const create = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const user = await Users.create({ displayName, email, password, image });

  const token = await authService.genAuthToken(user);

  return res.status(201).json({ token });
};

const listAll = async (req, res) => {
  const users = await Users.findAll();

  return res.status(200).json(users);
};

module.exports = {
  create,
  listAll,
};