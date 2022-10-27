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
     await queryInterface.bulkInsert('ReviewImages', [
      {
      reviewId: 1,
      url: 'https://a0.muscache.com/im/pictures/0e09b028-1204-498f-8a87-8ae56c5abe6e.jpg?im_w=1200',
    } , {
      reviewId: 2,
      url: 'https://a0.muscache.com/im/pictures/1b7980ee-bfe8-45de-9429-3616e2ef6fad.jpg?im_w=1200',
    } , {
      reviewId: 3,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-696481330883942464/original/bb0b7675-1e66-49e7-a661-d2556bdbba33.jpeg?im_w=1440',
    } , {
      reviewId: 4,
      url: 'https://a0.muscache.com/im/pictures/f26cd288-3188-4638-8f89-7557558e7df1.jpg?im_w=1440',
    } , {
      reviewId: 5,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-697772380361236748/original/9e53ea62-076c-423b-9e10-293c371bfde1.jpeg?im_w=1200',
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
   await queryInterface.bulkDelete('ReviewImages', {
    reviewId: [1,2,3,4,5]

   });
}
};
