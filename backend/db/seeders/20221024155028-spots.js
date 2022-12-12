'use strict';

// NEW: add this code to each migration file
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
// END of new code

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Spots'
     return queryInterface.bulkInsert(options, [
        {
          ownerId: 1,
      address: '112 A St',
      city: 'Eclectic',
      state: 'Alabama',
      country: 'USA',
      lat: 33.7490,
      lng: 84.3880,
      name: 'Alabama Home',
      description: 'Home in Alabama on a lake, perfect for summer fun.',
      price: 310.00
      }, {
        ownerId: 2,
        address: '101 A St',
        city: 'Valdez',
        state: 'Alaska',
        country: 'USA',
        lat: 30.4383,
        lng: 84.2807,
        name: 'Alaska Home',
        description: 'Home in Alaska surrounded by wild flowers and trees.',
        price: 270.00,
      }, {
        ownerId: 3,
        address: '789 A St',
        city: 'Happy Jack',
        state: 'Arizona',
        country: 'USA',
        lat: 39.1582,
        lng: 75.5244,
        name: 'Arizona Home',
        description: 'Home in Arizona in the pine forest. Great place for a family vacation.',
        price: 220.00
      }, {
        ownerId: 4,
        address: '123 A St',
        city: 'Morrilton',
        state: 'Arkansas',
        country: 'USA',
        lat: 34.7445,
        lng: 92.2880,
        name: 'Arkansas Home',
        description: 'Spacious home in Arkansas in a beautiful field with a view of the surrounding valley',
        price: 190.00
      }, {
        ownerId: 5,
        address: '456 C St',
        city: 'Big Creek',
        state: 'California',
        country: 'USA',
        lat: 39.7392,
        lng: 104.9903,
        name: 'California Home',
        description: 'Cozy cabin in the woods. Great hiking near by.',
        price: 140.00
      }, {
        ownerId: 1,
        address: '456 C St',
        city: 'Woodland Park',
        state: 'Colorado',
        country: 'USA',
        lat: 39.7392,
        lng: 104.9903,
        name: 'Colorado Home',
        description: 'Home in Colorado in the forest. A great getaway in any season.',
        price: 150.00
      }, {
        ownerId: 2,
        address: '456 C St',
        city: 'East Hampton',
        state: 'Connecticut',
        country: 'USA',
        lat: 39.7392,
        lng: 104.9903,
        name: 'Connecticut Home',
        description: 'Home in Connecticut on a beautiful lake.',
        price: 280.00
      }, {
        ownerId: 3,
        address: '456 O St',
        city: 'Mount Hood Village Oregon',
        state: 'Oregon',
        country: 'USA',
        lat: 39.7392,
        lng: 104.9903,
        name: 'Oregon Home',
        description: 'Home in Oregon in the redwoods.',
        price: 360.00
    }

    ], {});
  },

  down: (queryInterface, Sequelize) => {
     options.tableName = 'Spots'
     return queryInterface.bulkDelete(options
       );
  }
};
