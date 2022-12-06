'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  up: (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages'
      return queryInterface.bulkInsert(options, [
        {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/0a9f63e8-5d73-49c1-ab32-2e3e2b458fff.jpg?im_w=1200',
        preview: true
      } , {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/590c3404-1cc2-4738-a934-6f41098bf612.jpg?im_w=960',
        preview: true
      } , {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-696481330883942464/original/1b14f30d-98a0-4e16-81b5-c6261b9e2579.jpeg?im_w=1200',
        preview: true
      } , {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/a83cf6f9-e70b-4d80-a38b-b2b8f26f19cd.jpg?im_w=720',
        preview: true
      } , {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-697772380361236748/original/58ad3760-232f-4a59-8013-c150e323d72c.jpeg?im_w=960',
        preview: true
      }

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages'
     return queryInterface.bulkDelete(options
      // {spotId: [1,2,3,4,5]}
      );
  }
};
