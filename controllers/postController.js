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

    return res.status(200).json(postInfo);
  } catch (err) {
    console.log(err.message);
    return err;
  }
};

const update = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.params;

    const updatedPost = await postService.update(Number(id), title, content);

    return res.status(200).json(updatedPost);
  } catch (err) {
    console.log(err.message);
    return err;
  }
};

const exclude = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPost = await postService.exclude(Number(id));

    if (!deletedPost) return res.status(404).json({ message: 'Post does not exist' });

    return res.status(204).end();
  } catch (err) {
    console.log(err.message);
    return err;
  }
};

const searchQuery = async (req, res) => {
  try {
    const { q } = req.query;
    const postsMatched = await postService.searchyMain(q);

    if (!postsMatched) return res.status(200).json([]);
    return res.status(200).json(postsMatched);
  } catch (err) {
    console.log(err.message);
    return err;
  }
};

module.exports = {
  create,
  listAll,
  listById,
  update,
  exclude,
  searchQuery,
};
