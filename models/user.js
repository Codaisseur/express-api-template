'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      encryptedPassword: DataTypes.STRING
    },
    {
      getterMethods: {
        fullName() {
          return this.firstName + " " + this.lastName;
        }
      }
    }
  );
  User.associate = function(models) {
    // associations can be defined here
    models.User.hasMany(models.Post, {
      foreignKey: "userId"
    });
  };
  return User;
};
