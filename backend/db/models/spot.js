"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, {
        foreignKey: "ownerId",
      });
      Spot.hasMany(models.SpotImage, {
        foreignKey: "spotId",
        onDelete: "CASCADE",
      });
      Spot.hasMany(models.Review, {
        foreignKey: "spotId",
        onDelete: "CASCADE",
      });
      Spot.hasMany(models.Booking, {
        foreignKey: "spotId",
        onDelete: "CASCADE",
      });
    }
  }
  Spot.init(
    {
      ownerId: DataTypes.INTEGER,
      address: {
        type: DataTypes.STRING,
        validate: {
          len: [1, 30],
        },
      },
      city: {
        type: DataTypes.STRING,
        validate: {
          len: [1, 30],
        },
      },
      state: {
        type: DataTypes.STRING,
        validate: {
          len: [1, 30],
        },
      },
      country: {
        type: DataTypes.STRING,
        validate: {
          len: [1, 30],
        },
      },
      lat: DataTypes.DECIMAL,
      lng: DataTypes.DECIMAL,
      name: {
        type: DataTypes.STRING,
        validate: {
          len: [1, 30],
        },
      },
      description: {
        type: DataTypes.STRING,
        validate: {
          len: [1, 255],
        },
      },
      price: {
        type: DataTypes.STRING,
        validate: {
          min: [1],
          max: [5000],
        },
      },
    },
    {
      sequelize,
      modelName: "Spot",
      // defaultScope: {
      //   attributes: {
      //     exclude: ['createdAt', 'updatedAt']
      //   }

      // }
    }
  );
  return Spot;
};
