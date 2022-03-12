const { Categories } = require('../models');

const validateTitle = (req, res, next) => {
  const { title } = req.body;

  if (!title) return res.status(400).json({ message: '"title" is required' });

  next();
};

const validateContent = (req, res, next) => {
  const { content } = req.body;

  if (!content) return res.status(400).json({ message: '"content" is required' });

  next();
};

const validateCategories = async (req, res, next) => {
  const { categoryIds } = req.body;

  if (!categoryIds) return res.status(400).json({ message: '"categoryIds" is required' });

  const categories = await Promise.all(
    categoryIds.map((category) => Categories.findByPk(category)),
  );

  const hasInvalidCategories = categories.some((elem) => elem === null);

  if (hasInvalidCategories) return res.status(400).json({ message: '"categoryIds" not found' });

  next();
};

module.exports = {
  validateTitle,
  validateContent,
  validateCategories,
};
