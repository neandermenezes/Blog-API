module.exports = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('NOW'),
    },
    updated: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('NOW'),
    },
  }, { timestamps: false });

  BlogPosts.associate = (models) => {
    BlogPosts.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' });
  };

  return BlogPosts;
};