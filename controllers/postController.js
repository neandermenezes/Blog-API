// const { BlogPosts, PostsCategories } = require('../models');
const postService = require('../services/postService');

const create = async (req, res) => {
  try {
    const { title, categoryIds, content } = req.body;

      const newPost = await postService.create(title, content, req.id, categoryIds);

      return res.status(201).json(newPost);
    } catch (err) {
    console.log(err.message);
    return err;
  }
};

const listAll = async (_req, res) => {
  try {
    const postsInfo = await postService.listAll();

    res.status(200).json(JSON.parse(postsInfo));
  } catch (err) {
    console.log(err.message);
    return err;
  }
};

const listById = async (req, res) => {
  try {
    const { id } = req.params;

    const postInfo = await postService.listById(id);

    if (!postInfo) return res.status(404).json({ message: 'Post does not exist' });

    return res.status(200).json(JSON.parse(postInfo));
  } catch (err) {
    console.log(err.message);
    return err;
  }
};

module.exports = {
  create,
  listAll,
  listById,
};
