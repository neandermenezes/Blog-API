const Sequelize = require('sequelize');
const { BlogPosts, PostsCategories, Users, Categories } = require('../models');

const { Op } = Sequelize;

const create = async (title, content, userId, categoryIds) => {
  const newPost = await BlogPosts.create({ title, content, userId });

  const promises = categoryIds.map((categoryId) =>
    PostsCategories.create({ postId: newPost.id, categoryId }));

  await Promise.all(promises);

  delete newPost.published;
  delete newPost.updated;

  return newPost;
};

const listAll = async () => {
  const postInfo = await BlogPosts.findAll({
    include: [
      { model: Users, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categories, as: 'categories', attributes: { exclude: ['PostsCategories'] } },
    ],
  });
  const allPosts = JSON.stringify(postInfo, null, 2);

  return allPosts;
};

const listById = async (id) => {
  const postInfo = await BlogPosts.findOne({
    where: { id },
    include: [
      { model: Users, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categories, as: 'categories', attributes: { exclude: ['PostsCategories'] } },
    ],
  });

  return postInfo;
};

const update = async (id, title, content) => {
  await BlogPosts.update({ title, content }, { where: { id } });

  const updatedPost = await listById(id);

  delete updatedPost.user;

  return updatedPost;
};

const exclude = async (id) => {
  const validPost = await listById(id);

  if (!validPost) return false;

  await BlogPosts.destroy({ where: { id } });

  return true;
};

// https://stackoverflow.com/questions/34255792/sequelize-how-to-search-multiple-columns
const searchQuery = async (query) => {
  const postInfo = await BlogPosts.findAll({
    where: { 
      [Op.or]: [
        { title: { [Op.like]: `%${query}%` } },
        { content: { [Op.like]: `%${query}%` } },
      ],
     },
    include: [
      { model: Users, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categories, as: 'categories', attributes: { exclude: ['PostsCategories'] } },
    ],
  });

  if (!postInfo) return false;

  const allPosts = JSON.stringify(postInfo, null, 2);

  return JSON.parse(allPosts);
};

const searchyMain = async (query) => {
  let postsMatched;

  if (query === '') {
    postsMatched = await listAll();
    return JSON.parse(postsMatched);
  }

  postsMatched = await searchQuery(query);

  if (!postsMatched) return false;

  return postsMatched;
};

module.exports = {
  create,
  listAll,
  listById,
  update,
  exclude,
  searchyMain,
};
