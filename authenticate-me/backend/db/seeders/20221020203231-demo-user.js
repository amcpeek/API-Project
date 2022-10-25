'use strict';
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     * //can use await or return, await would work if you want to seed multiple files
     * //return just does that current file next to di
    */
      await queryInterface.bulkInsert('Users', [
        {
          firstName: 'demoFirst',
          lastName: 'demoLast',
          email: 'demo@user.io',
          username: 'Demo-lition',
          hashedPassword: bcrypt.hashSync('password')
      } , {
        firstName: 'user2First',
        lastName: 'user2Last',
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password2')
      },{
      firstName: 'user3First',
      lastName: 'user3Last',
      email: 'user3@user.io',
      username: 'FakeUser3',
      hashedPassword: bcrypt.hashSync('password3')
    } , {
      firstName: 'user4First',
      lastName: 'user4Last',
      email: 'user4@user.io',
      username: 'FakeUser4',
      hashedPassword: bcrypt.hashSync('password4')
    },{
      firstName: 'user5First',
      lastName: 'user5Last',
      email: 'user5@user.io',
      username: 'FakeUser5',
      hashedPassword: bcrypt.hashSync('password5')
    }
    ]);



  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users', {
      username: ['Demo-lition', 'FakeUser1', 'FakeUser2']});
  }
};
