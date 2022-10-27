'use strict';

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
    */
      await queryInterface.bulkInsert('Spots', [
        {
        ownerId: 1,
        address: '123 A St',
        city: 'Little Rock',
        state: 'Arkansas',
        country: 'USA',
        lat: 34.7445,
        lng: 92.2880,
        name: 'Arkansas Home',
        description: 'Home in Arkansas',
        price: 100.00
      }, {
        ownerId: 2,
        address: '456 C St',
        city: 'Denver',
        state: 'Colorado',
        country: 'USA',
        lat: 39.7392,
        lng: 104.9903,
        name: 'Colorado Home',
        description: 'Home in Colorado',
        price: 150.00
      } , {
        ownerId: 3,
        address: '789 D St',
        city: 'Dover',
        state: 'Delaware',
        country: 'USA',
        lat: 39.1582,
        lng: 75.5244,
        name: 'Delaware Home',
        description: 'Home in Delaware',
        price: 200.00
    } , {
      ownerId: 4,
      address: '101 F St',
      city: 'Tallahassee',
      state: 'Florida',
      country: 'USA',
      lat: 30.4383,
      lng: 84.2807,
      name: 'Florida Home',
      description: 'Home in Florida',
      price: 250.00
    } , {
      ownerId: 5,
      address: '112 G St',
      city: 'Atlanta',
      state: 'Georgia',
      country: 'USA',
      lat: 33.7490,
      lng: 84.3880,
      name: 'Georgia Home',
      description: 'Home in Georgia',
      price: 300.00
    }

    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Spots', {
      name: ['Arkansas Home', 'Colorado Home', 'Delaware Home', 'Florida Home', 'Georgia Home' ]
     });
  }
};
