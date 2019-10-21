'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    encryptedPassword: DataTypes.STRING,
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    models.User.hasMany(models.Post);
  };
  return User;
};
