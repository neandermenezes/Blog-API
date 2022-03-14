const { Categories } = require('../models');
const postService = require('../services/postService');

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

const validateId = async (req, res, next) => {
  const { id } = req.params;

  if (!id) return res.status(404).json({ message: 'Post does not exist' });

  next();
};

const validateUpdateBody = async (req, res, next) => {
  if (Object.keys(req.body).includes('categoryIds')) {
    return res.status(400).json({ message: 'Categories cannot be edited' });
  } 
  
  next();
};

const validateOwnership = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const user = await postService.listById(Number(id));

  if (!user) return false;

  const userInfo = JSON.parse(user);

  if (Number(userInfo.user.id) !== req.id) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  next();
};

module.exports = {
  validateTitle,
  validateContent,
  validateCategories,
  validateId,
  validateUpdateBody,
  validateOwnership,
};
