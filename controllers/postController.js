const { BlogPosts } = require('../models');

const create = async (req, res) => {
  const { title, content } = req.body;

  const newPost = await BlogPosts.create({ title, content, userId: req.id });

  return res.status(201).json(newPost);
};

module.exports = {
  create,
};
