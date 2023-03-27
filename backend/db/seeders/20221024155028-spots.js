"use strict";

// NEW: add this code to each migration file
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
// END of new code

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    return queryInterface.bulkInsert(
      options,
      [
        {
          //1
          ownerId: 1,
          address: "112 A St",
          city: "Eclectic",
          state: "Alabama",
          country: "USA",
          lat: 33.749,
          lng: 84.388,
          name: "Alabama Lakeside Home",
          description:
            "Home in Alabama on a lake, perfect for summer fun in the water. It has a great view across the lake. You can sit on the porch around the outdoor fire pit. There are boats you can borrow.",
          price: 310.0,
        },
        {
          //2
          ownerId: 2,
          address: "101 A St",
          city: "Valdez",
          state: "Alaska",
          country: "USA",
          lat: 30.4383,
          lng: 84.2807,
          name: "Alaska Cabin on a Lake",
          description: `Adorable cabin in Alaska surrounded by wild flowers and trees. A great place to see wildlife including moose and bears. In the winter you can see the aurora. It has an outdoor fire pit and an indoor fireplace. There's skiing near by`,
          price: 270.0,
        },
        {
          //3
          ownerId: 3,
          address: "789 A St",
          city: "Happy Jack",
          state: "Arizona",
          country: "USA",
          lat: 39.1582,
          lng: 75.5244,
          name: "Arizona Home in the Woods",
          description:
            "Home in Arizona in the pine forest deep in a wooded area, so it is not too hot in the summer. Great place for a family vacation. There is an outdoor fire pit and a games collection inside to play by the fireplace. Great hiking near by.",
          price: 220.0,
        },
        {
          //4
          ownerId: 4,
          address: "123 A St",
          city: "Morrilton",
          state: "Arkansas",
          country: "USA",
          lat: 34.7445,
          lng: 92.288,
          name: "Arkansas Home with a View",
          description:
            "Spacious home in Arkansas in a beautiful field with a view of the surrounding valley. It has a great kitchen and is a great place for a family to gather. It is pet friendly. It has an indoor gas fireplace.",
          price: 190.0,
        },
        {
          //5
          ownerId: 5,
          address: "456 C St",
          city: "Big Creek",
          state: "California",
          country: "USA",
          lat: 39.7392,
          lng: 104.9903,
          name: "A-Frame Cabin in the Sierras",
          description: `  We have a hot tub, and many places to swim near by.
        We have an outdoor fire pit and an indoor fireplace. It's a 20 min drive to skiing.
        We also have a game room with old video games and board games. This is a pet friendly home.`,
          price: 140.0,
        },
        {
          //6
          ownerId: 1,
          address: "456 C St",
          city: "Woodland Park",
          state: "Colorado",
          country: "USA",
          lat: 39.7392,
          lng: 104.9903,
          name: "Modern Colorado Home with a view",
          description:
            "This popular A-frame has an epic view in a secluded area in the woods. It has a extensive games collection, an outdoor fire pit, indoor fireplace, and skiing near by. Often at dusk you can see wildlife. There is also great hiking in the area.",
          price: 150.0,
        },
        {
          //7
          ownerId: 2,
          address: "456 C St",
          city: "East Hampton",
          state: "Connecticut",
          country: "USA",
          lat: 39.7392,
          lng: 104.9903,
          name: "Lake Front Cabin in the Woods",
          description:
            "This adorable cabin is directly on the water with boats available to use in the summer. It has a great games collection and an outdoor BBQ",
          price: 280.0,
        },
        {
          //8
          ownerId: 3,
          address: "456 O St",
          city: "Mount Hood Village",
          state: "Oregon",
          country: "USA",
          lat: 39.7392,
          lng: 104.9903,
          name: "Forest Home",
          description: `Not only is this adorable A frame in the woods, a tree is literally growing through it's front porch adding extra charm. This home is pet friendly and there is great hiking near by`,
          price: 360.0,
        },
        {
          //9
          ownerId: 4,
          address: "123 A st",
          city: "Sandpoint",
          state: "Idaho",
          country: "USA",
          lat: 1,
          lng: 1,
          name: "IdaHome",
          description: `This rustic home has a spectacular view and is a great place for solitude. It is deep in the woods without wifi.
        It does not have indoor plumbing so cooking and cleaning will be outdoor activities. It is great for hiking and wildlife.`,
          price: 475.0,
        },
        {
          //10
          ownerId: 5,
          address: "123 A st",
          city: "Livingston",
          state: "Montana",
          country: "USA",
          lat: 1,
          lng: 1,
          name: "River front cabin",
          description:
            "This cabin is right on a beautiful river with an amazing view and deep in the woods, you can fall asleep the sound of the water each night. There is also a lake near by. This is a pet friendly home. There is great hiking near by.",
          price: 480.0,
        },
        {
          //11
          ownerId: 1,
          address: "",
          city: "Buffalo",
          state: "Wyoming",
          country: "USA",
          lat: 1,
          lng: 1,
          name: "Buffalo Home",
          description:
            "This home is walking distance to downtown but far enough away for a quite restful weekend away. It has an amazing view of the valley. It's  a great place to get cozy by the fireplace and read a book",
          price: 240.0,
        },
        {
          //12
          ownerId: 2,
          address: "123 A St",
          city: "Custer",
          state: "South Dakota",
          country: "USA",
          lat: 1,
          lng: 1,
          name: "Tiny home in Custer",
          description:
            "This tiny home has everything you need inside including a cozy fireplace, and has an outdoor fire pit with views of the surrounding valley.",
          price: 310.0,
        },
        {
          //13
          ownerId: 3,
          address: "123 A St",
          city: "Fargo",
          state: "North Dakota",
          country: "USA",
          lat: 1,
          lng: 1,
          name: "North Dakota Home",
          description:
            "This cabin has a great kitchen indoors. It also has a fireplace that heats both levels and it has a spiral staircase wrapping around it. This home is walking distance from downtown. It is pet friendly.",
          price: 190.0,
        },
        {
          //14
          ownerId: 4,
          address: "123 A St",
          city: "Brook Park",
          state: "Minnesota",
          country: "USA",
          lat: 1,
          lng: 1,
          name: "Invisible home in the woods",
          description: `This home blends right in with the surrounding forest, so in any season it blends in with it's surroundings. Inside it has a modern look and is very space efficient. It is pet friendly`,
          price: 175.0,
        },
        {
          //15
          ownerId: 5,
          address: "123 A st",
          city: "Friendship",
          state: "Wisconsin",
          country: "USA",
          lat: 1,
          lng: 1,
          name: "Red Cabin",
          description:
            "This home as outdoor fire pit you can cook on and an indoor swing you can relax in.",
          price: 260.0,
        },
        {
          //16
          ownerId: 1,
          address: "123 A St",
          city: "South Haven",
          state: "Michigan",
          country: "USA",
          lat: 1,
          lng: 1,
          name: "Autumn Home in the woods",
          description:
            "This cabin is adorable all year round but in the fall is especially impressive. It has an outdoor fire pit and is walking distance from a lake great for water sports.",
          price: 110.0,
        },
        {
          //17
          ownerId: 2,
          address: "123 A St",
          city: "Seattle",
          state: "Washington",
          country: "USA",
          lat: 1,
          lng: 1,
          name: "Washington Home with a Lego Kitchen",
          description:
            "This home has a kitchen with lego bricks as decoration great for cooking and enjoyment. It has large glass windows on both open sides. It is walking distance from downtown.",
          price: 430.0,
        },
        {
          //18
          ownerId: 3,
          address: "123 A St",
          city: "Holualoa",
          state: "Hawaii",
          country: "USA",
          lat: 1,
          lng: 1,
          name: "Hawaiian Home",
          description:
            "This home has banana plants on the property you can eat. It is in a secluded area on in the hills with epic views. The interior has a modern vide. It is also a 15 min drive to the beach.",
          price: 270.0,
        },
        {
          //19
          ownerId: 4,
          address: "123 A St",
          city: "Bethany Beach",
          state: "Delaware",
          country: "USA",
          lat: 1,
          lng: 1,
          name: "Ocean front property",
          description:
            "This home is right on the water ready for perfect days on the beach. It is a large home that can fit a whole family with a kitchen large enough to cook for everyone.",
          price: 350.0,
        },
        {
          //20
          ownerId: 5,
          address: "123 A St",
          city: "Hernando Beach",
          state: "Florida",
          country: "USA",
          lat: 1,
          lng: 1,
          name: "Florida Get Away",
          description:
            "With a pool and a lake right outside, this home is perfect for summer relaxation and water activities. It is also pet friendly. It has A/C",
          price: 190.0,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    return queryInterface.bulkDelete(options);
  },
};
