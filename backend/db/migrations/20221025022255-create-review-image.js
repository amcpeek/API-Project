"use strict";

// NEW: add this code to each create table migration file
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
// END of new code

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // async up(queryInterface, Sequelize) {
  //   await queryInterface.createTable('ReviewImages', {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "ReviewImages",
      {
        //newForRender
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        reviewId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "Reviews",
          },
          onDelete: "CASCADE",
        },
        url: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      options
    );
  },
  down: (queryInterface, Sequelize) => {
    options.tableName = "ReviewImages";
    return queryInterface.dropTable(options);
  },
};
