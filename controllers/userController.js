const { Users } = require('../models');
const authService = require('../services/auth');
const userService = require('../services/userService');

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

const listById = async (req, res) => {
  const { id } = req.params;

  const user = await userService.listById(id);

  if (!user) return res.status(404).json({ message: 'User does not exist' });

  return res.status(200).json(user);
};

module.exports = {
  create,
  listAll,
  listById,
};