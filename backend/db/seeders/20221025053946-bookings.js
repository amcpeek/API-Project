"use strict";

//bulk create files do not need to be updated for render

const { Booking } = require("../models");

const validBookings = [
  // {
  //   spotId: 1,
  //   userId:2,
  //   startDate:  `2023-01-01` ,
  //   endDate: `2023-01-02`
  // },
  // {
  //   spotId: 2,
  //   userId:3,
  //   startDate:  `2023-02-01` ,
  //   endDate: `2023-02-02`
  // },
  // {
  //   spotId: 3,
  //   userId:4,
  //   startDate:  `2023-03-01` ,
  //   endDate: `2023-03-02`
  // } ,   {
  //   spotId: 4,
  //   userId:4,
  //   startDate:  `2023-04-01` ,
  //   endDate: `2023-04-02`
  // },
  // {
  //   spotId: 5,
  //   userId: 1,
  //   startDate:  `2023-05-01` ,
  //   endDate: `2023-05-02`
  // }
  {
    spotId: 1,
    userId: 2,
    startDate: "2022-10-01",
    endDate: "2022-10-03",
  },
  {
    spotId: 2,
    userId: 3,
    startDate: "2022-11-02",
    endDate: "2022-11-08",
  },
  {
    spotId: 3,
    userId: 4,
    startDate: "2022-12-05",
    endDate: "2022-12-09",
  },
  {
    spotId: 4,
    userId: 5,
    startDate: "2022-10-01",
    endDate: "2022-10-04",
  },
  {
    spotId: 5,
    userId: 1,
    startDate: "2022-11-04",
    endDate: "2022-11-07",
    /////
  },
  {
    spotId: 6,
    userId: 3,
    startDate: "2022-12-01",
    endDate: "2022-12-03",
  },
  {
    spotId: 7,
    userId: 4,
    startDate: "2022-10-04",
    endDate: "2022-10-10",
  },
  {
    spotId: 8,
    userId: 5,
    startDate: "2022-09-02",
    endDate: "2022-09-07",
  },
  {
    spotId: 9,
    userId: 1,
    startDate: "2022-09-01",
    endDate: "2022-09-05",
  },
  {
    spotId: 10,
    userId: 2,
    startDate: "2022-10-11",
    endDate: "2022-10-17",
  },
  {
    spotId: 11,
    userId: 4,
    startDate: "2022-10-22",
    endDate: "2022-10-27",
  },
  {
    spotId: 12,
    userId: 5,
    startDate: "2022-08-04",
    endDate: "2022-08-08",
  },
  {
    spotId: 13,
    userId: 1,
    startDate: "2022-10-08",
    endDate: "2022-10-12",
  },
  {
    spotId: 14,
    userId: 2,
    startDate: "2022-10-28",
    endDate: "2022-11-03",
  },
  {
    spotId: 15,
    userId: 3,
    startDate: "2022-12-21",
    endDate: "2022-12-27",
  },
  {
    spotId: 16,
    userId: 5,
    startDate: "2022-11-29",
    endDate: "2022-12-03",
  },
  {
    spotId: 17,
    userId: 1,
    startDate: "2022-07-14",
    endDate: "2022-07-19",
  },
  {
    spotId: 18,
    userId: 2,
    startDate: "2022-10-01",
    endDate: "2022-10-03",
  },
  {
    spotId: 19,
    userId: 3,
    startDate: "2022-12-21",
    endDate: "2022-12-28",
  },
  {
    spotId: 20,
    userId: 4,
    startDate: "2022-12-28",
    endDate: "2022-12-31",
  },
  {
    spotId: 1,
    userId: 3,
    startDate: "2022-06-07",
    endDate: "2022-06-09",
  },
  {
    spotId: 2,
    userId: 4,
    startDate: "2022-08-25",
    endDate: "2022-08-30",
  },
  {
    spotId: 3,
    userId: 5,
    startDate: "2022-09-25",
    endDate: "2022-10-03",
  },
  {
    spotId: 4,
    userId: 1,
    startDate: "2022-12-09",
    endDate: "2022-12-15",
  },
  {
    spotId: 5,
    userId: 2,
    startDate: "2022-08-08",
    endDate: "2022-08-13",
  },
  /////end of past events

  ///beginning of next week

  {
    spotId: 1,
    userId: 2,
    startDate: "2023-02-01",
    endDate: "2023-02-03",
  },
  {
    spotId: 2,
    userId: 3,
    startDate: "2023-05-03",
    endDate: "2023-05-12",
  },
  {
    spotId: 3,
    userId: 4,
    startDate: "2023-04-05",
    endDate: "2023-04-09",
  },
  {
    spotId: 4,
    userId: 5,
    startDate: "2023-03-01",
    endDate: "2023-03-04",
  },
  {
    spotId: 5,
    userId: 1,
    startDate: "2023-06-04",
    endDate: "2023-06-07",
    /////
  },
  {
    spotId: 6,
    userId: 3,
    startDate: "2023-08-01",
    endDate: "2023-08-04",
  },
  {
    spotId: 7,
    userId: 4,
    startDate: "2023-10-11",
    endDate: "2023-10-14",
  },
  {
    spotId: 8,
    userId: 5,
    startDate: "2023-04-03",
    endDate: "2023-04-07",
  },
  {
    spotId: 9,
    userId: 1,
    startDate: "2023-04-10",
    endDate: "2023-04-14",
  },
  {
    spotId: 10,
    userId: 2,
    startDate: "2023-07-11",
    endDate: "2023-07-17",
  },
  {
    spotId: 11,
    userId: 4,
    startDate: "2023-05-22",
    endDate: "2023-05-27",
  },
  {
    spotId: 12,
    userId: 5,
    startDate: "2023-08-04",
    endDate: "2023-08-08",
  },
  {
    spotId: 13,
    userId: 1,
    startDate: "2023-10-23",
    endDate: "2023-10-27",
  },
  {
    spotId: 14,
    userId: 2,
    startDate: "2023-03-28",
    endDate: "2023-03-03",
  },
  {
    spotId: 15,
    userId: 3,
    startDate: "2023-05-07",
    endDate: "2023-05-10",
  },
  {
    spotId: 16,
    userId: 5,
    startDate: "2023-05-29",
    endDate: "2023-05-03",
  },
  {
    spotId: 17,
    userId: 1,
    startDate: "2023-07-19",
    endDate: "2023-07-24",
  },
  {
    spotId: 18,
    userId: 2,
    startDate: "2023-06-01",
    endDate: "2023-06-03",
  },
  {
    spotId: 19,
    userId: 3,
    startDate: "2023-02-21",
    endDate: "2023-02-28",
  },
  {
    spotId: 20,
    userId: 4,
    startDate: "2023-05-05",
    endDate: "2023-05-08",
  },
  {
    spotId: 1,
    userId: 3,
    startDate: "2023-06-07",
    endDate: "2023-06-09",
  },
  {
    spotId: 2,
    userId: 4,
    startDate: "2023-08-25",
    endDate: "2023-08-30",
  },
  {
    spotId: 3,
    userId: 5,
    startDate: "2023-09-25",
    endDate: "2023-10-03",
  },
  {
    spotId: 4,
    userId: 1,
    startDate: "2023-12-07",
    endDate: "2023-12-12",
  },
  {
    spotId: 5,
    userId: 2,
    startDate: "2023-08-08",
    endDate: "2023-08-13",
  },
];

/** @type {import('sequelize-cli').Migration} */ //do I need to keep this?
module.exports = {
  async up(queryInterface, Sequelize) {
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

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    for (let bookingInfo of validBookings) {
      try {
        await Booking.destroy({
          where: bookingInfo,
        });
      } catch (err) {
        //  console.log(err);
        throw err;
      }
    }
  },
  validBookings,
};
