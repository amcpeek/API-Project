"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.Spot, {
        foreignKey: "spotId",
        // constraints: false
      });
      Review.belongsTo(models.User, {
        foreignKey: "userId",
      });
      Review.hasMany(models.ReviewImage, {
        foreignKey: "reviewId",
      });
    }
  }
  Review.init(
    {
      spotId: {
        type: DataTypes.INTEGER,
        onDelete: "CASCADE",
      },
      userId: DataTypes.INTEGER,
      review: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 255],
        },
      },
      stars: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1, //doesn't need to throw error, the len through the error
          max: 5,
          len: [1, 1],
        },
      },
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
