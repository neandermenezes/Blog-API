const { BlogPosts, PostsCategories, Users, Categories } = require('../models');

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

  if (!postInfo) return false;

  const allPosts = JSON.stringify(postInfo, null, 2);

  return allPosts;
};

const update = async (id, title, content) => {
  await BlogPosts.update({ title, content }, { where: { id } });

  const updatedPost = JSON.parse(await listById(id));
  
  delete updatedPost.user;

  return updatedPost;
};

const exclude = async (id) => {
  const validPost = await listById(id);

  if (!validPost) return false;

  await BlogPosts.destroy({ where: { id } });

  return true;
};

module.exports = {
  create,
  listAll,
  listById,
  update,
  exclude,
};
