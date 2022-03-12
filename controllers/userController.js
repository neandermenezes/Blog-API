const { Users } = require('../models');
const authService = require('../services/auth');
const userService = require('../services/userService');

const create = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;

    const user = await Users.create({ displayName, email, password, image });
  
    const token = await authService.genAuthToken(user);
  
    return res.status(201).json({ token });
  } catch (err) {
    console.log(err.message);
    return err;
  }
};

const listAll = async (req, res) => {
  try {
    const users = await Users.findAll();

    return res.status(200).json(users);
  } catch (err) {
    console.log(err.message);
    return err;
  }
};

const listById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userService.listById(id);
  
    if (!user) return res.status(404).json({ message: 'User does not exist' });
  
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = {
  create,
  listAll,
  listById,
};