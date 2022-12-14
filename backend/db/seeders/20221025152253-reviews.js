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
        /////
      }, {
        spotId: 6,
        userId: 5,
        review: 'This place was perfect for a weekend get away! It was so calm and peaceful. The view from the deck was fantastic. The kitchen had everything we need to cook in the whole time. ',
        stars: 5,
      }, {
        spotId: 7,
        userId: 5,
        review: 'What a lovely home for our stay in the mountains. This place is very close to many great spots near by. We even got to see a bear from the deck! ',
        stars: 5,
      }, {
        spotId: 8,
        userId: 5,
        review: 'The host was very helpful and kind. We had no issues getting in late and were able to have a restful weekend. It snowed and it was just magical for us.',
        stars: 5,
      }, {
        spotId: 9,
        userId: 5,
        review: 'The perfect mountain getaway. We had a great time here. It was clean, well located and had everything we needed. The owners are very communicative and went out of their way to make us feel welcome and comfortable. We love sledding on the hill across the street! Both adults and children had a great time. All round excellent!',
        stars: 5,
      }, {
        spotId: 10,
        userId: 5,
        review: 'We had a fantastic stay at this cute airbnb in the mountains the lake near by was really wonderful the weather was perfect our whole time there the host was very helpful the beds were comfortable, and the fire place was warm we cooked amazing food in the well supplied kitchen',
        stars: 5,
      }, {
        spotId: 11,
        userId: 5,
        review: "We had a wonderful time here! We can't wait to come back. The host was very kind and helpful and the view was amazing.",
        stars: 5,
      }, {
        spotId: 12,
        userId: 5,
        review: 'This home was so cozy and perfect for us. We had a fantastic time.',
        stars: 5,
      }, {
        spotId: 13,
        userId: 5,
        review: 'We really enjoyed our stay here. Our only concern was the beds were not that comfortable.',
        stars: 5,
    }, {
      spotId: 14,
      userId: 5,
      review: 'This was just magical. We are so glad we came here and are looking forward to visiting again.',
      stars: 5,
    }, {
      spotId: 15,
      userId: 5,
      review: 'This was a such a great find! The host was so helpful and had suggested for places to visit locally.',
      stars: 5,
    }, {
      spotId: 16,
      userId: 5,
      review: 'This place was perfect for a weekend get away! It was so calm and peaceful. The view from the deck was fantastic. The kitchen had everything we need to cook in the whole time. ',
      stars: 5,
    }, {
      spotId: 17,
      userId: 5,
      review: 'What a lovely home for our stay in the mountains. This place is very close to many great spots near by. We even got to see a bear from the deck! ',
      stars: 5,
    }, {
      spotId: 18,
      userId: 5,
      review: 'The host was very helpful and kind. We had no issues getting in late and were able to have a restful weekend. It snowed and it was just magical for us.',
      stars: 5,
    }, {
      spotId: 19,
      userId: 5,
      review: 'The perfect mountain getaway. We had a great time here. It was clean, well located and had everything we needed. The owners are very communicative and went out of their way to make us feel welcome and comfortable. We love sledding on the hill across the street! Both adults and children had a great time. All round excellent!',
      stars: 5,
    }, {
      spotId: 20,
      userId: 5,
      review: 'We had a fantastic stay at this cute airbnb in the mountains the lake near by was really wonderful the weather was perfect our whole time there the host was very helpful the beds were comfortable, and the fire place was warm we cooked amazing food in the well supplied kitchen',
      stars: 5,
    }, {
      spotId: 1,
      userId: 2,
      review: "This place was perfect for a weekend get away! It was so calm and peaceful. The view from the deck was fantastic. The kitchen had everything we need to cook in the whole time. ",
      stars: 5,
    }, {
      spotId: 2,
      userId: 3,
      review: 'What a lovely home for our stay in the mountains. This place is very close to many great spots near by. We even got to see a bear from the deck! ',
      stars: 4,
    } , {
      spotId: 3,
      userId: 4,
      review: 'The host was very helpful and kind. We had no issues getting in late and were able to have a restful weekend. It snowed and it was just magical for us.',
      stars: 3,
    }, {
      spotId: 4,
      userId: 5,
      review: 'The perfect mountain getaway. We had a great time here. It was clean, well located and had everything we needed. The owners are very communicative and went out of their way to make us feel welcome and comfortable. We love sledding on the hill across the street! Both adults and children had a great time. All round excellent!',
      stars: 4,
    }, {
      spotId: 5,
      userId: 1,
      review: 'We had a fantastic stay at this cute airbnb in the mountains the lake near by was really wonderful the weather was perfect our whole time there the host was very helpful the beds were comfortable, and the fire place was warm we cooked amazing food in the well supplied kitchen',
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
