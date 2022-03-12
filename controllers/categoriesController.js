const { Categories } = require('../models');

const create = async (req, res) => {
  try {
    const { name } = req.body;

    const newCategory = await Categories.create({ name });
  
    res.status(201).json(newCategory);
  } catch (err) {
    console.log(err.message);
    return err;
  }
};

const listAll = async (req, res) => {
  try {
    const categories = await Categories.findAll();

    return res.status(200).json(categories);
  } catch (err) {
    console.log(err.message);
    return err;
  }
};

module.exports = {
  create,
  listAll,
};
