'use strict';

//bulk create files do not need to be updated for render

const { Booking } = require('../models')

const validBookings = [
  {
    spotId: 1,
    userId:2,
    startDate:  `2023-01-01` ,
    endDate: `2023-01-02`
  },
  {
    spotId: 2,
    userId:3,
    startDate:  `2023-02-01` ,
    endDate: `2023-02-02`
  },
  {
    spotId: 3,
    userId:4,
    startDate:  `2023-03-01` ,
    endDate: `2023-03-02`
  } ,   {
    spotId: 4,
    userId:4,
    startDate:  `2023-04-01` ,
    endDate: `2023-04-02`
  },
  {
    spotId: 5,
    userId: 1,
    startDate:  `2023-05-01` ,
    endDate: `2023-05-02`
  }
]

/** @type {import('sequelize-cli').Migration} */ //do I need to keep this?
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
     try {
      await Booking.bulkCreate(validBookings, {
        validate: true,
      });
    } catch (err) {
     // console.log(err);
      throw err;
    }

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     for (let bookingInfo of validBookings) {
      try {
        await Booking.destroy({
          where: bookingInfo
        });
      } catch (err) {
      //  console.log(err);
        throw err;
      }
    }
  },
  validBookings,
};
