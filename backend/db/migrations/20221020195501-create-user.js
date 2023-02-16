'use strict';

//const { now } = require('sequelize/types/utils'); //this happened because i tried now()

// NEW: add this code to each create table migration file
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
  // options.truncate = true //I thought this might solve the reseeding starting at 6 but it didn't
}
// END of new code

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // async up(queryInterface, Sequelize) { //oldForHeroku
  //   await queryInterface.createTable('Users', {

      up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Users', { //newForRender
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING(256),
        allowNull: false,
        unique: true
      },
      hashedPassword: {
        type: Sequelize.STRING.BINARY,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
  },
   down: (queryInterface, Sequelize) => {
    options.tableName = 'Users'
    return queryInterface.dropTable(options);
  }
  //From the internet idea:
  // down: async (queryInterface, Sequelize) => {
  //   return queryInterface.dropTable('Users', null, { truncate: true, cascade: true })
  // }
};
