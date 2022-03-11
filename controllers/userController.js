const { Users } = require('../models');

const create = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const user = await Users.create({ displayName, email, password, image });

  return res.status(201).json({});
};

module.exports = {
  create,
};