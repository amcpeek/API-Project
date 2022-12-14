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
          //1
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
        //2
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
        //3
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
        //4
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
        //5
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
        //6
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
        //7
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
        //8
        ownerId: 3,
        address: '456 O St',
        city: 'Mount Hood Village',
        state: 'Oregon',
        country: 'USA',
        lat: 39.7392,
        lng: 104.9903,
        name: 'Oregon Home',
        description: 'Home in Oregon in the redwoods.',
        price: 360.00
      }, {
        //9
        ownerId: 4,
        address: '123 A st',
        city: 'Sandpoint',
        state: 'Idaho',
        country: 'USA',
        lat: 1,
        lng: 1,
        name: 'IdaHome',
        description: 'Home in Idaho',
        price: 475.00
      }, {
        //10
        ownerId: 5,
        address: '123 A st',
        city: 'Livingston',
        state: 'Montana',
        country: 'USA',
        lat: 1,
        lng: 1,
        name: 'Montana Home',
        description: 'Home in Montana',
        price: 580.00
      }, {
        //11
        ownerId: 1,
        address: '',
        city: 'Buffalo',
        state: 'Wyoming',
        country: 'USA',
        lat: 1,
        lng: 1,
        name: 'Wyoming Home',
        description: 'Home in Wyoming',
        price: 240.00
      }, {
        //12
        ownerId: 2,
        address: '123 A St',
        city: 'Custer',
        state: 'South Dakota',
        country: 'USA',
        lat: 1,
        lng: 1,
        name: 'South Dakota Home',
        description: 'Home in South Dakota',
        price: 310.00
      }, {

        //13
        ownerId: 3,
        address: '123 A St',
        city: 'Fargo',
        state: 'North Dakota',
        country: 'USA',
        lat: 1,
        lng: 1,
        name: 'North Dakota Home',
        description: 'Home in North Dakota',
        price: 190.00
      }, {
        //14
        ownerId: 4,
        address: '123 A St',
        city: 'Brook Park',
        state: 'Minnesota',
        country: 'USA',
        lat: 1,
        lng: 1,
        name: 'Minnesota Home',
        description: 'Home in Minnesota',
        price: 175.00
      }, {
        //15
        ownerId: 5,
        address: '123 A st',
        city: 'Friendship',
        state: 'Wisconsin',
        country: 'USA',
        lat: 1,
        lng: 1,
        name: 'Wisconsin Home',
        description: 'Home in Wisconsin',
        price: 260.00
      }, {
        //16
        ownerId: 1,
        address: '123 A St',
        city: 'South Haven',
        state: 'Michigan',
        country: 'USA',
        lat: 1,
        lng: 1,
        name: 'Michigan Home',
        description: 'Home in Michigan ',
        price: 110.00
      }, {

        //17
        ownerId: 2,
        address: '123 A St',
        city: 'Seattle',
        state: 'Washington',
        country: 'USA',
        lat: 1,
        lng: 1,
        name: 'Washington Home',
        description: 'Home in Washington',
        price: 530.00
      }, {
        //18
        ownerId: 3,
        address: '123 A St',
        city: 'Holualoa',
        state: 'Hawaii',
        country: 'USA',
        lat: 1,
        lng: 1,
        name: 'Hawaiian Home',
        description: 'Home in Hawaii',
        price: 270.00
      }, {
        //19
        ownerId: 4,
        address: '123 A St',
        city: 'Bethany Beach',
        state: 'Delaware',
        country: 'USA',
        lat: 1,
        lng: 1,
        name: 'Delaware Home',
        description: 'Home in Delaware',
        price:  350.00
      }, {
        //20
        ownerId: 5,
        address: '123 A St',
        city: 'Hernando Beach',
        state: 'Florida',
        country: 'USA',
        lat: 1,
        lng: 1,
        name: 'Florida Home',
        description: 'Home in Florida',
        price: 190.00
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
     options.tableName = 'Spots'
     return queryInterface.bulkDelete(options
       );
  }
};
