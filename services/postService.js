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

module.exports = {
  create,
  listAll,
};
