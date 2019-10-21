'use strict';
const db = require('../models');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  return db.User.findOne({
    where: {
       email: "rein@codaisseur.dev"
    }})
    .then(rein => {
      return queryInterface.bulkInsert("Posts", [
        {
          title: "Hello, World!",
          body: "Hello world! :wave:",
          userId: rein.id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Hello Again, World!",
          body: "Hello world! :wave:",
          userId: rein.id,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete("Posts", null, {});
  }
};
