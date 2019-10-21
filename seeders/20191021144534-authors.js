'use strict';
const bcrypt = require('bcrypt');

const createDummyPassword = () => {
  return bcrypt.hash("abcd1234", 10);
}

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
   return createDummyPassword()
      .then(encryptedPassword => {
        return queryInterface.bulkInsert("Users", [
          {
            firstName: "Rein",
            lastName: "Op 't Land",
            email: "rein@codaisseur.dev",
            encryptedPassword: encryptedPassword,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            firstName: "Wouter",
            lastName: "de Vos",
            email: "wouter@codaisseur.dev",
            encryptedPassword: encryptedPassword,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ]);
      })
      .catch(console.error);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete("Users", null, {});
  }
};
