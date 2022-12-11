'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Reviews'
     return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        review: "We had a wonderful time here! We can't wait to come back. The host was very kind and helpful and the view was amazing.",
        stars: 5,
      }, {
        spotId: 2,
        userId: 2,
        review: 'This home was so cozy and perfect for us. We had a fantastic time.',
        stars: 4,
      } , {
        spotId: 3,
        userId: 3,
        review: 'We really enjoyed our stay here. Our only concern was the beds were not that comfortable.',
        stars: 3,
      }, {
        spotId: 4,
        userId: 4,
        review: 'This was just magical. We are so glad we came here and are looking forward to visiting again.',
        stars: 4,
      }, {
        spotId: 5,
        userId: 5,
        review: 'This was a such a great find! The host was so helpful and had suggested for places to visit locally.',
        stars: 5,
      }
     ], {});

  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Reviews'
     return queryInterface.bulkDelete(options
      //  {spotId: [1,2,3,4,5]}
      );
  }
};


////below is the old code for reference

// 'use strict';

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up (queryInterface, Sequelize) {
//     /**
//      * Add seed commands here.
//      *
//      * Example:
//      * await queryInterface.bulkInsert('People', [{
//      *   name: 'John Doe',
//      *   isBetaMember: false
//      * }], {});
//     */
//      await queryInterface.bulkInsert('Reviews', [
//       {
//         spotId: 1,
//         userId: 1,
//         review: 'This place was bad',
//         stars: 1,
//       }, {
//         spotId: 2,
//         userId: 2,
//         review: 'This place was okay',
//         stars: 2,
//       } , {
//         spotId: 3,
//         userId: 3,
//         review: 'This place was alright',
//         stars: 3,
//       }, {
//         spotId: 4,
//         userId: 4,
//         review: 'This place was good',
//         stars: 4,
//       }, {
//         spotId: 5,
//         userId: 5,
//         review: 'This place was great',
//         stars: 5,
//       }
//      ], {});

//   },

//   async down (queryInterface, Sequelize) {
//     /**
//      * Add commands to revert seed here.
//      *
//      * Example:
//      * await queryInterface.bulkDelete('People', null, {});
//      */
//      await queryInterface.bulkDelete('Reviews',  {
//       spotId: [1,2,3,4,5]
//      });
//   }
// };
