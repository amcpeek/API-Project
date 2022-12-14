'use strict';
const bcrypt = require("bcryptjs");

// NEW: add this code to each migration file
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
// END of new code
//review file has the old way

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  up: (queryInterface, Sequelize) => {
    options.tableName = 'Users'
      return queryInterface.bulkInsert(options, [ //they return instead of await
        {
          firstName: 'Annika',
          lastName: 'McPeek',
          email: 'annika@user.io',
          username: 'Annika',
          hashedPassword: bcrypt.hashSync('password')
      } , {
        firstName: 'Erik',
        lastName: 'McPeek',
        email: 'erik@user.io',
        username: 'Erik',
        hashedPassword: bcrypt.hashSync('password2')
      },{
      firstName: 'Nolan',
      lastName: 'McPeek-Bechtold',
      email: 'nolan3@user.io',
      username: 'Nolan',
      hashedPassword: bcrypt.hashSync('password3')
    } , {
      firstName: 'Anton',
      lastName: 'McPeek-Bechtold',
      email: 'anton@user.io',
      username: 'FakeUser4',
      hashedPassword: bcrypt.hashSync('password4')
    },{
      firstName: 'Jesse',
      lastName: 'Paulley',
      email: 'jesse@user.io',
      username: 'Jesse',
      hashedPassword: bcrypt.hashSync('password5')
    }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Users'
      return queryInterface.bulkDelete(options
      //  {username: ['Demo-lition', 'FakeUser2','FakeUser3', 'FakeUser4', 'FakeUser5'  ]} //this line was removed
      );
  }
};
