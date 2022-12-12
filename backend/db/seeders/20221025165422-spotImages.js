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
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-571033018697413782/original/03236a7c-4b97-438a-8d9e-33fbf53b99a8.jpeg?im_w=1440',
        preview: true
      } ,
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/012da939-6562-49c4-9e3e-125e011eb09e.jpg?im_w=720',
        preview:false
      } ,
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/d45a295a-3484-44c6-b78e-7164d35b2784.jpg?im_w=1440',
        preview:false
      } ,
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/d45a295a-3484-44c6-b78e-7164d35b2784.jpg?im_w=1440',
        preview:false
      } ,
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/b37464a7-daa7-4ca5-8813-281586058e6a.jpg?im_w=1440',
        preview:false
      } ,  {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-615380005741531856/original/1d38319e-5a8b-4fde-9eea-1fc7f92f46b4.jpeg?im_w=1200',
        preview: true
      } , {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-615380005741531856/original/4eea6b82-6cfe-48c3-aab7-a443421537b0.jpeg?im_w=1440',
        preview: false
      } , {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-615380005741531856/original/1c8689be-61f6-4fe5-8582-21e1cbbf2eb6.jpeg?im_w=1440',
        preview: false
      } , {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-615380005741531856/original/a702e2ba-a2c1-4ecf-90ce-1bd62be345e9.jpeg?im_w=1440',
        preview: false
      } , {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-615380005741531856/original/5b8e2e3a-f3b7-4394-9e09-9bbff9e360a1.jpeg?im_w=1440',
        preview: false
      } , {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-54376028/original/89f162b9-9483-46e1-a688-fda558fc13e0.jpeg?im_w=1200',
        preview: true
      } , {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-54376028/original/9e0a68ea-fca4-4c7c-a46b-8be953131453.jpeg?im_w=1440',
        preview: false
      } , {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-54376028/original/30ce8e62-2972-401d-8767-b481884b5cc2.jpeg?im_w=1440',
        preview: false
      } , {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-54376028/original/6181aca7-5808-49ff-9eac-fc5d53ab540c.jpeg?im_w=1440',
        preview: false
      } , {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-54376028/original/db55f19c-42b5-4c78-a6a2-abd026a7c112.jpeg?im_w=1200',
        preview: false
      } , {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/2a440b4f-293e-4f64-8127-d233ab4461dd.jpg?im_w=1200',
        preview: true
      } , {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/0b6f66f3-f565-4169-840c-b06c49f411df.jpg?im_w=1440',
        preview: false
      } , {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/d6f53017-a927-44e9-9bda-7193a221fb25.jpg?im_w=1440',
        preview: false
      } , {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/22bb3940-62f8-45de-9697-527e53dedc38.jpg?im_w=1440',
        preview: false
      } , {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/f1469201-73e2-4336-a3e3-5bf97dd8a20c.jpg?im_w=1440',
        preview: false
      }, {
        spotId: 5,
       url: 'https://i.imgur.com/Q6PQqEt.jpg',
       preview: true
      }, {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/0b23adbe-2c09-48fc-b0ba-15de1651701f.jpg?im_w=1200',
        preview: false
       }, {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/5afc201f-8216-4f32-8db5-515aca0cadb5.jpg?im_w=1440',
        preview: false
       }, {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/7e43b94c-a881-4698-be25-ff39ff2a7dc0.jpg?im_w=1440',
        preview: false
       }, {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/732dd18a-0afe-4ab1-bf1a-d0d5f1a2a7fe.jpg?im_w=1440',
        preview: false
       }, {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-35795005/original/8a1c0ada-2a21-466a-a434-b7e53698187e.jpeg?im_w=1200',
        preview: true
        }, {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-35795005/original/1b333bfe-5b4c-4619-be35-200ce7363f08.jpeg?im_w=1440',
        preview: false
        }, {
          spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-35795005/original/bf265f07-7ce6-46d0-a839-2c2da66fcb82.jpeg?im_w=1440',
        preview: false
        }, {
          spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-35795005/original/beb2e6c6-c8cd-4f17-a3dd-158a5303d665.jpeg?im_w=1440',
        preview: false
        }, {
          spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-35795005/original/d4917d52-a918-47fd-8728-2fb17c2a074d.jpeg?im_w=1440',
        preview: false
        }, {
          spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-48060031/original/a209a872-d565-443e-a237-0722fc4fee93.jpeg?im_w=1200',
        preview: true
        }, {
          spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-48060031/original/5bd6b503-f329-4e63-a496-d5dd94d473a9.jpeg?im_w=720',
        preview: false
        }, {
          spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-48060031/original/5208a355-7960-44ce-baf8-b2a5a7ed2e22.jpeg?im_w=1440',
        preview: false
        }, {
          spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-48060031/original/5ec4560b-8138-43de-9af0-b0741f026c18.jpeg?im_w=1440',
        preview: false
        }, {
          spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-48060031/original/c8b811ff-b5e2-4944-b68c-740a7b44831e.jpeg?im_w=1440',
        preview: false
        }, {
          spotId: 8,
        url: ' https://a0.muscache.com/im/pictures/miso/Hosting-46870587/original/e233180e-aef5-4df7-b859-1fb6253a7322.jpeg?im_w=1440',
        preview: true
        }, {
          spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-46870587/original/d6de95e7-a1a9-46b2-88a9-652967fdfcfc.jpeg?im_w=1440',
        preview: false
        }, {
          spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-46870587/original/899b86c7-5783-4307-8473-1a167fbfd177.jpeg?im_w=1440',
        preview: false
        }, {
          spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-46870587/original/681bbc9f-7117-4c3e-b029-7e5c7aa5b957.jpeg?im_w=1440',
        preview: false
        }, {
          spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/6485cd81-da65-4a85-856a-0f11a609a66f.jpg?im_w=1440',
        preview: false
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
