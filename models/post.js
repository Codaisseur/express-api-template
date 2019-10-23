'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      title: DataTypes.STRING,
      body: DataTypes.TEXT
    },
    {
      getterMethods: {
        url() {
          return "http://localhost:4000/" + this.id;
        }
      }
    }
  );
  Post.associate = function(models) {
    // associations can be defined here
    models.Post.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  };
  return Post;
};
