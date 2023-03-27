"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = "SpotImages";
    return queryInterface.bulkInsert(
      options,
      [
        //should be Alabama was Arkansas 6
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-35795005/original/464e29cb-847f-4974-8f21-0f26a7a33983.jpeg?im_w=1440",
          //  'https://a0.muscache.com/im/pictures/prohost-api/Hosting-35795005/original/8a1c0ada-2a21-466a-a434-b7e53698187e.jpeg?im_w=1200',
          preview: true,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-35795005/original/1b333bfe-5b4c-4619-be35-200ce7363f08.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-35795005/original/bf265f07-7ce6-46d0-a839-2c2da66fcb82.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-35795005/original/beb2e6c6-c8cd-4f17-a3dd-158a5303d665.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-35795005/original/d4917d52-a918-47fd-8728-2fb17c2a074d.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/2a440b4f-293e-4f64-8127-d233ab4461dd.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/0b6f66f3-f565-4169-840c-b06c49f411df.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/d6f53017-a927-44e9-9bda-7193a221fb25.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/22bb3940-62f8-45de-9697-527e53dedc38.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/f1469201-73e2-4336-a3e3-5bf97dd8a20c.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-54376028/original/89f162b9-9483-46e1-a688-fda558fc13e0.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-54376028/original/9e0a68ea-fca4-4c7c-a46b-8be953131453.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-54376028/original/30ce8e62-2972-401d-8767-b481884b5cc2.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-54376028/original/6181aca7-5808-49ff-9eac-fc5d53ab540c.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-54376028/original/db55f19c-42b5-4c78-a6a2-abd026a7c112.jpeg?im_w=1200",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/012da939-6562-49c4-9e3e-125e011eb09e.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/d45a295a-3484-44c6-b78e-7164d35b2784.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/d45a295a-3484-44c6-b78e-7164d35b2784.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/b37464a7-daa7-4ca5-8813-281586058e6a.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://i.imgur.com/Q6PQqEt.jpg",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/0b23adbe-2c09-48fc-b0ba-15de1651701f.jpg?im_w=1200",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/5afc201f-8216-4f32-8db5-515aca0cadb5.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/7e43b94c-a881-4698-be25-ff39ff2a7dc0.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/732dd18a-0afe-4ab1-bf1a-d0d5f1a2a7fe.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-571033018697413782/original/03236a7c-4b97-438a-8d9e-33fbf53b99a8.jpeg?im_w=1440",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-615380005741531856/original/1d38319e-5a8b-4fde-9eea-1fc7f92f46b4.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-615380005741531856/original/696ccb74-5bca-4f20-ab81-50c24cf7fd6e.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-615380005741531856/original/8cff3f00-b4be-476c-8817-261c1c1c63df.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-615380005741531856/original/22ee1230-d1d7-4f63-94e9-60251494b6f6.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-615380005741531856/original/e092f022-d938-4081-8ab8-5e3cc6105fef.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-48060031/original/a209a872-d565-443e-a237-0722fc4fee93.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-48060031/original/5bd6b503-f329-4e63-a496-d5dd94d473a9.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-48060031/original/5208a355-7960-44ce-baf8-b2a5a7ed2e22.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-48060031/original/5ec4560b-8138-43de-9af0-b0741f026c18.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-48060031/original/c8b811ff-b5e2-4944-b68c-740a7b44831e.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 8,
          url: " https://a0.muscache.com/im/pictures/miso/Hosting-46870587/original/e233180e-aef5-4df7-b859-1fb6253a7322.jpeg?im_w=1440",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-46870587/original/d6de95e7-a1a9-46b2-88a9-652967fdfcfc.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-46870587/original/899b86c7-5783-4307-8473-1a167fbfd177.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-46870587/original/681bbc9f-7117-4c3e-b029-7e5c7aa5b957.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/6485cd81-da65-4a85-856a-0f11a609a66f.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-651456642942499123/original/678d0db3-6581-48d6-bbe7-809841d01fa6.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-651456642942499123/original/78e2f180-1846-4472-a1ea-53309440e95a.jpeg?im_w=1200",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-651456642942499123/original/2273891c-0888-4f4c-a9fd-1debcd695b0f.jpeg?im_w=1200",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-651456642942499123/original/1a763736-b8da-49dc-aeb6-5ce9c6d593d6.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-651456642942499123/original/570723f3-3171-42bd-a255-4ab90d3fcc66.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-49902976/original/04741b6d-8ad7-44be-96d4-06133e8a02e0.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-49902976/original/d0fabd63-f437-47a5-a7a0-7f09fd441158.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-49902976/original/71b1cb2d-806b-49d9-bb99-3ca04a193dd3.jpeg?im_w=1200",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-49902976/original/fce79f64-8db2-4d14-9496-84a744517729.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-49902976/original/976b698d-7bbf-4ae4-948e-041eaa00cb6a.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 11,
          url: "https://a0.muscache.com/im/pictures/cf3c0e7f-cfdd-4c75-b99e-ab7947176535.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 11,
          url: "https://a0.muscache.com/im/pictures/ff757b6b-62cd-41f1-b9e5-808d7f227f19.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 11,
          url: "https://a0.muscache.com/im/pictures/7d846739-5160-4c31-b1c3-b9e6b9754a7d.jpg?im_w=1200",
          preview: false,
        },
        {
          spotId: 11,
          url: "https://a0.muscache.com/im/pictures/34340a80-bf11-4c26-8885-aa8c20c1db4b.jpg?im_w=1200",
          preview: false,
        },
        {
          spotId: 11,
          url: "https://a0.muscache.com/im/pictures/8b696c48-6aa7-4ba8-8de5-41131a4e76eb.jpg?im_w=1200",
          preview: false,
        },
        {
          spotId: 12,
          url: "https://a0.muscache.com/im/pictures/7c9be56c-53f9-4672-a976-f88cd2e8f0b3.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 12,
          url: "https://a0.muscache.com/im/pictures/aba4f7f4-1af2-45a3-8288-4a596d4c0913.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 12,
          url: "https://a0.muscache.com/im/pictures/d64deb57-36b2-48a8-90a5-591b919666aa.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 12,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-534761456741483086/original/468fd552-782c-4013-b930-1b83c2dceddc.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 12,
          url: "https://a0.muscache.com/im/pictures/62e4c832-1101-4e7e-89d6-fbce6a78f314.jpg?im_w=1200",
          preview: false,
        },
        {
          spotId: 13,
          url: "https://a0.muscache.com/im/pictures/02756dc2-cf78-42ce-ac06-85acf1490545.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 13,
          url: "https://a0.muscache.com/im/pictures/23ff5ab5-2c9e-48e8-a12b-c0c48c18f614.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 13,
          url: "https://a0.muscache.com/im/pictures/11e727c0-853d-4ecf-b7ca-b4b12ed12be0.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 13,
          url: "https://a0.muscache.com/im/pictures/17949927-1159-40aa-8f45-c57f8070735e.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 13,
          url: "https://a0.muscache.com/im/pictures/8e5460fe-ecd5-4bb4-acbd-f538caa35838.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 14,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-681793382008462634/original/e77213d2-c806-441f-9248-cad0f58fc617.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 14,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-681793382008462634/original/d05dcbf0-53a8-47cc-9796-94114778651d.jpeg?im_w=1200",
          preview: false,
        },
        {
          spotId: 14,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-681793382008462634/original/eaf62ec6-c070-43e9-8a2c-41c4c1278b7a.jpeg?im_w=1200",
          preview: false,
        },
        {
          spotId: 14,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-681793382008462634/original/1116137e-ee26-4a5f-b1c4-a966064c9975.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 14,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-681793382008462634/original/820f7e4e-79d5-48a1-9e94-79e7cb01415a.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 15,
          url: "https://a0.muscache.com/im/pictures/30cdd5af-2824-4eea-b635-7d08c1c977d1.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 15,
          url: "https://a0.muscache.com/im/pictures/1376f870-a1c3-47e9-b2a0-f0a55c9dfc0f.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 15,
          url: "https://a0.muscache.com/im/pictures/02ed915b-4090-4ae8-9dcb-e496d254b4c2.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 15,
          url: "https://a0.muscache.com/im/pictures/66d24028-3c8b-41b6-b0cd-36077d555298.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 15,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-48367268/original/52e3b813-5ea3-4437-aea9-616982c36974.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 16,
          url: "https://a0.muscache.com/im/pictures/0b075dc9-94b0-4b2a-8400-5c27f3492ffa.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 16,
          url: "https://a0.muscache.com/im/pictures/d277d438-9cbb-43c9-ab55-7f2cdc72830f.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 16,
          url: "https://a0.muscache.com/im/pictures/354c4030-a557-4f69-8285-bcb950d0a0af.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 16,
          url: "https://a0.muscache.com/im/pictures/4604e844-e91c-4d78-969a-5f44d140f1e5.jpg?im_w=1200",
          preview: false,
        },
        {
          spotId: 16,
          url: "https://a0.muscache.com/im/pictures/7a5b7b8b-07b5-4b92-869a-06552e5d602a.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 17,
          url: "https://a0.muscache.com/im/pictures/monet/Select-6603376/original/4fc04ea2-5689-44f5-b7ac-fc39ce8cc32e?im_w=960",
          preview: true,
        },
        {
          spotId: 17,
          url: "https://a0.muscache.com/im/pictures/monet/Select-6603376/original/7db6ad8a-41a9-4b2a-80be-f17bb30d2d2a?im_w=720",
          preview: false,
        },
        {
          spotId: 17,
          url: "https://a0.muscache.com/im/pictures/8f750b2f-1761-4edf-bfa7-1f3a911b1d91.jpg?im_w=1200",
          preview: false,
        },
        {
          spotId: 17,
          url: "https://a0.muscache.com/im/pictures/monet/Select-6603376/original/f68e979f-3cd3-45d4-86a0-70a6a47c0cfc?im_w=720",
          preview: false,
        },
        {
          spotId: 17,
          url: "https://a0.muscache.com/im/pictures/6ff39561-8a23-477f-a6c8-3566f773fb6d.jpg?im_w=1200",
          preview: false,
        },
        {
          spotId: 18,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-53955821/original/b26f71b1-254a-48d2-9a39-c0338fe483f7.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 18,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-53955821/original/3434bb9e-05ea-4113-9d20-b2f6fc1bcb3e.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 18,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-53955821/original/d4a910c3-0e84-4c42-8522-119706c77013.jpeg?im_w=1200",
          preview: false,
        },
        {
          spotId: 18,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-53955821/original/6013a568-f077-4095-a937-769ceab27a9d.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 18,
          url: "https://a0.muscache.com/im/pictures/bbb0e2d3-3b4d-4649-881a-17033be399f3.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 19,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-33037119/original/8916bf6d-b08e-4501-9a16-cd7eff3daccb.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 19,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-33037119/original/10762dc8-fc77-47d8-aa91-c3dcd018423d.jpeg?im_w=1200",
          preview: false,
        },
        {
          spotId: 19,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-33037119/original/91c1c422-02f5-440c-bfc5-8b5d6cd57606.jpeg?im_w=1200",
          preview: false,
        },
        {
          spotId: 19,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-33037119/original/bbf1999f-ad9e-4e67-b682-9d9c62486a06.jpeg?im_w=1200",
          preview: false,
        },
        {
          spotId: 19,
          url: "https://a0.muscache.com/im/pictures/92039bd5-7d5d-4ab4-8fec-6e7bb796a33e.jpg?im_w=1200",
          preview: false,
        },
        {
          spotId: 20,
          url: "https://a0.muscache.com/im/pictures/0455bc19-3777-4935-afdf-b84bc8e40610.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 20,
          url: "https://a0.muscache.com/im/pictures/5eed7b19-e619-4272-9d50-ac11a2aa28dd.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 20,
          url: "https://a0.muscache.com/im/pictures/92634308-53b4-4b4d-b9ac-bbd1aef3778e.jpg?im_w=1200",
          preview: false,
        },
        {
          spotId: 20,
          url: "https://a0.muscache.com/im/pictures/b45093d2-5ddf-4184-a417-60faa2337abb.jpg?im_w=1200",
          preview: false,
        },
        {
          spotId: 20,
          url: "https://a0.muscache.com/im/pictures/0d7df44d-86ef-4c2d-a7a2-3ed900af0229.jpg?im_w=720",
          preview: false,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = "SpotImages";
    return queryInterface.bulkDelete(
      options
      // {spotId: [1,2,3,4,5]}
    );
  },
};
